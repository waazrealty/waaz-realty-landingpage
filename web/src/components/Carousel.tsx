import { useRef, useState, useEffect, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MdPlayCircleOutline } from 'react-icons/md'

const defaultImages = [
  '/assets/images/bg-home.png',
  '/assets/images/bg-about.png',
  '/assets/images/bg-portfolio.png',
]

export default function Carousel({ images, videoUrl }: { images?: string[], videoUrl?: string }) {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const items = images && images.length > 0 ? images : defaultImages
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToIndex = useCallback((index: number) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth
    // calculate scrollLeft to center the slide (or snap to start)
    const scrollLeft = index * slideWidth
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    setCurrentIndex(index)
  }, [])

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const { scrollLeft, clientWidth } = container
    if (clientWidth === 0) return
    const index = Math.round(scrollLeft / clientWidth)
    // clamp index
    const clampedIndex = Math.min(Math.max(index, 0), items.length - 1)
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex)
    }
  }, [currentIndex, items.length])

  useEffect(() => {
    const container = sliderRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll)
    // initial sync
    handleScroll()
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const goPrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  const goNext = () => {
    const newIndex = Math.min(currentIndex + 1, items.length - 1)
    scrollToIndex(newIndex)
  }

  // optional: handle window resize to update index
  useEffect(() => {
    const handleResize = () => {
      handleScroll()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleScroll])

  return (
    <section className="lg:w-10/12 w-11/12 md:-mt-10">
      <div className="grid lg:col-span-2 gap-6 overflow-hidden w-full relative">
        {videoUrl &&
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="absolute z-10 top-5 left-5">
            <div className="flex bg-[#4D6741]/60 hover:bg-[#466F33]/80 border border-[#7D8B57] hover:border-[#515B3A] backdrop-blur-lg items-center gap-2 rounded-full font-medium px-6 py-3 text-base text-white w-max cursor-pointer">
              <MdPlayCircleOutline />
              Take a Video Tour
            </div>
          </a>
        }
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-1.5 overflow-x-auto scrollbar-none w-full max-w-full snap-x snap-mandatory"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((image, index) => (
              <div
                key={index}
                className="snap-center shrink-0 overflow-hidden bg-white rounded-3xl"
                style={{ width: '100%', flex: '0 0 100%' }}
              >
                <img
                  src={image}
                  alt={`Carousel-image-${index}`}
                  className="md:h-150 h-110 w-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={goPrev}
            className="absolute md:left-7 left-1 bottom-2/5 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl bg-black text-white shadow-lg"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute md:right-7 right-1 bottom-2/5 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tl-xl rounded-br-xl bg-black text-white shadow-lg"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === index ? 'bg-[#9AA675]' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}