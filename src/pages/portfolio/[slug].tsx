import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { FiChevronRight } from 'react-icons/fi'
import MoreStories from '@/components/MoreStories'
import Carousel from '@/components/Carousel'

const posts = [
  {
    slug: 'palm-beach',
    title: 'How to Invest in Lagos Property',
    content:
      'Investing in Lagos property starts with location, budget, and long-term value. Work with a trusted developer and inspect the site carefully before purchase.',
  },
  {
    slug: 'designing-modern-family-homes',
    title: 'Designing Modern Family Homes',
    content:
      'Modern family homes emphasize flexible living spaces, natural light, and sustainable finishes. Balance style with user-friendly layouts for everyday comfort.',
  },
]

export default function PortfolioDetails() {
  const router = useRouter()
  const { slug } = router.query
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <BasicLayout title="Post not found | Wazz Realty" description="The post could not be found.">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Portfolio not found</h1>
            <p className="mt-4 text-slate-600">Please check the portfolio link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/blog/${post.slug}`

  return (
    <BasicLayout
      title={post.title}
      description={post.content.slice(0, 120)}
      canonical={canonical}
      image={`/assets/blog/${post.slug}-preview.png`}
      url={canonical}
      keywords={['blog', 'real estate', 'property', 'Wazz Realty']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12">
        <div className="md:text-4xl text-xl font-medium font-serif italic"><span className="px-1 text-[#666D80]">Portfolio</span>/ Modern 3-Bedroom Apartment</div>
        <div className="md:text-[5rem] text-[3.5rem] font-serif italic md:mt-10 md:mb-5 my-10 md:leading-24 leading-14">
          Modern 3-Bedroom Apartment
        </div>
        <div className="text-sm text-[#666D80] font-medium">Ajao Estate <span className="px-1">•</span> Lagos</div>
      </section>
      <Carousel />
      <section className="grid grid-cols-1 lg:grid-cols-2 md:gap-5 gap-3 md:-mt-15 md:w-3/4 w-full text-white">
        <div className="bg-[#363C2B] justify-center w-full flex md:flex-row flex-col md:py-20 py-14 md:col-span-2 md:space-x-40 md:space-y-0 space-y-20 items-center ">
          <img src="/assets/images/sold-badge.png" alt="Wazz Realty Logo" className="md:h-auto h-40" />
          
          <div className="flex flex-col space-y-10 md:w-1/3">
            <div className="">
              <div className="text-[1rem] text-[#D2D8BE]">List Price</div>
              <div className="text-6xl text-white">29,000,000</div>
            </div>
            <div className="">
              <div className="text-[1rem] text-[#D2D8BE]">Sold Price</div>
              <div className="text-6xl text-white">30,500,000</div>
            </div>
          </div>
        </div>
        <div className="bg-[#363C2B] justify-center md:items-start items-center w-full flex flex-col md:p-20 py-10 space-y-4 relative">
          <div className="absolute -top-5 opacity-10 text-9xl leading-none text-[#A6FF16] select-none flex items-center justify-center">
            15
          </div>
          <div className="relative z-10 text-[1rem] font-medium text-white/70 md:mt-0 mt-25">Days On The Market</div>
          <div className="relative z-10 text-[#A6FF16] text-9xl leading-12 -tracking-[.8rem]">16</div>
          <div className="md:mt-25 mt-10">
            <img src="/assets/images/days.png" alt="Wazz Realty Logo" className="w-full" />
          </div>
        </div>
        <div className="bg-[#363C2B] justify-center w-full flex flex-col md:p-20 p-10 md:space-y-20 space-y-10 items-center">
          <div className="space-y-2">
            <div className="text-[1rem]">The team staged and marketed our property so well it sold in less than two weeks! Professional, responsive, and results-driven </div>
            <div className="text-[1rem] italic text-[#D2D8BE]"><span className="font-medium not-italic text-white pr-3">Tony</span> Seller</div>
          </div>
          <div className="space-y-2">
            <div className="text-[1rem]">The team staged and marketed our property so well it sold in less than two weeks! Professional, responsive, and results-driven </div>
            <div className="text-[1rem] italic text-[#D2D8BE]"><span className="font-medium not-italic text-white pr-3">Tony</span> Buyer</div>
          </div>
        </div>
      </section>
      <MoreStories />
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
