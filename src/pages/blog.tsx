import Link from 'next/link'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { FiChevronRight } from 'react-icons/fi'

const posts = [
  {
    slug: 'how-to-invest-in-lagos-property',
    title: 'Unlocking Financial Insights with Finch: Uber’s Conversational AI Data Agent',
    image: '/assets/images/card-image3.png',
    excerpt: 'A quick guide to finding the right property investment in Lagos with strong resale potential.',
  },
  {
    slug: 'designing-modern-family-homes',
    title: 'Unlocking Financial Insights with Finch: Uber’s Conversational AI Data Agent',
    image: '/assets/images/card-image3.png',
    excerpt: 'Explore trending design principles for contemporary family homes in Nigeria.',
  },
]

export default function Blog() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/blog`

  return (
    <BasicLayout title="Blog | Wazz Realty" description="Read the latest insights on real estate investment, design, and property trends." canonical={canonical} url={canonical} image="/assets/blog/preview.png" keywords={['blog', 'real estate', 'property trends', 'investment', 'design']}>
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-10 space-y-5 items-center">
        <div className="md:text-[4.5rem] text-[3rem] md:w-xl font-serif text-center italic md:leading-18 leading-13">
          Waaz Realty Blog
        </div>
        <div className="text-[#666D80] md:w-[45%] text-center text-base leading-7">
          Here’s what you’ll find here — thoughts and opinions about financial services, updates from the team, and tips and tricks of the trade (business).
        </div>
      </section>
      <section className="md:w-10/12 w-11/12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index} className="space-y-2">
              <img src={post.image} alt={post.title} className="h-70 w-full object-cover" />
              <div className="font-medium text-[#666D80] text-sm">July 18, 2025</div>
              <h3 className="text-sm text-[#0D0D12] font-medium">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center w-11/12 md:my-38 mb-20 md:space-y-10 space-y-8">
        <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] md:w-[30%] italic font-serif text-[#131313] text-center">Ready to find a property of choice</div>
        <div className="text-[#666D80] md:w-[28%] text-center text-[1rem] leading-7">
          Having trouble finding a property? We’ve got you covered. Reach out to our team to get it all sorted.
        </div>
        <div>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
            View Listings
            <FiChevronRight size={18} />
          </Link>
        </div>
      </section>
    </BasicLayout>
  )
}
