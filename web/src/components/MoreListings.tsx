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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {listings &&listings.map((listing) => {
              const slug = listing.slug.current
              const imageUrl = listing.gallery?.asset?.url
              const location = [listing.city, listing.state].filter(Boolean).join(' • ')
              return (
                <Link href={`/listings/${slug}`} key={slug} className="snap-center group shrink-0 w-full space-y-4 overflow-hidden bg-white">
                  <div className="md:aspect-5/6 aspect-video  w-full overflow-hidden rounded-[.88rem]">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-2 rounded-[.88rem] bg-[#F5F6EF]/50 p-4 transition-colors duration-300 group-hover:bg-[#F5F6EF]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-[64%] line-clamp-1 text-base font-medium text-[#36394A]">
                        {listing.title}
                      </div>

                      <div className="text-base font-medium text-[#36394A]">
                        ₦{formatCompactNumber(listing.price)}
                        {listing.category === "for-rent" && <span className="text-[#666D80]">/YR</span>}
                      </div>
                    </div>

                    <p className="text-base font-medium text-[#666D80]">
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
        </div>


      </section>
  )
}
