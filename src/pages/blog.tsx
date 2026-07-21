import Link from 'next/link'
import { BasicLayout } from '@/components/Layout/BasicLayout'

const posts = [
  {
    slug: 'how-to-invest-in-lagos-property',
    title: 'How to Invest in Lagos Property',
    excerpt: 'A quick guide to finding the right property investment in Lagos with strong resale potential.',
  },
  {
    slug: 'designing-modern-family-homes',
    title: 'Designing Modern Family Homes',
    excerpt: 'Explore trending design principles for contemporary family homes in Nigeria.',
  },
]

export default function Blog() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/blog`

  return (
    <BasicLayout title="Blog | Wazz Realty" description="Read the latest insights on real estate investment, design, and property trends." canonical={canonical} url={canonical} image="/assets/blog/preview.png" keywords={['blog', 'real estate', 'property trends', 'investment', 'design']}>
      <section className="bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-4 text-slate-600">Stay informed with real estate news, property advice, and design tips.</p>

          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
                <p className="mt-3 text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-slate-900 underline">
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}
