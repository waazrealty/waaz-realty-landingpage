import Link from 'next/link'
import { GetStaticProps } from 'next'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { FiChevronRight } from 'react-icons/fi'
import { sanityClient } from '@/lib/sanity'
import { getFormattedDate } from '@/lib/common'

type BlogPost = {
  title: string
  slug: { current: string }
  image?: { asset?: { url?: string } }
  _updatedAt?: string
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
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
          {posts.map((post, index) => {
            const slug = post.slug?.current
            if (!slug) return null
            const imageUrl = post.image?.asset?.url || '/assets/images/card-image3.png'
            const date = post._updatedAt ? new Date(post._updatedAt).toLocaleDateString('en-US') : 'Coming soon'
            return (
              <Link href={`/blog/${slug}`} key={slug} className="block space-y-2">
                <img src={imageUrl} alt={post.title} className="h-70 w-full object-cover" />
                <div className="font-medium text-[#666D80] text-sm">{getFormattedDate(date)}</div>
                <h3 className="text-sm text-[#0D0D12] font-medium">{post.title}</h3>
              </Link>
            )
          })}
        </div>
        <div className="w-full my-10 flex justify-center">
          <button
            type="submit"
            className="rounded-full bg-[#616D43] px-8 py-4 text-base font-medium text-white transition hover:bg-[#2e3223]"
          >
            See More
          </button>
        </div>
      </section>
      <section className="md:h-20 h-0"></section>
      <section className="relative md:aspect-video aspect-2/3 md:w-10/12 w-full overflow-hidden md:mb-20 mb-5">
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/banner.svg')" }} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
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
        </div>
      </section>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanityClient.fetch(`*[_type == "blog" && status == "active"] | order(_updatedAt desc){title, slug, image{asset->{url}}, _updatedAt}`)

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}
