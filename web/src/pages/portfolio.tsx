import ClientStatistics from '@/components/ClientStatistics'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import PrimaryButton from '@/components/PrimaryButton'
import Stories from '@/components/Stories'
import { sanityClient } from '@/lib/sanity'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

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

export default function portfolio({portfolios}: {portfolios : Portfolio[]}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/portfolio`

  const router = useRouter()

  return (
    <BasicLayout title="Our portfolio | Waaz Realty" description="Landmarks of Our Clients' Success." canonical={canonical} url={canonical} image="/assets/portfolio-preview.png">
      <section className="flex flex-col lg:w-10/12 w-11/12 lg:mt-15 mt-25 space-y-5">
        <div className="md:text-[5rem] text-[4rem] font-serif italic md:leading-24 leading-18">
          Landmarks of <br/> <span className="text-[#7D8B57]">Our Clients' Success. </span>
        </div>
        <div className="text-[#666D80] lg:w-[50%] md:text-justify text-left text-base leading-7">
          This portfolio is more than a collection of properties; it's a testament to our philosophy in action. Each sold and rented property represents a unique vision understood, a journey expertly guided, and a foundation successfully laid. Explore the results of our unwavering commitment to excellence.
        </div>
      </section>
      <section className="relative md:aspect-video aspect-2/3 lg:w-10/12 w-11/12 rounded-4xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-portfolio.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-portfolio.png')" }} aria-hidden="true" />
        </div>
      </section>
      <ClientStatistics />
      <Stories portfolios={portfolios}/>
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex lg:flex-row flex-col lg:items-center lg:justify-center w-11/12 lg:mb-35 mb-18 lg:space-x-15 lg:space-y-0 space-y-8">
        <div className="md:max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Your Journey Starts  with a Conversation.</div>
        <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={() => router.push('/contact')}>
          Schedule a Consultation
        </PrimaryButton>
      </section>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolios = await sanityClient.fetch(`*[_type == "portfolio"] | order(_createdAt desc) {
    _id,
    daysInMarket,
    openPrice,
    closePrice,
    feedbacks,
    "listing": listing->{
      _id,
      title,
      slug,
      status,
      category,
      price,
      city,
      state,
      bedrooms,
      baths,
      gallery[0]{asset->{url}}
    }
  }`)

  return {
    props: {
      portfolios,
    },
    revalidate: 60,
  }
}