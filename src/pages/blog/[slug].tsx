import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'

const posts = [
  {
    slug: 'how-to-invest-in-lagos-property',
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

export default function BlogDetails() {
  const router = useRouter()
  const { slug } = router.query
  const post = posts.find((item) => item.slug === slug)

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
      <div className="bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-md">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="mt-6 text-slate-700 leading-8">{post.content}</p>
        </div>
      </div>
    </BasicLayout>
  )
}
