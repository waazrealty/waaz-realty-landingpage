import Link from 'next/link'
import { GetStaticProps } from 'next'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { FiChevronRight } from 'react-icons/fi'
import { sanityClient } from '@/lib/sanity'
import { getFormattedDate } from '@/lib/common'
import { useState } from 'react'

type BlogPost = {
  title: string
  slug: { current: string }
  image?: { asset?: { url?: string } }
  _updatedAt?: string
}

export default function Blog({ posts, totalCount }: { posts: BlogPost[], totalCount: number }) {
  const PAGE_SIZE = 12
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/blog`
  const [page, setPage] = useState(0)
  const [loadedblogs, setLoadedblogs] = useState<BlogPost[]>(posts)
  const [loadingMore, setLoadingMore] = useState(false)

  const handleLoadMore = async () => {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const start = (page + 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      const more: BlogPost[] = await sanityClient.fetch(`*[_type == "blog"] | order(_updatedAt desc)[${start}...${end}]{
        title,
        slug,
        image,
        _updatedAt
      }`)

      if (more && more.length > 0) {
        setLoadedblogs((s) => [...s, ...more])
        setPage((p) => p + 1)
      }
    } catch (err) {
      // ignore
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <BasicLayout
      title="Blog | Waaz Realty"
      description="Read the latest insights on real estate investment, design, and property trends."
      canonical={canonical}
      url={canonical}
      image="/assets/blog/preview.png"
      keywords={['blog', 'real estate', 'property trends', 'investment', 'design']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-15 mt-25 space-y-5 items-center">
        <div className="md:text-[4.5rem] text-[3rem] md:w-xl font-serif text-center italic md:leading-18 leading-13">
          Waaz Realty Blog
        </div>
        <div className="text-[#666D80] lg:w-[45%] text-center text-base leading-7">
          Here’s what you’ll find here — thoughts and opinions about financial services, updates from the team, and tips and tricks of the trade (business).
        </div>
      </section>

      <section className="md:w-10/12 w-11/12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {loadedblogs.map((post) => {
            const slug = post.slug?.current
            if (!slug) return null
            const imageUrl = post.image?.asset?.url || '/assets/images/card-image3.png'
            const date = post._updatedAt ? new Date(post._updatedAt).toLocaleDateString('en-US') : 'Coming soon'
            return (
              <Link href={`/blog/${slug}`} key={slug} className="block group space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-[.88rem]">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2 rounded-[.88rem] bg-[#F5F6EF]/50 p-4 transition-colors duration-300 group-hover:bg-[#F5F6EF]">
                  <div className="font-medium text-[#666D80] text-sm">{getFormattedDate(date)}</div>
                  <h3 className="text-sm text-[#0D0D12] font-medium">{post.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Show "See More" only if there are more posts to load */}
        {loadedblogs.length < totalCount && (
          <div className="w-full my-10 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="rounded-full bg-[#616D43] px-5 py-2 text-base font-medium text-white transition hover:bg-[#2e3223] disabled:opacity-60 cursor-pointer"
            >
              {loadingMore ? 'Loading…' : 'See More'}
            </button>
          </div>
        )}
      </section>

      <section className="md:h-20 h-0"></section>

      <section className="relative md:aspect-video aspect-2/3 lg:w-10/12 w-full overflow-hidden md:mb-20 mb-5">
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/banner.svg')" }} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
          <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] lg:w-[30%] italic font-serif text-[#131313] text-center">Ready to find a property of choice</div>
          <div className="text-[#666D80] lg:w-[28%] text-center text-[1rem] leading-7">
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
  const PAGE_SIZE = 12

  const totalCount = await sanityClient.fetch(`count(*[_type == "blog"])`)

  const posts = await sanityClient.fetch(`*[_type == "blog"] | order(_updatedAt desc)[0...${PAGE_SIZE}]{
    title,
    slug,
    image{asset->{url}},
    _updatedAt
  }`)

  return {
    props: {
      posts,
      totalCount,
    },
    revalidate: 60,
  }
}