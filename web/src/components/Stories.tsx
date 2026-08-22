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

export default function Stories({portfolios}: {portfolios : Portfolio[]}) {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:px-20 md:space-y-8 space-y-5 mt-10"
      >
        <div className="lg:w-100 w-full">
          <div className="lg:text-6xl text-5xl text-center italic font-serif text-black">Behind Each Door, A Story of Success.</div>
        </div>

        <div className="text-[#666D80] text-center max-w-170 text-[1rem] leading-6">
          We invite you to browse a selection of our landmark transactions. From securing dream homes for families in Lekki to leasing premium apartments in Ikoyi, these properties showcase our ability to navigate the Lagos market and deliver exceptional results for buyers, sellers, landlords, and tenants alike.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 lg:w-2/3 w-11/12">
          {portfolios.map((portfolio, index) => {
            const slug = portfolio.listing.slug.current
            return (
              <Link href={`/portfolio/${slug}`} key={slug} className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="font-medium text-sm">0{index+1}</div>
                  <div className="font-medium text-sm">{portfolio.listing.category === "for-sale" ? "Sale" : "Rent"}</div>
                </div>
                <div className="aspect-5/6 w-full overflow-hidden rounded-[.88rem]">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${portfolio.listing.gallery.asset?.url})` }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm text-[##0D0D12] font-medium line-clamp-2">{portfolio.listing.title}</h3>
              </Link>
            )})}
        </div>

      </section>
  )
}
