import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { MdBed, MdBathtub } from "react-icons/md"
import { FiChevronRight } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { formatCompactNumber } from '@/lib/common'
import { sanityClient } from '@/lib/sanity'
import SelectField from '@/components/Select'

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

const recencyOptions = ['All', 'Last 7 days', 'Last 30 days']

const formatLabel = (value: string) =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export default function Rent({ listings }: { listings: Listing[] }) {
  const PAGE_SIZE = 12
  const [selectedTab, setSelectedTab] = useState('All')
  const [roomsFilter, setRoomsFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [recencyFilter, setRecencyFilter] = useState('All')
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(1000000000)
  const [page, setPage] = useState(0)
  const [loadedListings, setLoadedListings] = useState<Listing[]>(listings)
  const [loadingMore, setLoadingMore] = useState(false)

  const roomOptions = useMemo(
    () => ['All', ...Array.from(new Set(loadedListings.map((listing) => listing.bedrooms).filter(Boolean) as string[]))],
    [loadedListings]
  )

  const typeOptions = useMemo(
    () => ['All', ...Array.from(new Set(loadedListings.map((listing) => listing.propertyType).filter(Boolean) as string[]))],
    [loadedListings]
  )

  const locationOptions = useMemo(
    () =>
      ['All',
        ...Array.from(
          new Set(
            loadedListings
              .map((listing) => [listing.city, listing.state].filter(Boolean).join(' • '))
              .filter(Boolean) as string[]
          )
        )
      ],
    [loadedListings]
  )

  const filteredListings = useMemo(() => {
    const cutoff = (days: number) => Date.now() - days * 24 * 60 * 60 * 1000

    return loadedListings
      .filter((listing) => !roomsFilter || roomsFilter === 'All' || listing.bedrooms === roomsFilter)
      .filter((listing) => !typeFilter || typeFilter === 'All' || listing.propertyType === typeFilter)
      .filter(
        (listing) =>
          !locationFilter ||
          locationFilter === 'All' ||
          [listing.city, listing.state].filter(Boolean).join(' • ') === locationFilter
      )
      .filter((listing) => {
        const price = listing.price ?? 0
        return price >= priceMin && price <= priceMax
      })
      .filter((listing) => {
        if (recencyFilter === 'All') return true
        if (!listing._updatedAt) return false
        const updatedAt = new Date(listing._updatedAt).getTime()
        if (recencyFilter === 'Last 7 days') return updatedAt >= cutoff(7)
        if (recencyFilter === 'Last 30 days') return updatedAt >= cutoff(30)
        return true
      })
  }, [loadedListings, roomsFilter, typeFilter, locationFilter, recencyFilter, priceMin, priceMax])

  const resetFilters = () => {
    setSelectedTab('All')
    setRoomsFilter('All')
    setTypeFilter('All')
    setLocationFilter('All')
    setRecencyFilter('All')
    setPriceMin(0)
    setPriceMax(1000000000)
  }

  const handleLoadMore = async () => {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const start = (page + 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      const more: Listing[] = await sanityClient.fetch(`*[_type == "listing" && category == "for-sale" && status == "active"] | order(_updatedAt desc)[${start}...${end}]{
        title,
        slug,
        price,
        city,
        state,
        bedrooms,
        baths,
        propertyType,
        category,
        _updatedAt,
        gallery[0]{asset->{url}}
      }`)

      if (more && more.length > 0) {
        setLoadedListings((s) => [...s, ...more])
        setPage((p) => p + 1)
      }
    } catch (err) {
      // ignore for now
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <BasicLayout
      title="Properties for Sale | Wazz Realty"
      description="Browse available properties for sale and rent with Wazz Realty."
      image="/assets/portfolio-preview.png"
      url="/listings"
      canonical="/listings"
      keywords={['listings', 'properties', 'sale', 'rent']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-10 space-y-5 items-center">
        <div className="md:text-[4rem] text-[3rem] font-serif italic md:leading-24 leading-18">
          Properties for <span className="text-[#7D8B57]">Rent</span>
        </div>
        <div className="text-[#666D80] md:w-[55%] text-center text-[1rem] leading-7">
          Explore a curated selection of premium rental properties across Lagos. Every home is vetted for quality and comfort. Use the filters below to begin your search.
        </div>
      </section>
      <section className="md:w-10/12 w-11/12 mx-auto mt-15">
        <div className="w-full">
          <div className="md:gap-3 flex flex-row md:flex-nowrap flex-wrap md:justify-between items-end border-2 border-[#F7F7F8] p-3">
            <div className="md:w-1/5 w-1/2">
              <div className="text-sm font-semibold mb-2">Rooms:</div>
              <SelectField recordList={roomOptions} value={roomsFilter} onChangeText={(value) => setRoomsFilter(value)} placeholder="Select rooms" />
            </div>
            <div className="md:w-1/5 w-1/2">
              <div className="text-sm font-semibold mb-2">Type:</div>
              <SelectField recordList={typeOptions} value={typeFilter} onChangeText={(value) => setTypeFilter(value)} placeholder="Select type" />
            </div>
            <div className="md:w-1/5 w-1/2">
              <div className="text-sm font-semibold mb-2">Location:</div>
              <SelectField recordList={locationOptions} value={locationFilter} onChangeText={(value) => setLocationFilter(value)} placeholder="Select location" />
            </div>
            <div className="md:w-1/5 w-1/2 md:hidden block">
              <div className="text-sm font-semibold mb-2">Recency:</div>
              <SelectField recordList={recencyOptions} value={recencyFilter} onChangeText={(value) => setRecencyFilter(value)} placeholder="Select recency" />
            </div>
            <div className="md:w-2/6">
              <div className="text-sm font-semibold mb-2">Price Range:</div>
              <div className="p-1 flex flex-row items-center justify-between w-full rounded-full bg-[#F6F8FA]">
                <div className="flex flex-row items-center w-[45%] gap-2 text-sm text-[#36394A] bg-white rounded-full p-2">
                  <span className="text-[#666D80] font-medium">Min</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    min={0}
                    className="w-full text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </div>
                <span className="text-[#666D80] font-medium px-2">-</span>
                <div className="flex flex-row items-center w-[45%] gap-2 text-sm text-[#36394A] bg-white rounded-full p-2">
                  <span className="text-[#666D80] font-medium">Max</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    min={0}
                    className="w-full text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/5 w-1/2 md:block hidden">
              <div className="text-sm font-semibold mb-2">Recency:</div>
              <SelectField recordList={recencyOptions} value={recencyFilter} onChangeText={(value) => setRecencyFilter(value)} placeholder="Select recency" />
            </div>
            <div className="px-4 w-30 justify-end md:flex hidden order-6">
              <button type="button" onClick={resetFilters} className="text-sm underline text-[#7D8B57] cursor-pointer md:mb-3">
                Reset All
              </button>
            </div>
          </div>

          <div className="border border-t-0 px-4 py-4 border-[#F7F7F8] flex flex-wrap items-center md:justify-start justify-end gap-3">
            {[
              selectedTab !== 'All' ? selectedTab : null,
              roomsFilter !== 'All' ? roomsFilter : null,
              typeFilter !== 'All' ? formatLabel(typeFilter) : null,
              locationFilter !== 'All' ? locationFilter : null,
              recencyFilter !== 'All' ? recencyFilter : null,
            ]
              .filter(Boolean)
              .map((chip) => (
                <div key={chip} className="inline-flex items-center gap-2 rounded-full border border-[#E6E8EE] bg-[#36394A] px-4 py-2 text-sm font-medium text-white">
                  <span>{chip}</span>
                  <AiOutlineClose className="text-white" />
                </div>
              ))}
          </div>
          <div className="px-4 border border-t-0 border-[#F7F7F8] w-full flex justify-end md:hidden cursor-pointer">
            <div onClick={resetFilters} className="text-sm underline text-[#616D43]">
              Reset All
            </div>
          </div>
        </div>
      </section>
      <section className="md:w-10/12 w-11/12 mx-auto">
        <div className="grid gap-3 lg:grid-cols-4 w-full">
          {filteredListings.map((listing) => {
            const slug = listing.slug.current
            const imageUrl = listing.gallery?.asset?.url
            const location = [listing.city, listing.state].filter(Boolean).join(' • ')
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
        <div className="w-full mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-full bg-[#616D43] px-5 py-2 text-base font-medium text-white transition hover:bg-[#2e3223] disabled:opacity-60"
          >
            {loadingMore ? 'Loading…' : 'See More'}
          </button>
        </div>
      </section>
      <section className="relative md:aspect-video aspect-2/3 md:w-10/12 w-full overflow-hidden my-30">
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/banner.svg')" }} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
          <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] md:w-full italic font-serif text-[#131313] text-center">Let Us Find Your <br/> Next Home.</div>
          <div className="text-[#666D80] md:w-[48%] text-center text-[1rem] leading-7">
            The ideal rental property can be hard to find, with the best options often leased before they are publicly listed. Our advisors have access to exclusive, off-market rentals. Tell us your requirements, and we will connect you with a home that meets your standards.
          </div>
          <div className="mt-5">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-5 py-2 text-white transition hover:opacity-90 capitalize">
              Speak with an Advisor
              <FiChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const PAGE_SIZE = 12
  const listings = await sanityClient.fetch(`*[_type == "listing" && category == "for-rent" && status == "active"] | order(_updatedAt desc)[0...${PAGE_SIZE}]{
    title,
    slug,
    price,
    city,
    state,
    bedrooms,
    baths,
    propertyType,
    category,
    _updatedAt,
    gallery[0]{asset->{url}}
  }`)

  return {
    props: {
      listings,
    },
    revalidate: 60,
  }
}