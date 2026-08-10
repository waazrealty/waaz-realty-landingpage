import Link from "next/link"


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
]

export default function MoreStories() {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:px-20 px-7 md:space-y-8 space-y-5"
      >
        <div className="w-full md:w-2/3 md:space-y-14 space-y-5 mb-10">
          <div className="w-70 md:w-full md:text-[3.5rem] text-5xl md:leading-[4.38rem] text-left leading-16 italic font-serif text-black">Explore More Success Stories</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {saleListings.map((listing, index) => (
              <Link href={`/portfolio/${listing.slug}`} key={listing.id} className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="font-medium text-sm">0{index+1}</div>
                  <div className="font-medium text-sm">Sale</div>
                </div>
                <img src={listing.image} alt={listing.title} className="h-auto w-full object-cover" />
                <h3 className="text-sm text-[##0D0D12] font-medium">{listing.title}</h3>
              </Link>
            ))}
          </div>
        </div>


      </section>
  )
}
