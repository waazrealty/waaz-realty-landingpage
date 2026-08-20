import React, { useEffect, useRef, useState } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

interface ImageUploaderProps {
  acceptTypes?: string[]
  maxFileSize?: number
  onImageChange: (files: File[]) => void
  selectedImageFiles?: File[]
  maxFiles?: number
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  acceptTypes = ["image/*"],
  maxFileSize = 5 * 1024 * 1024,
  onImageChange,
  selectedImageFiles = [],
  maxFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  /**
   * Create preview URLs
   */
  useEffect(() => {
    const urls = selectedImageFiles.map((file) =>
      URL.createObjectURL(file)
    )

    setPreviewUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [selectedImageFiles])

  /**
   * Validate file type
   */
  const isValidFileType = (file: File) => {
    return acceptTypes.some((acceptedType) => {
      if (acceptedType === "image/*") {
        return file.type.startsWith("image/")
      }

      return file.type === acceptedType
    })
  }

  /**
   * Validate and add files
   */
  const handleImagesAdded = (files: File[]) => {
    const validFiles: File[] = []

    for (const file of files) {
      // Validate file type
      if (!isValidFileType(file)) {
        alert(`Invalid file type: ${file.type}`)
        continue
      }

      // Validate file size
      if (file.size > maxFileSize) {
        const maxSizeMB = maxFileSize / 1024 / 1024
        const fileSizeMB = file.size / 1024 / 1024

        alert(
          `${file.name} exceeds the ${maxSizeMB.toFixed(
            1
          )}MB limit (${fileSizeMB.toFixed(1)}MB)`
        )

        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length === 0) {
      return
    }

    let updatedFiles = [
      ...selectedImageFiles,
      ...validFiles,
    ]

    // Remove duplicate files
    updatedFiles = updatedFiles.filter(
      (file, index, array) =>
        index ===
        array.findIndex(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified
        )
    )

    // Apply maximum file limit
    if (maxFiles && updatedFiles.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} images.`)

      updatedFiles = updatedFiles.slice(0, maxFiles)
    }

    onImageChange(updatedFiles)
  }

  /**
   * Click upload
   */
  const handleClick = () => {
    inputRef.current?.click()
  }

  /**
   * File input change
   */
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || [])

    if (files.length > 0) {
      handleImagesAdded(files)
    }

    // Allow selecting the same files again
    event.target.value = ""
  }

  /**
   * Drag over
   */
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    setIsDragging(true)
  }

  /**
   * Drag leave
   */
  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    setIsDragging(false)
  }

  /**
   * Drop files
   */
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    setIsDragging(false)

    const files = Array.from(event.dataTransfer.files || [])

    if (files.length > 0) {
      handleImagesAdded(files)
    }
  }

  /**
   * Remove individual image
   */
  const handleRemove = (index: number) => {
    const updatedFiles = selectedImageFiles.filter(
      (_, fileIndex) => fileIndex !== index
    )

    onImageChange(updatedFiles)
  }

  /**
   * Remove all images
   */
  const handleClearAll = () => {
    onImageChange([])
  }

  const acceptedTypesText = acceptTypes
    .map((type) => {
      if (type === "image/*") {
        return "SVG, PNG, JPG or GIF"
      }

      return type
        .replace("image/", "")
        .toUpperCase()
    })
    .join(", ")

  const maxSizeMB = maxFileSize / 1024 / 1024

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        accept={acceptTypes.join(",")}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Area */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            handleClick()
          }
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex
          h-48
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-md
          transition-all
          duration-200

          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-50"
          }
        `}
      >
        {/* Upload Icon */}
        <MdOutlineAddPhotoAlternate className="text-gray-600"/>

        <p className="text-center text-xs font-medium text-gray-600">
          Click to upload or drag and drop
        </p>

        <p className="mt-1 text-center text-[10px] text-gray-400">
          {acceptedTypesText} (max. {maxSizeMB.toFixed(0)}MB each)
        </p>

        {maxFiles && (
          <p className="mt-1 text-center text-[10px] text-gray-400">
            Maximum {maxFiles} images
          </p>
        )}
      </div>

      {/* Image Previews */}
      {selectedImageFiles.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Selected Images ({selectedImageFiles.length})
            </p>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-medium text-red-500 hover:text-red-600"
            >
              Remove all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {selectedImageFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="group relative overflow-hidden rounded-md border border-gray-200 bg-gray-100"
              >
                {previewUrls[index] && (
                  <img
                    src={previewUrls[index]}
                    alt={file.name}
                    className="h-28 w-full object-cover"
                  />
                )}

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${file.name}`}
                  className="
                    absolute
                    right-1
                    top-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    text-sm
                    font-bold
                    text-white
                    opacity-0
                    shadow
                    transition
                    group-hover:opacity-100
                    hover:bg-red-600
                  "
                >
                  ×
                </button>

                {/* Filename */}
                <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1">
                  <p className="truncate text-[10px] text-white">
                    {file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader