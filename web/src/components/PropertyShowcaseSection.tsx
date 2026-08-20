import { useRef } from 'react'
import { MdBed, MdBathtub } from 'react-icons/md'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { formatCompactNumber } from '@/lib/common'
import PrimaryButton from './PrimaryButton'

type Listing = {
  title: string
  slug: { current: string }
  price: number
  city?: string
  state?: string
  bedrooms?: string
  baths?: string
  propertyType?: string
  category?: string
  _updatedAt?: string
  gallery?: { asset?: { url?: string } }
}

export default function PropertyShowcaseSection({ listings, rentalListings }: { listings: Listing[]; rentalListings: Listing[] }) {
  const router = useRouter()
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
      <div className="mx-auto w-11/12 lg:w-10/12 space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="lg:text-[3rem] text-4xl font-serif italic">Premium Sale Listings</h2>
          <div onClick={() => {router.push('/listings')}} className="inline-flex items-center gap-2 text-[#36394A] font-medium text-sm hover:text-black underline">
            View All Sale Listings
            <FiChevronRight size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {listings && listings.map((listing) => {
            const slug = listing.slug.current
            const imageUrl = listing.gallery?.asset?.url
            const location = [listing.city, listing.state].filter(Boolean).join(' • ')
            return (
            <Link href={`/listings/${slug}`} key={slug} className="overflow-hidden">
              <img src={imageUrl} alt={listing.title} className="h-70 w-full object-cover" />
              <div className="space-y-2 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-[#36394A] font-medium  w-[67%] line-clamp-2">{listing.title}</div>
                  <div className="text-sm font-medium text-[#36394A]">₦{formatCompactNumber(listing.price)} /<span className="text-[#666D80] text-xs">YR</span></div>
                </div>
                <p className="text-sm text-[#666D80] font-medium">{location}</p>
                <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                  <span className="inline-flex items-center gap-2">
                    <MdBed  className="text-[#36394A]" />
                    {listing.bedrooms} bedrooms
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MdBathtub className="text-[#36394A]" />
                    {listing.baths} baths
                  </span>
                </div>
              </div>
            </Link>
          )})}
        </div>

        <div className="grid gap-10 lg:grid-cols-3 items-center lg:mt-20">
          <div className="space-y-8">
            <h2 className="md:text-[3.5rem] text-5xl md:leading-[3.8rem] italic font-serif text-[#131313]">Discover Your Next Rental Home</h2>
            <div className="">
              <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={() => router.push('/rent')}>
                Explore All Rentals
              </PrimaryButton>
            </div>
          </div>

          <div className="grid lg:col-span-2 gap-6 overflow-hidden">
            <div className="relative overflow-hidden ">
              <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-6 md:pr-20 pl-4 w-full max-w-full snap-x snap-mandatory">
                {rentalListings &&rentalListings.map((listing) => {
                  const slug = listing.slug.current
                  const imageUrl = listing.gallery?.asset?.url
                  const location = [listing.city, listing.state].filter(Boolean).join(' • ')
                  return (
                    <Link href={`/listings/${slug}`} key={slug} className="snap-center shrink-0 md:max-w-75 max-w-80 overflow-hidden bg-white">
                      <img src={imageUrl} alt={listing.title} className="h-72 w-full object-cover" />
                      <div className="space-y-2 py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-sm text-[#36394A] font-medium  w-[67%] line-clamp-2">{listing.title}</div>
                          <div className="text-sm font-medium text-[#36394A]">₦{formatCompactNumber(listing.price)} /<span className="text-[#666D80] text-xs">YR</span></div>
                        </div>
                        <p className="text-sm text-[#666D80] font-medium">{location}</p>
                        <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                          <span className="inline-flex items-center gap-2">
                            <MdBed  className="text-[#36394A]" />
                            {listing.bedrooms} Bedrooms
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MdBathtub className="text-[#36394A]" />
                            {listing.baths} Baths
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
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
