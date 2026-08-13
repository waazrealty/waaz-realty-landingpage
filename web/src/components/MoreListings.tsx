import { formatCompactNumber } from "@/lib/common"
import { sanityClient } from "@/lib/sanity"
import { GetStaticProps } from "next"
import Link from "next/link"
import { MdBed, MdBathtub } from "react-icons/md"

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

export default function MoreListings({ listings }: { listings: Listing[] }) {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:space-y-8 space-y-5"
      >
        <div className="w-11/12 md:w-10/12 space-y-5 mb-10">
          <div className="w-70 md:w-full md:text-[3.5rem] text-4xl md:leading-[4.38rem] text-left leading-16 italic font-serif text-black">You May Also Like</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {listings &&listings.map((listing) => {
              const slug = listing.slug.current
              const imageUrl = listing.gallery?.asset?.url
              const location = [listing.city, listing.state].filter(Boolean).join(' • ')
              console.log('listing', listing)
              return (
                <Link href={`/listings/${slug}`} key={slug} className="snap-center shrink-0 w-full overflow-hidden bg-white">
                  <img src={imageUrl} alt={listing.title} className="h-100 w-full object-cover" />
                  <div className="space-y-2 py-4">
                    <div className="flex items-start justify-between">
                      <div className="text-sm text-[#36394A] font-medium w-[67%] line-clamp-2">{listing.title}</div>
                      <div className="text-sm font-medium text-[#36394A]">N {formatCompactNumber(listing.price)}<span className="text-[#666D80]">/YR</span></div>
                    </div>
                    <p className="text-sm text-[#666D80] font-medium">{location}</p>
                    <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                      <span className="inline-flex items-center gap-2">
                        <MdBed className="text-[#36394A] -mb-1 text-base" />
                        {listing.bedrooms} Bedrooms
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MdBathtub className="text-[#36394A] -mb-1 text-base" />
                        {listing.baths} Baths
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>


      </section>
  )
}
