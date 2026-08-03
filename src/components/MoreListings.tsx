import Link from "next/link"
import { MdBed, MdBathtub } from "react-icons/md"


const saleListings = [
  {
    id: 1,
    slug: 'palm-beach',
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image3.png',
  },
  {
    id: 2,
    slug: 'palm-beach',
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
  {
    id: 3,
    slug: 'palm-beach',
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image3.png',
  },
  {
    id: 4,
    slug: 'palm-beach',
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image3.png',
  },
]

export default function MoreListings() {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:px-20 px-7 md:space-y-8 space-y-5"
      >
        <div className="w-full md:w-10/12 md:space-y-10 space-y-5 mb-10">
          <div className="w-70 md:w-full md:text-[3.5rem] text-4xl md:leading-[4.38rem] text-left leading-16 italic font-serif text-black">You May Also Like</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {saleListings.map((listing, index) => (
              <Link href={`/listings/${listing.slug}`} key={listing.id} className="snap-center shrink-0 w-full overflow-hidden bg-white">
                <img src={listing.image} alt={listing.title} className="h-80 w-full object-cover" />
                <div className="space-y-2 py-6">
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
              </Link>
            ))}
          </div>
        </div>


      </section>
  )
}
