import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { FiChevronRight } from 'react-icons/fi'
import MoreListings from '@/components/MoreListings'
import Carousel from '@/components/Carousel'
import { MdBed, MdBathtub, MdBathroom, MdOutlineStar, MdFoodBank, MdLocalMall, MdFolderOpen, MdOutlineGavel, MdAirportShuttle, MdLight, MdSecurity, MdLocalConvenienceStore, MdFitnessCenter, MdNaturePeople, MdChurch, MdMosque, MdError, MdReceipt, MdOutlineCall } from 'react-icons/md'
import { GiPowerGenerator } from 'react-icons/gi'
import { VscChevronRight } from 'react-icons/vsc'
import { IoLogoWhatsapp } from 'react-icons/io'

const posts = [
  {
    id: 1,
    title: 'Palm Beach',
    slug: 'palm-beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/listing-image.png',
  },
  {
    id: 2,
    title: 'Palm Beach',
    slug: 'palm-beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/listing-image.png',
  },
  {
    id: 3,
    title: 'Palm Beach',
    slug: 'palm-beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/listing-image.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    slug: 'palm-beach',
    price: '₦250M /YR',
    location: 'Ajao Estate  •  Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/listing-image.png',
  }
]

export default function PortfolioDetails() {
  const router = useRouter()
  const { slug } = router.query
  const post = typeof slug === 'string' ? posts.find((item) => item.slug === slug) : undefined

  if (!router.isReady) {
    return (
      <BasicLayout title={post ? post.title : 'Loading...'} description={post ? post.title.slice(0, 120) : 'Loading listing...'}>
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  if (!post) {
    return (
      <BasicLayout title="Post not found | Wazz Realty" description="The post could not be found.">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Listings not found</h1>
            <p className="mt-4 text-slate-600">Please check the portfolio link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/listings/${post.slug}`

  return (
    <BasicLayout
      title={post.title}
      description={post.title.slice(0, 120)}
      canonical={canonical}
      image={`/assets/blog/${post.slug}-preview.png`}
      url={canonical}
      keywords={['blog', 'real estate', 'property', 'Wazz Realty']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12">
        <div className="md:text-[3rem] text-[2rem] leading-12 font-medium font-serif italic"><span className="px-1 text-[#666D80]">Listings</span>/ site 4-Bedroom Duplex with Modern Amenities</div>
      </section>
      <Carousel />
      
      <section className="md:w-10/12 flex flex-col lg:flex-row gap-25 md:py-12 px-4 lg:px-0 md:-mt-10">
        <div className="lg:w-[60%] space-y-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm text-[#666D80] font-medium">Ajao Estate <span className="px-1">•</span> Lagos</div>
            <div className="flex flex-col gap-2 md:gap-4 font-serif font-medium italic text-4xl">
              <div className="leading-tight">Exquisite 4-Bedroom Duplex with Modern Amenities</div>
              <div className="">₦250,000,000 <span className="text-[#666D80]">Monthly</span></div>
            </div>
          </div>
          <div className="mt-8 text-base leading-8 text-slate-600">
            Discover a new standard of living in this meticulously designed 4-bedroom duplex, perfectly situated in the secure and sought-after community of Lekki Phase 1.
            This property is an architectural statement, crafted for those who appreciate fine detail and modern comfort.
          </div>
          <div className="mt-4 text-base leading-8 text-slate-600">
            The ground floor opens into an expansive, sun-drenched living area that flows seamlessly into a gourmet kitchen, equipped with top-of-the-line fixtures and ample storage.
            Each of the four en-suite bedrooms serves as a private sanctuary, with the master suite featuring a walk-in closet and a spa-like bathroom.
          </div>

          <div className="mt-4 text-base leading-8 text-slate-600">
            Step outside to enjoy the private swimming pool and serene surroundings. With 24/7 security and a prime location, this property is more than a home; it's a foundation for an elevated lifestyle.
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
                <span className="inline-flex items-center gap-2">
                  <MdBed  className="text-[#36394A] text-lg" />
                  4 Bedrooms
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdBathtub  className="text-[#36394A] text-lg" />
                  2 Baths
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdBathroom className="text-[#36394A] text-lg" />
                  Toilets
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdFoodBank  className="text-[#36394A] text-lg" />
                  Pantry
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdLocalMall  className="text-[#36394A] text-lg" />
                  Store
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-2 px-5 py-2 ">
                <MdFolderOpen className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Available Documents</div>
              </div>
              <div className="flex flex-row flex-wrap md:gap-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                <span className="inline-flex items-center gap-2">
                  <MdOutlineGavel className="text-[#36394A] text-lg" />
                  Governor’s consent
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdBathtub className="text-[#36394A] text-lg" />
                  Certificate of ownership (C of O)
                </span>
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
                <span className="inline-flex items-center gap-2">
                  <MdAirportShuttle  className="text-[#36394A] text-lg" />
                  Parking Space
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdLight  className="text-[#36394A] text-lg" />
                  Street Light
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdSecurity className="text-[#36394A] text-lg" />
                  Security
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdLocalConvenienceStore  className="text-[#36394A] text-lg" />
                  Supermarket
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdFitnessCenter  className="text-[#36394A] text-lg" />
                  Gym
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdNaturePeople  className="text-[#36394A] text-lg" />
                  Children Playground
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdChurch  className="text-[#36394A] text-lg" />
                  Church
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdMosque  className="text-[#36394A] text-lg" />
                  Mosque
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-2 px-5 py-2 ">
                <MdError className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Key Property Details</div>
              </div>
              <div className="flex flex-row flex-wrap gap-10 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                <span className="inline-flex items-center gap-2">
                  <GiPowerGenerator className="text-[#36394A] text-lg" />
                  No Generators allowed
                </span>
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
                    <tbody className="">
                      <tr className="">
                        <td className="py-2.5 font-medium">Rent</td>
                        <td className="text-center">₦250,000 x 2 Years</td>
                        <td className="text-right">₦50,000,000</td>
                      </tr>
                      <tr className="">
                        <td className="py-2.5 font-medium">Legal Fee</td>
                        <td className="text-center">10% Of Rent</td>
                        <td className="text-right">₦5,000,000</td>
                      </tr>
                      <tr className="">
                        <td className="py-2.5 font-medium">Agency Fee</td>
                        <td className="text-center">10% Of Rent</td>
                        <td className="text-right">₦5,000,000</td>
                      </tr>
                      <tr className="">
                        <td className="py-2.5 font-medium">Caution Fee</td>
                        <td className="text-center">10% Of Rent</td>
                        <td className="text-right">₦5,000,000</td>
                      </tr>
                      <tr className="">
                        <td className="py-2.5 font-medium">Service Charge</td>
                        <td className="text-center">-</td>
                        <td className="text-right">₦0</td>
                      </tr>
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
                <img src="/assets/images/caller.png" alt="Wazz Realty Logo" className="" />
                <div className="text-white">
                  <p className="text-base">Dami</p>
                  <p className="text-sm">Agent in charge</p>
                </div>
              </div>
              <div>
                <div className="text-sm text-white text-justify leading-5">
                  As your dedicated Waaz Realty advisor for this property, I am here to provide detailed information and guide you through every step of the process. My goal is to ensure your experience is seamless and informed.
                </div>
              </div>

              <div className="gap-2 flex flex-col">
                <div className="flex items-center gap-[.2rem]">
                  <div className="flex items-center gap-[.2rem] font-medium capitalize p-3 bg-white">
                    <MdOutlineCall size={22} className="mb-[-0.1rem]"/>
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    +234 807 909 7547
                    <VscChevronRight size={14} className=""/>
                  </div>
                </div>
                <div className="flex items-center gap-[.2rem]">
                  <div className="flex items-center gap-1 font-medium capitalize p-3 bg-white">
                    <IoLogoWhatsapp  size={22} className="mb-[-0.1rem] text-[#58B04E]"/>
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    Send Dami a Message
                    <VscChevronRight size={14} className=""/>
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
