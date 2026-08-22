import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import MoreStories from '@/components/MoreStories'
import Carousel from '@/components/Carousel'
import PrimaryButton from '@/components/PrimaryButton'
import { sanityClient } from '@/lib/sanity'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

type PortfolioFeedback = {
  name: string
  type: string
  quote: string
}

type PortfolioListing = {
  _id: string
  title: string
  slug: string
  category: string
  price: number
  city: string
  state: string
  bedrooms: string
  baths: string
  gallery: Array<{ asset?: { url?: string } }>
  description?: any[]
}

type Portfolio = {
  _id: string
  daysInMarket: number
  openPrice: number
  closePrice: number
  feedbacks: PortfolioFeedback[]
  listing: PortfolioListing
  _createdAt: string
  _updatedAt: string
}

export default function PortfolioDetails({portfolio, portfolios}: {portfolio:Portfolio, portfolios:any[]}) {
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

  if (!portfolio) {
    return (
      <BasicLayout title="Post not found | Waaz Realty" description="The post could not be found.">
        <div className="flex items-center justify-center px-6 py-12 mt-20">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Portfolio not found</h1>
            <p className="mt-4 text-slate-600">Please check the portfolio link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/portfolio/${portfolio.listing.slug}`
  const location = [portfolio.listing.city, portfolio.listing.state].filter(Boolean).join(' • ')
  const summary = portfolio.listing.description?.find((block: any) => block._type === 'block')?.children?.map((child: any) => child.text).join(' ') || ''
  const imageUrl = portfolio.listing?.gallery[0].asset?.url

  return (
    <BasicLayout
      title={portfolio.listing.title}
      description={summary}
      canonical={canonical}
      image={`${imageUrl}`}
      url={canonical}
      keywords={['blog', 'real estate', 'property', 'Waaz Realty']}
    >
      <section className="flex flex-col lg:mt-15 mt-25 md:w-10/12 w-11/12 md:mb-20">
        <Link href="/portfolio" className="md:text-[2rem] text-[1.5rem] md:leading-12 leading-7 font-medium font-serif italic"><span className="px-1 text-[#666D80]">Portfolio</span>/ {portfolio.listing.title}</Link>
        <div className="md:text-[3.5rem] text-4xl md:leading-14 leading-10 font-serif italic md:mt-10 md:mb-5 my-5">
          {portfolio.listing.title}
        </div>
        <div className="text-sm text-[#666D80] font-medium">{location}</div>
      </section>
      <Carousel images={portfolio.listing.gallery?.map((item) => item.asset?.url).filter(Boolean) as string[] | undefined}/>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:gap-5 gap-3 lg:w-3/4 w-11/12 text-white">
        <div className="bg-[#363C2B] justify-center w-full flex md:flex-row flex-col md:py-20 py-14 md:col-span-2 md:space-x-40 md:space-y-0 space-y-20 items-center ">
          <img src="/assets/images/sold-badge.png" alt="Waaz Realty Logo" className="md:h-auto h-40" />
          <div className="flex flex-col space-y-10 lg:w-1/3 md:w-1/2">
            <div className="">
              <div className="text-[1rem] text-[#D2D8BE]">List Price</div>
              <div className="md:text-6xl text-4xl text-white">{portfolio.openPrice.toLocaleString('en-US')}</div>
            </div>
            <div className="">
              <div className="text-[1rem] text-[#D2D8BE]">Sold Price</div>
              <div className="md:text-6xl text-4xl text-white">{portfolio.closePrice.toLocaleString('en-US')}</div>
            </div>
          </div>
        </div>
        <div className="bg-[#363C2B] justify-center md:items-start items-center w-full flex flex-col md:p-20 py-10 space-y-4 relative">
          <div className="absolute md:top-2 opacity-10 text-9xl leading-none text-[#A6FF16] select-none flex items-center justify-center">
            {portfolio.daysInMarket-1}
          </div>
          <div className="relative z-10 text-[1rem] font-medium text-white/70 md:mt-0 mt-25">Days On The Market</div>
          <div className="relative z-10 text-[#A6FF16] text-9xl leading-12 tracking-[-0.8rem]">{portfolio.daysInMarket}</div>
          <div className="md:mt-25 mt-10">
            <img src="/assets/images/days.png" alt="Waaz Realty Logo" className="w-full" />
          </div>
        </div>
        <div className="bg-[#363C2B] justify-center w-full flex flex-col lg:p-20 p-10 lg:space-y-20 space-y-10 items-center">
          {portfolio.feedbacks.map((feedback)=> (
            <div className="space-y-2">
              <div className="text-[1rem]">{feedback.quote}</div>
              <div className="text-[1rem] italic text-[#D2D8BE] capitalize"><span className="font-medium not-italic text-white pr-3">{feedback.name}</span> {feedback.type}</div>
            </div>
          ))}
        </div>
      </section>
      <MoreStories portfolios={portfolios}/>
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex lg:flex-row flex-col lg:items-center lg:justify-center w-11/12 lg:mb-35 mb-18 lg:space-x-15 lg:space-y-0 space-y-8">
        <div className="md:max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Your Journey Starts with a Conversation.</div>
        <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={() => router.push('/contact')}>
          Contact Us
        </PrimaryButton>
      </section>
    </BasicLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const portfolios = await sanityClient.fetch(`*[_type == "portfolio"]{ "slug": listing->slug.current }`)

  return {
    paths: portfolios.map((portfolio: { slug: string }) => ({ params: { slug: portfolio.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params)
  const slug = params?.slug
  const portfolio = await sanityClient.fetch(
    `*[_type == "portfolio" && listing->slug.current == $slug][0]{
      _id,
      daysInMarket,
      openPrice,
      closePrice,
      feedbacks,
      "listing": listing->{
        _id,
        title,
        "slug": slug.current,
        status,
        category,
        price,
        city,
        state,
        bedrooms,
        baths,
        gallery[]{asset->{url}}
      },
      _updatedAt
    }`,
    { slug }
  )

  if (!portfolio) {
    return { notFound: true }
  }

  const morePortfolios = await sanityClient.fetch(
    `*[_type == "portfolio" && listing->slug.current != $slug]{
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
      },
      _updatedAt
    } | order(_updatedAt desc)[0...4]`,
    { slug }
  )

  return {
    props: {
      portfolio,
      portfolios: morePortfolios,
    },
    revalidate: 60,
  }
}