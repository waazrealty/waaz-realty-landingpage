import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const defaultImages = [
  '/assets/images/bg-home.png',
  '/assets/images/bg-about.png',
  '/assets/images/bg-portfolio.png',
]

export default function Carousel({ images }: { images?: string[] }) {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const items = images && images.length > 0 ? images : defaultImages

  const handleScrollLeft = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section className="w-full md:-mt-10">
      <div className="grid lg:col-span-2 gap-6 overflow-hidden w-full">
        <div className="relative overflow-hidden ">
          <div ref={sliderRef} className="flex gap-1.5 overflow-x-auto scrollbar-none w-full max-w-full snap-x snap-mandatory">
            {items.map((image, index) => (
              <div key={index} className="snap-center shrink-0 md:max-w-full max-w-105 overflow-hidden bg-white">
                <img src={image} alt={`Carousel-image-${index}`} className="md:h-150 h-110 w-full object-cover" />
              </div>
            ))}
          </div>

          <button onClick={handleScrollLeft} className="absolute left-7 bottom-2/5 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl bg-black text-white shadow-lg">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={handleScrollRight} className="absolute right-7 bottom-2/5 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tl-xl rounded-br-xl bg-black text-white shadow-lg">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
