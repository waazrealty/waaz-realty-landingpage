import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { MdBed, MdBathtub } from 'react-icons/md'
import { FiChevronRight } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { sanityClient } from '@/lib/sanity'
import { formatCompactNumber } from '@/lib/common'

type Listing = {
  title: string
  slug: { current: string }
  price: number
  city?: string
  state?: string
  bedrooms?: string
  baths?: string
  gallery?: Array<{ asset?: { url?: string } }>
  category?: string
}

const tabOptions = ['All', 'For Sale', 'For Rent']
const chips = ['Duplex', 'Terraced', '+1']

export default function Listings({ listings }: { listings: Listing[] }) {
  const [selectedTab, setSelectedTab] = useState('All')
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(1000000000)

  const categoryFilter =
    selectedTab === 'For Sale'
      ? 'for-sale'
      : selectedTab === 'For Rent'
      ? 'for-rent'
      : undefined

  const filteredListings = useMemo(
    () =>
      listings
        .filter((listing) => !categoryFilter || listing.category === categoryFilter)
        .filter((listing) => {
          const price = listing.price ?? 0
          return price >= priceMin && price <= priceMax
        }),
    [listings, categoryFilter, priceMin, priceMax]
  )

  const resetFilters = () => {
    setSelectedTab('All')
    setPriceMin(0)
    setPriceMax(1000000000)
  }

  return (
    <BasicLayout
      title="Listings | Wazz Realty"
      description="Browse available properties for sale and rent with Wazz Realty."
      image="/assets/portfolio-preview.png"
      url="/listings"
      canonical="/listings"
      keywords={['listings', 'properties', 'sale', 'rent']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-10 space-y-5">
        <div className="md:text-[4rem] text-[3rem] font-serif italic md:leading-24 leading-18">
          Available Properties in Lagos
        </div>
        <div className="text-[#666D80] md:w-5/12 md:text-justify text-left text-[1rem] leading-7">
          Each property in our portfolio is selected for its quality, value, and potential to become the foundation for your future. Whether you are looking to buy or rent, your journey towards an elevated lifestyle begins here. Use the filters below to refine your search.
        </div>
      </section>
      <section className="md:w-10/12 w-11/12 md:-my-14 -my-7 mx-auto">
        <div className="py-5 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap md items-center md:w-auto w-8/12 gap-3 border border-b-0 border-[#F7F7F8] p-2">
              {tabOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedTab(option)}
                  className={`md:px-5 px-3 py-2 text-sm font-medium transition ${
                    selectedTab === option
                      ? 'border-b-2 border-[#616D43]'
                      : 'text-[#666D80] hover:bg-white hover:text-[#36394A]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="md:gap-3 flex flex-row md:flex-nowrap flex-wrap md:justify-between items-end border border-[#F7F7F8]">
            <div className="px-4 py-3 md:w-1/5 w-1/3">
              <div className="text-sm font-semibold">Rooms:</div>
              <div className="mt-2 flex items-center justify-between w-full text-sm text-[#36394A]">
                <div className="text-sm text-[#36394A]">All</div>
                <BsChevronDown />
              </div>
            </div>
            <div className="px-4 py-3 md:w-1/5 w-1/3">
              <div className="text-sm font-semibold">Type:</div>
              <div className="mt-2 flex items-center justify-between w-full text-sm text-[#36394A]">
                <div className="text-sm text-[#36394A]">All</div>
                <BsChevronDown />
              </div>
            </div>
            <div className="px-4 py-3 md:w-1/5 w-1/3">
              <div className="text-sm font-semibold">Location:</div>
              <div className="mt-2 flex items-center justify-between w-full text-sm text-[#36394A]">
                <div className="text-sm text-[#36394A]">All</div>
                <BsChevronDown />
              </div>
            </div>
            <div className="px-4 py-3 md:w-1/5">
              <div className="text-sm font-semibold">Price Range:</div>
              <div className="mt-1 flex items-center justify-between w-full">
                <label className="flex flex-row items-center gap-2 text-sm text-[#36394A]">
                  <span className="text-[#666D80] font-medium">Min</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    min={0}
                    className="w-20 bg-white text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </label>
                <span className="text-[#666D80] font-medium">-</span>
                <label className="flex flex-row items-center gap-2 text-sm text-[#36394A]">
                  <span className="text-[#666D80] font-medium">Max</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    min={0}
                    className="w-20 bg-white text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </label>
              </div>
            </div>
            <div className="px-4 py-3 md:w-1/5">
              <div className="text-sm font-semibold">Recency:</div>
              <div className="mt-2 flex items-center justify-between w-full text-sm text-[#36394A]">
                <div className="text-sm text-[#36394A]">All</div>
                <BsChevronDown />
              </div>
            </div>
            <div className="px-4 py-3 w-30 justify-end md:flex hidden order-6">
              <button type="button" onClick={resetFilters} className="text-sm underline text-[#7D8B57]">
                Reset All
              </button>
            </div>
          </div>

          <div className="border border-t-0 px-4 py-4 border-[#F7F7F8] flex flex-wrap items-center gap-3">
            {chips.map((chip) => (
              <div key={chip} className="inline-flex items-center gap-2 rounded-full border border-[#E6E8EE] bg-[#36394A] px-4 py-2 text-sm font-medium text-white">
                <span>{chip}</span>
                <AiOutlineClose className="text-white" />
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border border-t-0 border-[#F7F7F8] w-full flex justify-end md:hidden">
            <button type="button" onClick={resetFilters} className="text-sm underline text-[#616D43]">
              Reset All
            </button>
          </div>
        </div>
      </section>
      <section className="md:w-10/12 w-11/12 mx-auto py-20">
        <div className="grid gap-3 lg:grid-cols-4 w-full">
          {filteredListings.map((listing) => {
            const slug = listing.slug.current
            const imageUrl = listing.gallery?.[0]?.asset?.url || '/assets/images/listing-image.png'
            const location = [listing.city, listing.state].filter(Boolean).join(' • ')
            return (
              <Link href={`/listings/${slug}`} key={slug} className="snap-center shrink-0 w-full overflow-hidden bg-white">
                <img src={imageUrl} alt={listing.title} className="h-100 w-full object-cover" />
                <div className="space-y-2 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm text-[#36394A] font-medium w-2/3">{listing.title}</h3>
                    <span className="text-sm font-medium text-[#36394A]">N {formatCompactNumber(listing.price)}<span className="text-[#666D80]">/YR</span></span>
                  </div>
                  <p className="text-sm text-[#666D80] font-medium">{location}</p>
                  <div className="flex items-center gap-4 text-xs text-[#666D80] font-medium">
                    <span className="inline-flex items-center gap-2">
                      <MdBed className="text-[#36394A]" />
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
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="rounded-full bg-[#616D43] px-8 py-4 text-base font-medium text-white transition hover:bg-[#2e3223]"
          >
            See More
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center w-11/12 md:my-38 mb-20 md:space-y-10 space-y-8">
        <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313] text-center">Let Us Find It <br/> For You.</div>
        <div className="text-[#666D80] md:w-164 text-center text-[1rem] leading-7">
          The Lagos property market is dynamic, and the best opportunities are often not listed publicly. Our advisors have access to exclusive, off-market properties and can alert you the moment a match becomes available. Let us know your requirements, and we will guide you to it.
        </div>
        <div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
            Speak with an Advisor
            <FiChevronRight size={18} />
          </button>
        </div>
      </section>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const listings = await sanityClient.fetch(`*[_type == "listing" && status == "active"] | order(_updatedAt desc){
    title,
    slug,
    price,
    city,
    state,
    bedrooms,
    baths,
    gallery[0]{asset->{url}},
    category
  }`)

  return {
    props: {
      listings,
    },
    revalidate: 60,
  }
}
