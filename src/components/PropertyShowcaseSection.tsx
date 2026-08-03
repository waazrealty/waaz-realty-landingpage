import { useRef } from 'react'
import { MdBed, MdBathtub } from 'react-icons/md'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const saleListings = [
  {
    id: 1,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
  {
    id: 2,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image2.png',
  },
  {
    id: 3,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image2.png',
  },
]

const rentalListings = [
  {
    id: 1,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
  {
    id: 2,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image2.png',
  },
  {
    id: 3,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
  {
    id: 5,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image1.png',
  },
]

export default function PropertyShowcaseSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const handleScrollLeft = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-11/12 lg:w-10/12 space-y-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[3rem] font-serif italic">Premium Sale Listings</h2>
          <button className="inline-flex items-center gap-2 text-[#36394A] font-medium text-sm hover:text-black underline">
            View All Sale Listings
            <FiChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {saleListings.map((listing) => (
            <div key={listing.id} className="overflow-hidden border border-[#E6E8EC] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <img src={listing.image} alt={listing.title} className="h-70 w-full object-cover" />
              <div className="space-y-2 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm text-[#36394A] font-medium">{listing.title}</h3>
                  <span className="text-sm font-medium text-[#36394A]">₦250M /<span className="text-[#666D80] text-xs">YR</span></span>
                </div>
                <p className="text-sm text-[#666D80] font-medium">Ajao Estate <span className="px-1">•</span> Lagos</p>
                <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                  <span className="inline-flex items-center gap-2">
                    <MdBed  className="text-[#36394A]" />
                    {listing.bedrooms}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MdBathtub className="text-[#36394A]" />
                    {listing.baths}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-3 items-center mt-20">
          <div className="space-y-8">
            <h2 className="text-[3.5rem] leading-[3.8rem] italic font-serif text-[#131313]">Discover Your Next Rental Home</h2>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90">
              Explore All Rentals
              <FiChevronRight size={18} />
            </button>
          </div>

          <div className="grid lg:col-span-2 gap-6 overflow-hidden">
            <div className="relative overflow-hidden ">
              <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-6 pr-20 pl-4 w-full max-w-full snap-x snap-mandatory">
                {rentalListings.map((listing) => (
                  <div key={listing.id} className="snap-center shrink-0 max-w-[300px] overflow-hidden bg-white">
                    <img src={listing.image} alt={listing.title} className="h-72 w-full object-cover" />
                    <div className="space-y-2 p-6">
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm text-[#36394A] font-medium">{listing.title}</h3>
                            <span className="text-sm font-medium text-[#36394A]">₦250M /<span className="text-[#666D80] text-xs">YR</span></span>
                        </div>
                        <p className="text-sm text-[#666D80] font-medium">Ajao Estate <span className="px-1">•</span> Lagos</p>
                        <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                            <span className="inline-flex items-center gap-2">
                                <MdBed  className="text-[#36394A]" />
                                {listing.bedrooms}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <MdBathtub className="text-[#36394A]" />
                                {listing.baths}
                            </span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleScrollLeft} className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl bg-[#36394A] text-white shadow-lg">
                <FiChevronLeft size={20} />
              </button>
              <button onClick={handleScrollRight} className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-tl-xl rounded-br-xl bg-[#36394A] text-white shadow-lg">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
