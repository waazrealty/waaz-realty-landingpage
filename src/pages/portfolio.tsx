import ClientStatistics from '@/components/ClientStatistics'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import Stories from '@/components/Stories'
import { FiChevronRight } from 'react-icons/fi'

const teamListings = [
  {
    id: 1,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
  {
    id: 2,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
  {
    id: 3,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
  {
    id: 3,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
  {
    id: 3,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
  {
    id: 3,
    firstname: 'First Name',
    role: 'CEO & Founder',
    image: '/assets/images/gallery/image3.png',
  },
]

export default function portfolio() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/portfolio`

  return (
    <BasicLayout title="Our portfolio | Wazz Realty" description="Landmarks of Our Clients' Success." canonical={canonical} url={canonical} image="/assets/portfolio-preview.png">
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-10 space-y-5">
        <div className="md:text-[5rem] text-[4rem] font-serif italic md:leading-24 leading-18">
          Landmarks of <br/> <span className="text-[#7D8B57]">Our Clients' Success. </span>
        </div>
        <div className="text-[#666D80] md:w-5/12 md:text-justify text-left text-[1rem] leading-7">
          This portfolio is more than a collection of properties; it's a testament to our philosophy in action. Each sold and rented property represents a unique vision understood, a journey expertly guided, and a foundation successfully laid. Explore the results of our unwavering commitment to excellence.
        </div>
      </section>
      <section className="relative md:aspect-16/8 aspect-2/3 md:-mt-17 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-portfolio.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-portfolio.png')" }} aria-hidden="true" />
          
        </div>
      </section>
      <ClientStatistics />
      <Stories />
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-contain bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex md:flex-row flex-col md:items-center md:justify-center w-11/12 mb:mb-35 mb-18 md:space-x-15 md:space-y-0 space-y-8">
        <div className="max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Your Journey Starts with a Conversation.</div>
        <div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
            Schedule a Consultation
            <FiChevronRight size={18} />
          </button>
        </div>
      </section>
    </BasicLayout>
  )
}
``