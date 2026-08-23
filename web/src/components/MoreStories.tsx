import Link from "next/link"


type PortfolioFeedback = {
  name: string
  type: string
  quote: string
}

type PortfolioListing = {
  _id: string
  title: string
  slug: { current: string }
  category: string
  price: number
  city: string
  state: string
  bedrooms: string
  baths: string
  gallery: { asset?: { url?: string } }
}

type Portfolio = {
  _id: string
  daysInMarket: string
  openPrice: number
  closePrice: number
  feedbacks: PortfolioFeedback[]
  listing: PortfolioListing
  _createdAt: string
  _updatedAt: string
}

export default function MoreStories({portfolios}: {portfolios: Portfolio[]}) {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:px-20 md:space-y-8 space-y-5"
      >
        <div className="w-11/12 lg:w-2/3 space-y-5 mb-10">
          <div className="w-70 md:w-full md:text-[3.5rem] text-5xl md:leading-[4.38rem] text-left leading-16 italic font-serif text-black">Explore More Success Stories</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {portfolios.map((portfolio, index) => {
            const slug = portfolio.listing?.slug.current
            return (
              <Link href={`/portfolio/${slug}`} key={slug} className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="font-medium text-base">0{index+1}</div>
                  <div className="font-medium text-base">{portfolio.listing.category === "for-sale" ? "Sale" : "Rent"}</div>
                </div>
                <img src={portfolio.listing.gallery.asset?.url} alt={portfolio.listing.title} className="h-auto w-full object-cover" />
                <h3 className="text-base text-[##0D0D12] font-medium line-clamp-2">{portfolio.listing.title}</h3>
              </Link>
            )})}
          </div>
        </div>
      </section>
  )
}
