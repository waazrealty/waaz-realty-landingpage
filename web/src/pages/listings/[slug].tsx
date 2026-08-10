import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import { getFormattedDate } from '@/lib/common'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import MoreListings from '@/components/MoreListings'
import Carousel from '@/components/Carousel'
import { MdBed, MdBathtub, MdBathroom, MdOutlineStar, MdFolderOpen, MdOutlineGavel, MdAirportShuttle, MdLight, MdSecurity, MdLocalConvenienceStore, MdFitnessCenter, MdNaturePeople, MdChurch, MdMosque, MdError, MdReceipt, MdOutlineCall } from 'react-icons/md'
import { GiPowerGenerator } from 'react-icons/gi'
import { VscChevronRight } from 'react-icons/vsc'
import { IoLogoWhatsapp } from 'react-icons/io'

type ListingDetail = {
  title: string
  slug: { current: string }
  price?: number
  city?: string
  state?: string
  bedrooms?: string
  baths?: string
  propertyType?: string
  category?: string
  gallery?: Array<{ asset?: { url?: string } }>
  description?: any[]
  propertyFeatures?: string[]
  availableDocuments?: string[]
  communityAmenities?: string[]
  propertyRules?: string[]
  moveInCosts?: Array<{ item?: string; detail?: string; amount?: number }>
  agent?: { name?: string; phone?: string; photo?: { asset?: { url?: string } }; bio?: string }
  _updatedAt?: string
}

const formatPrice = (value?: number) => {
  if (!value) return 'Price on request'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

const formatLabel = (value: string) =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export default function ListingDetails({ listing }: { listing: ListingDetail | null }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <BasicLayout title="Loading..." description="Loading listing details...">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  if (!listing) {
    return (
      <BasicLayout title="Listing not found | Wazz Realty" description="The listing could not be found.">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Listing not found</h1>
            <p className="mt-4 text-slate-600">Please check the listing link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/listings/${listing.slug.current}`
  const location = [listing.city, listing.state].filter(Boolean).join(' • ')
  const summary = listing.description?.find((block: any) => block._type === 'block')?.children?.map((child: any) => child.text).join(' ') || ''
  const agent = listing.agent || { name: 'Dami', phone: '+234 807 909 7547' }
  const imageUrl = listing.gallery?.[0]?.asset?.url || '/assets/images/listing-image.png'

  return (
    <BasicLayout
      title={listing.title}
      description={summary.slice(0, 140)}
      canonical={canonical}
      image={imageUrl}
      url={canonical}
      keywords={['listings', 'real estate', 'property', 'Wazz Realty']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12">
        <div className="md:text-[3rem] text-[2rem] leading-12 font-medium font-serif italic">
          <span className="px-1 text-[#666D80]">Listings</span>/ {listing.title}
        </div>
      </section>
      <Carousel images={listing.gallery?.map((item) => item.asset?.url).filter(Boolean) as string[] | undefined} />
      <section className="md:w-10/12 flex flex-col lg:flex-row gap-25 md:py-12 px-4 lg:px-0 md:-mt-10">
        <div className="lg:w-[60%] space-y-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm text-[#666D80] font-medium">{location}</div>
            <div className="flex flex-col gap-2 md:gap-4 font-serif font-medium italic text-4xl">
              <div className="leading-tight">{listing.title}</div>
              <div>
                {formatPrice(listing.price)} <span className="text-[#666D80]">Yearly</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-base leading-8 text-slate-600">
            {listing.description ? <PortableText value={listing.description} /> : 'Details for this property are coming soon.'}
          </div>

          <div className="mt-4 text-base leading-8 font-medium">
            Schedule a private viewing today to experience it for yourself.
          </div>

          <div className="flex flex-col w-full gap-6 font-medium">
            <div className="w-full">
              <div className="w-auto flex space-x-2 px-5 py-2">
                <MdOutlineStar />
                <div className="text-sm font-medium">Features</div>
              </div>
              <div className="flex flex-row flex-wrap md:justify-between md:gap-0 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {(listing.propertyFeatures || ['4 Bedrooms', '2 Baths', 'Parking', 'Generator', 'Security']).map((feature) => (
                  <span key={feature} className="inline-flex items-center gap-2">
                    <MdBed className="text-[#36394A] text-lg" />
                    {formatLabel(feature)}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-2 px-5 py-2 ">
                <MdFolderOpen className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Available Documents</div>
              </div>
              <div className="flex flex-row flex-wrap md:gap-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {(listing.availableDocuments || ['Governor’s consent', 'Certificate of ownership (C of O)']).map((doc) => (
                  <span key={doc} className="inline-flex items-center gap-2">
                    <MdOutlineGavel className="text-[#36394A] text-lg" />
                    {formatLabel(doc)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col w-full gap-6 font-medium">
            <div className="w-full">
              <div className="w-auto flex space-x-2 px-5 py-2">
                <MdBathroom />
                <div className="text-sm font-medium">Community & Lifestyle Amenities</div>
              </div>
              <div className="flex flex-row flex-wrap md:space-x-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {(listing.communityAmenities || ['Parking Space', 'Street Light', 'Security', 'Gym', 'Children Playground']).map((amenity) => (
                  <span key={amenity} className="inline-flex items-center gap-2">
                    <MdLocalConvenienceStore className="text-[#36394A] text-lg" />
                    {formatLabel(amenity)}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-2 px-5 py-2 ">
                <MdError className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Key Property Details</div>
              </div>
              <div className="flex flex-row flex-wrap gap-10 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {(listing.propertyRules || ['No generators allowed']).map((rule) => (
                  <span key={rule} className="inline-flex items-center gap-2">
                    <GiPowerGenerator className="text-[#36394A] text-lg" />
                    {formatLabel(rule)}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-2 px-5 py-2 ">
                <MdReceipt className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Move-In Cost Overview</div>
              </div>
              <div className="flex flex-col gap-10 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-700">
                    <tbody>
                      {(listing.moveInCosts && listing.moveInCosts.length > 0 ? listing.moveInCosts : [
                        { item: 'Rent', detail: '₦250,000 x 2 Years', amount: 50000000 },
                        { item: 'Legal Fee', detail: '10% Of Rent', amount: 5000000 },
                        { item: 'Agency Fee', detail: '10% Of Rent', amount: 5000000 },
                        { item: 'Caution Fee', detail: '10% Of Rent', amount: 5000000 },
                      ]).map((cost) => (
                        <tr key={cost.item}>
                          <td className="py-2.5 font-medium">{cost.item}</td>
                          <td className="text-center">{cost.detail}</td>
                          <td className="text-right">{cost.amount ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(cost.amount) : '-'}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="pt-6 pb-2 text-base font-semibold">Total</td>
                        <td />
                        <td className="pt-6 pb-2 text-base font-semibold text-right">₦50,200,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] space-y-6">
          <div className="bg-[#7D8B57] md:p-10 p-5">
            <div className="flex flex-col gap-7">
              <div className="flex flex-row items-center gap-4">
                <img src={agent.photo?.asset?.url || '/assets/images/caller.png'} alt={agent.name || 'Agent'} className="h-20 w-20 rounded-full object-cover" />
                <div className="text-white">
                  <p className="text-base">{agent.name || 'Dami'}</p>
                  <p className="text-sm">Agent in charge</p>
                </div>
              </div>
              <div>
                <div className="text-sm text-white text-justify leading-5">
                  {agent.bio || 'As your dedicated Wazz Realty advisor for this property, I am here to provide detailed information and guide you through every step of the process. My goal is to ensure your experience is seamless and informed.'}
                </div>
              </div>

              <div className="gap-2 flex flex-col">
                <div className="flex items-center gap-[.2rem]">
                  <div className="flex items-center gap-[.2rem] font-medium capitalize p-3 bg-white">
                    <MdOutlineCall size={22} className="mb-[-0.1rem]" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    {agent.phone || '+234 807 909 7547'}
                    <VscChevronRight size={14} />
                  </div>
                </div>
                <div className="flex items-center gap-[.2rem]">
                  <div className="flex items-center gap-1 font-medium capitalize p-3 bg-white">
                    <IoLogoWhatsapp size={22} className="mb-[-0.1rem] text-[#58B04E]" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    Send {agent.name || 'Agent'} a Message
                    <VscChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:p-6 p-5">
            <p className="text-[2rem] italic font-medium font-serif">Schedule an Inspection</p>
            <form className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-700">Name</label>
                <input type="text" placeholder="Enter name" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" placeholder="Enter phone number" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea rows={4} placeholder="Hello, I am interested in this property. Please let me know the best time for a viewing." className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div className="flex items-center justify-end">
                <button className="text-sm inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
                  Request Inspection
                  <FiChevronRight size={14} className="-mb-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <MoreListings />
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex md:flex-row flex-col md:items-center md:justify-center w-11/12 mb:mb-35 mb-18 md:space-x-56 md:space-y-0 space-y-8">
        <div className="max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Start your property <br/> journey with us</div>
        <div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
            Contact Us
            <FiChevronRight size={18} />
          </button>
        </div>
      </section>
    </BasicLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listings = await sanityClient.fetch(`*[_type == "listing" && status == "active"]{ "slug": slug.current }`)

  return {
    paths: listings.map((listing: { slug: string }) => ({ params: { slug: listing.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const listing = await sanityClient.fetch(
    `*[_type == "listing" && status == "active" && slug.current == $slug][0]{
      title,
      slug,
      price,
      city,
      state,
      bedrooms,
      baths,
      propertyType,
      category,
      gallery[]{asset->{url}},
      description,
      propertyFeatures,
      availableDocuments,
      communityAmenities,
      propertyRules,
      moveInCosts,
      agent->{name, phone, photo{asset->{url}}, bio},
      _updatedAt
    }`,
    { slug }
  )

  if (!listing) {
    return { notFound: true }
  }

  return {
    props: {
      listing,
    },
    revalidate: 60,
  }
}
