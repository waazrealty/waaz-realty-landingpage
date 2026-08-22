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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {listings && listings.map((listing) => {
            const slug = listing.slug.current
            const imageUrl = listing.gallery?.asset?.url
            const location = [listing.city, listing.state].filter(Boolean).join(' • ')
            return (
            <Link
              href={`/listings/${slug}`}
              key={slug}
              className="group space-y-4"
            >
              {/* Image */}
              <div className="aspect-5/6 w-full overflow-hidden rounded-[.88rem]">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                  aria-hidden="true"
                />
              </div>

              {/* Details */}
              <div className="space-y-2 rounded-[.88rem] bg-[#F5F6EF]/50 p-4 transition-colors duration-300 group-hover:bg-[#F5F6EF]">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-[64%] line-clamp-2 text-sm font-medium text-[#36394A]">
                    {listing.title}
                  </div>

                  <div className="text-sm font-medium text-[#36394A]">
                    ₦{formatCompactNumber(listing.price)}
                  </div>
                </div>

                <p className="text-sm font-medium text-[#666D80]">
                  {location}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-[#666D80]">
                  <span className="inline-flex items-center gap-2">
                    <MdBed className="text-[#36394A]" />
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

        <div className="grid gap-10 lg:grid-cols-3 items-center lg:mt-25 mt-10">
          <div className="space-y-8">
            <h2 className="md:text-[3.5rem] text-5xl md:leading-[3.8rem] italic font-serif text-[#131313]">Discover Your Next Rental Home</h2>
            <div className="">
              <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={() => router.push('/rent')}>
                Explore All Rentals
              </PrimaryButton>
            </div>
          </div>

          <div className="grid col-span-2 gap-6 overflow-hidden">
            <div className="relative overflow-hidden ">
              <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-6 md:pr-20 md:pl-4 w-full max-w-full snap-x snap-mandatory">
                {rentalListings &&rentalListings.map((listing) => {
                  const slug = listing.slug.current
                  const imageUrl = listing.gallery?.asset?.url
                  const location = [listing.city, listing.state].filter(Boolean).join(' • ')
                  return (
                    <Link
                      href={`/listings/${slug}`}
                      key={slug}
                      className="group space-y-4 md:max-w-75 max-w-80"
                    >
                      {/* Image */}
                      <div className="aspect-5/6 w-full overflow-hidden rounded-[.88rem]">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Details */}
                      <div className="space-y-2 rounded-[.88rem] bg-[#F5F6EF]/50 p-4 transition-colors duration-300 group-hover:bg-[#F5F6EF]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="w-[64%] line-clamp-2 text-sm font-medium text-[#36394A]">
                            {listing.title}
                          </div>

                          <div className="text-sm font-medium text-[#36394A]">
                            ₦{formatCompactNumber(listing.price)} /<span className="text-[#666D80] text-xs">YR</span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-[#666D80]">
                          {location}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-medium text-[#666D80]">
                          <span className="inline-flex items-center gap-2">
                            <MdBed className="text-[#36394A]" />
                            {listing.bedrooms} bedrooms
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <MdBathtub className="text-[#36394A]" />
                            {listing.baths} baths
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
