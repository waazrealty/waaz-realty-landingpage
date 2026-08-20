import { GetStaticPaths, GetStaticProps } from 'next'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import { getFormattedDate } from '@/lib/common'
import Link from 'next/dist/client/link'
import { FiChevronRight } from 'react-icons/fi'

type BlogPost = {
  title: string
  tag: string
  slug: { current: string }
  body: any[]
  image?: { asset?: { url?: string } }
  _createdAt: string
  _updatedAt: string
}

export default function BlogDetails({ post }: { post: BlogPost }) {
  if (!post) {
    return (
      <BasicLayout title="Post not found | Wazz Realty" description="The post could not be found.">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Post not found</h1>
            <p className="mt-4 text-slate-600">Please check the blog post link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/blog/${post.slug.current}`
  const summary = post.body?.[0]?.children?.map((child: any) => child.text).join(' ') || ''

  return (
    <BasicLayout
      title={post.title}
      description={summary.slice(0, 140)}
      canonical={canonical}
      image={post.image?.asset?.url || '/assets/blog/preview.png'}
      url={canonical}
      keywords={['blog', 'real estate', 'property', 'Wazz Realty']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12">
        <Link href="/blog" className="md:text-[2rem] text-[1.5rem] leading-12 font-medium font-serif italic"><span className="px-1 text-[#666D80]">Blog</span>/ {post.tag}</Link>
        <div className="md:text-[3rem] text-[2rem] md:leading-14 leading-10 font-serif italic md:my-10 my-5 md:w-2/3">
          {post.title}
        </div>
        <div className="text-sm text-[#666D80] -mb-6">{post._createdAt && getFormattedDate(post._createdAt)} {post._createdAt !== post._updatedAt && <span><span className="px-1">•</span> <span className="">Updated {getFormattedDate(post._updatedAt)}</span></span>}</div>
      </section>
      <section className="relative md:aspect-video aspect-2/3 md:w-10/12 w-11/12 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${post.image?.asset?.url}')` }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex flex-col md:w-10/12 w-11/12">
        <div className="prose prose-slate">
          <PortableText value={post.body || []} />
        </div>
        <div className="flex items-center justify-center gap-2 my-10">
          <img src="/assets/images/x.svg" alt="social media icon" className="h-10 w-10" />
          <img src="/assets/images/instagram.svg" alt="social media icon" className="h-10 w-10" />
          <img src="/assets/images/facebook.svg" alt="social media icon" className="h-10 w-10" />
        </div>
      </section>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch(`*[_type == "blog" && status == "active"]{ "slug": slug.current }`)

  return {
    paths: posts.map((post: { slug: string }) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const post = await sanityClient.fetch(
    `*[_type == "blog" && status == "active" &&  slug.current == $slug][0]{title, tag, slug, body, image{asset->{url}}, _createdAt, _updatedAt}`,
    { slug }
  )

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
