import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router' // 👈 Added for URL persistence
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { MdBed, MdBathtub } from 'react-icons/md'
import { FiChevronRight } from 'react-icons/fi'
import { sanityClient } from '@/lib/sanity'
import { formatCompactNumber } from '@/lib/common'
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
  category?: string[]
  _updatedAt?: string
  gallery?: { asset?: { url?: string } }
}

const tabOptions = ['All', 'For Sale', 'For Rent', 'Shortlet']
const recencyOptions = ['All', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days', 'Last 120 days']

const formatLabel = (value: string) =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export default function Listings({ listings }: { listings: Listing[] }) {
  const router = useRouter()
  const PAGE_SIZE = 12

  // Helper to safely get a query param as string (fallback if missing)
  const getQueryParam = (key: string, fallback: string): string => {
    const val = router.query[key]
    return Array.isArray(val) ? val[0] || fallback : val || fallback
  }

  // --- State initialised from URL query parameters ---
  const [selectedTab, setSelectedTab] = useState(getQueryParam('tab', 'All'))
  const [roomsFilter, setRoomsFilter] = useState(getQueryParam('rooms', 'All'))
  const [typeFilter, setTypeFilter] = useState(getQueryParam('type', 'All'))
  const [locationFilter, setLocationFilter] = useState(getQueryParam('location', 'All'))
  const [recencyFilter, setRecencyFilter] = useState(getQueryParam('recency', 'All'))

  // Price range (numbers)
  const [priceMin, setPriceMin] = useState<number>(() => {
    const raw = getQueryParam('priceMin', '0')
    return Number(raw) || 0
  })
  const [priceMax, setPriceMax] = useState<number>(() => {
    const raw = getQueryParam('priceMax', '1000000000')
    return Number(raw) || 1000000000
  })

  const [page, setPage] = useState(0)
  const [loadedListings, setLoadedListings] = useState<Listing[]>(listings)
  const [loadingMore, setLoadingMore] = useState(false)

  // --- URL update helpers ---
  const updateQuery = (updates: Record<string, string | null>) => {
    const newQuery = { ...router.query }
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All') {
        newQuery[key] = value
      } else {
        delete newQuery[key]
      }
    })
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true })
  }

  const updateFilter = (key: string, value: string) => {
    updateQuery({ [key]: value })
  }

  // --- Wrapped setters that also update URL ---
  const setSelectedTabAndURL = (val: string) => {
    setSelectedTab(val)
    updateFilter('tab', val)
  }
  const setRoomsFilterAndURL = (val: string) => {
    setRoomsFilter(val)
    updateFilter('rooms', val)
  }
  const setTypeFilterAndURL = (val: string) => {
    setTypeFilter(val)
    updateFilter('type', val)
  }
  const setLocationFilterAndURL = (val: string) => {
    setLocationFilter(val)
    updateFilter('location', val)
  }
  const setRecencyFilterAndURL = (val: string) => {
    setRecencyFilter(val)
    updateFilter('recency', val)
  }
  const setPriceMinAndURL = (val: number) => {
    setPriceMin(val)
    updateQuery({ priceMin: val.toString() })
  }
  const setPriceMaxAndURL = (val: number) => {
    setPriceMax(val)
    updateQuery({ priceMax: val.toString() })
  }

  // --- Reset all filters (clear URL params) ---
  const resetFilters = () => {
    setSelectedTab('All')
    setRoomsFilter('All')
    setTypeFilter('All')
    setLocationFilter('All')
    setRecencyFilter('All')
    setPriceMin(0)
    setPriceMax(1000000000)

    // Remove all filter query keys
    const { tab, rooms, type, location, recency, priceMin: _, priceMax: __, ...rest } = router.query
    router.push({ pathname: router.pathname, query: rest }, undefined, { shallow: true })
  }

  // --- Derived data (room/type/location options from loaded listings) ---
  const roomOptions = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          loadedListings
            .map((listing) => listing.bedrooms)
            .filter((bedroom) => bedroom !== undefined && bedroom !== null)
            .map(String)
        )
      ).sort((a, b) => Number(a) - Number(b)),
    ],
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

  // --- Filtered listings ---
  const categoryFilter =
    selectedTab === 'For Sale'
      ? 'for-sale' :
      selectedTab === 'Shortlet'
      ? 'shortlet'
      : selectedTab === 'For Rent'
      ? 'for-rent'
      : undefined

  const filteredListings = useMemo(() => {
    const cutoff = (days: number) => Date.now() - days * 24 * 60 * 60 * 1000

    return loadedListings
      .filter((listing) => !categoryFilter || listing.category?.includes(categoryFilter))
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
        if (recencyFilter === 'Last 60 days') return updatedAt >= cutoff(60)
        if (recencyFilter === 'Last 90 days') return updatedAt >= cutoff(90)
        if (recencyFilter === 'Last 120 days') return updatedAt >= cutoff(120)
        return true
      })
  }, [loadedListings, categoryFilter, roomsFilter, typeFilter, locationFilter, recencyFilter, priceMin, priceMax])

  // --- Load More ---
  const handleLoadMore = async () => {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const start = (page + 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      const more: Listing[] = await sanityClient.fetch(`*[_type == "listing" && status == "active"] | order(_updatedAt desc)[${start}...${end}]{
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
      // ignore
    } finally {
      setLoadingMore(false)
    }
  }

  // --- Active filters & no-results message ---
  const activeFilters = []
  if (selectedTab !== 'All') activeFilters.push(selectedTab)
  if (typeFilter !== 'All') activeFilters.push(formatLabel(typeFilter))
  if (locationFilter !== 'All') activeFilters.push(`in ${locationFilter}`)
  if (roomsFilter !== 'All') activeFilters.push(`${roomsFilter} bedrooms`)
  if (recencyFilter !== 'All') activeFilters.push(recencyFilter)

  const noResultsMessage =
    activeFilters.length === 0
      ? "We couldn't find any properties. Try broadening your search criteria."
      : `We couldn't find any ${activeFilters.join(' ')}. Try broadening your property type or exploring nearby locations.`


  useEffect(() => {
    if (!router.isReady) return

    setSelectedTab(getQueryParam('tab', 'All'))
    setRoomsFilter(getQueryParam('rooms', 'All'))
    setTypeFilter(getQueryParam('type', 'All'))
    setLocationFilter(getQueryParam('location', 'All'))
    setRecencyFilter(getQueryParam('recency', 'All'))

    const rawPriceMin = getQueryParam('priceMin', '0')
    const rawPriceMax = getQueryParam('priceMax', '1000000000')

    setPriceMin(Number(rawPriceMin) || 0)
    setPriceMax(Number(rawPriceMax) || 1000000000)
  }, [router.isReady, router.query])
  return (
    <BasicLayout
      title="Listings | Waaz Realty"
      description="Browse available properties for sale and rent with Waaz Realty."
      image="/assets/portfolio-preview.png"
      url="/listings"
      canonical="/listings"
      keywords={['listings', 'properties', 'sale', 'rent']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-15 mt-25">
        <div className="lg:text-[4rem] md:text-[3.5rem] text-[3rem] md:text-left text-center font-serif italic lg:leading-24 leading-14">
          Available Properties in Lagos
        </div>
        <div className="text-[#666D80] md:w-155 md:text-left text-center text-[1rem] leading-7 mt-5">
          Each property in our portfolio is selected for its quality, value, and potential to become the foundation for your future. Whether you are looking to buy or rent, your journey towards an elevated lifestyle begins here. Use the filters below to refine your search.
        </div>
      </section>

      <section className="md:w-10/12 w-11/12 mx-auto">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap md items-center md:w-auto w-11/12 gap-3 border-2 border-b-0 border-[#F7F7F8] px-2">
              {tabOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedTabAndURL(option)}  // 👈 Updated
                  className={`p-2 text-base font-medium transition ${
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

          <div className="md:gap-3 gap-2 flex flex-row lg:flex-nowrap flex-wrap justify-between items-end border-2 border-[#F7F7F8] p-3">
            <div className="md:w-1/5 w-[48%]">
              <div className="text-base font-semibold mb-2">Rooms:</div>
              <SelectField
                recordList={roomOptions}
                value={roomsFilter}
                onChangeText={(value) => setRoomsFilterAndURL(value)}  // 👈 Updated
                placeholder="Select rooms"
              />
            </div>
            <div className="md:w-1/5 w-[48%]">
              <div className="text-base font-semibold mb-2">Type:</div>
              <SelectField
                recordList={typeOptions}
                value={typeFilter}
                onChangeText={(value) => setTypeFilterAndURL(value)}  // 👈 Updated
                placeholder="Select type"
              />
            </div>
            <div className="md:w-1/5 w-[48%]">
              <div className="text-base font-semibold mb-2">Location:</div>
              <SelectField
                recordList={locationOptions}
                value={locationFilter}
                onChangeText={(value) => setLocationFilterAndURL(value)}  // 👈 Updated
                placeholder="Select location"
              />
            </div>
            <div className="md:w-1/5 w-[48%] md:hidden block">
              <div className="text-base font-semibold mb-2">Recency:</div>
              <SelectField
                recordList={recencyOptions}
                value={recencyFilter}
                onChangeText={(value) => setRecencyFilterAndURL(value)}  // 👈 Updated
                placeholder="Select recency"
              />
            </div>
            <div className="md:w-2/6">
              <div className="text-base font-semibold mb-2">Price Range:</div>
              <div className="p-1 flex flex-row items-center justify-between w-full rounded-full bg-[#F6F8FA]">
                <div className="flex flex-row items-center w-[45%] gap-2 text-base text-[#36394A] bg-white rounded-full p-2">
                  <span className="text-[#666D80] font-medium">Min</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMinAndURL(Number(e.target.value))}  // 👈 Updated
                    min={0}
                    className="w-full text-base font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </div>
                <span className="text-[#666D80] font-medium px-2">-</span>
                <div className="flex flex-row items-center w-[45%] gap-2 text-base text-[#36394A] bg-white rounded-full p-2">
                  <span className="text-[#666D80] font-medium">Max</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMaxAndURL(Number(e.target.value))}  // 👈 Updated
                    min={0}
                    className="w-full text-base font-semibold outline-none transition focus:ring-2 focus:ring-[#616D4320]"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/5 w-1/2 md:block hidden">
              <div className="text-base font-semibold mb-2">Recency:</div>
              <SelectField
                recordList={recencyOptions}
                value={recencyFilter}
                onChangeText={(value) => setRecencyFilterAndURL(value)}  // 👈 Updated
                placeholder="Select recency"
              />
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
                <div key={chip} className="inline-flex items-center gap-2 rounded-full border border-[#E6E8EE] bg-[#36394A] px-4 py-2 text-base font-medium text-white">
                  <span>{chip}</span>

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
        <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 w-full">
          {filteredListings.map((listing) => {
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
                      {selectedTab === "for-rent" && <span className="text-[#666D80]">/YR</span>}
                      {selectedTab === "shortlet" && <span className="text-[#666D80]">/NT</span>}
                    </div>
                  </div>

                  <p className="text-base font-medium text-[#666D80]">
                    {location}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-medium text-[#666D80]">
                    <span className="inline-flex items-center gap-2">
                      <MdBed className="text-[#36394A] -mb-1" />
                      {listing.bedrooms} bedrooms
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <MdBathtub className="text-[#36394A] -mb-1" />
                      {listing.baths} baths
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        {filteredListings.length === 0 &&
          <div className="w-full flex flex-col py-20 items-center space-y-5">
            <div className="text-3xl italic font-medium font-serif">No exact matches found</div>
            <div className="text-[#666D80] text-center text-base lg:w-[40%] md:w-[60%]">
              {noResultsMessage}
            </div>
          </div>
        }
        
        {filteredListings.length > 12 &&
          <div className="w-full flex justify-center mt-5">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="rounded-full bg-[#616D43] px-5 py-2 text-base font-medium text-white transition hover:bg-[#2e3223] disabled:opacity-60"
            >
              {loadingMore ? 'Loading…' : 'See More'}
            </button>
          </div>
        }
      </section>

      <section className="relative md:aspect-video aspect-2/3 lg:w-10/12 w-full overflow-hidden my-20">
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/banner.svg')" }} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
          <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] lg:w-[30%] italic font-serif text-[#131313] text-center">Let Us Find It <br/> For You.</div>
          <div className="text-[#666D80] lg:w-[55%] text-center text-[1rem] leading-7">
            The Lagos property market is dynamic, and the best opportunities are often not listed publicly. Our advisors have access to exclusive, off-market properties and can alert you the moment a match becomes available. Let us know your requirements, and we will guide you to it.
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
  const listings = await sanityClient.fetch(`*[_type == "listing" && status == "active"] | order(_updatedAt desc)[0...${PAGE_SIZE}]{
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