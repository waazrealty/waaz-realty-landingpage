import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import {
  FiChevronDown,
  FiChevronRight,
  FiHelpCircle,
  FiMinus,
  FiPlus,
} from 'react-icons/fi'

import { BasicLayout } from '@/components/Layout/BasicLayout'
import { sanityClient } from '@/lib/sanity'

type Faq = {
  category: string
  question: string
  slug: {
    current: string
  }
  answer?: any[]
  _updatedAt?: string
}

type FaqProps = {
  faqs: Faq[]
  totalCount: number
}

export default function Faq({ faqs, totalCount }: FaqProps) {
  const PAGE_SIZE = 12

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const canonical = `${siteUrl}/faq`

  const [page, setPage] = useState(0)
  const [loadedFaqs, setLoadedFaqs] = useState<Faq[]>(faqs)
  const [loadingMore, setLoadingMore] = useState(false)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const handleToggleFaq = (slug: string) => {
    setOpenFaq((current) => (current === slug ? null : slug))
  }

  const handleLoadMore = async () => {
    if (loadingMore) return

    setLoadingMore(true)

    try {
      const start = (page + 1) * PAGE_SIZE
      const end = start + PAGE_SIZE

      const more: Faq[] = await sanityClient.fetch(
        `*[_type == "faq"] | order(_updatedAt desc)[${start}...${end}]{
          question,
          answer,
          category,
          slug,
          _updatedAt
        }`,
      )

      if (more?.length) {
        setLoadedFaqs((current) => [...current, ...more])
        setPage((current) => current + 1)
      }
    } catch (error) {
      console.error('Failed to load more FAQs:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <BasicLayout
      title="FAQs | Waaz Realty"
      description="Clear answers to your most common questions."
      canonical={canonical}
      url={canonical}
      image="/assets/blog/preview.png"
      keywords={[
        'faq',
        'blog',
        'real estate',
        'property trends',
        'investment',
        'design',
      ]}
    >
      <section className="w-11/12 md:w-10/12 lg:mt-15 mt-25">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="font-serif text-[3rem] italic leading-[1.08] text-[#131313] md:text-[4.5rem] md:leading-[1.1]">
            Frequently asked questions
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#666D80]">
            Clear answers to some of the most common questions about our
            properties and services.
          </p>
        </div>
      </section>
      <section className="mt-14 w-11/12 md:mt-20 md:w-10/12">
        {loadedFaqs.length > 0 ? (
          <div className="mx-auto max-w-4xl">
            <div className="divide-y divide-[#E6E8DE] overflow-hidden rounded-[1.25rem] border border-[#E6E8DE] bg-white">
              {loadedFaqs.map((faq, index) => {
                const slug = faq.slug?.current

                if (!slug) return null

                const isOpen = openFaq === slug

                return (
                  <div
                    key={slug}
                    className={`transition-colors duration-300 ${
                      isOpen ? 'bg-[#F5F6EF]/50' : 'bg-white'
                    }`}
                  >
                    <div>
                      {faq.category && (
                        <span className="inline-block bg-[#D2D8BE] px-3 py-1 text-xs font-medium">
                          {faq.category}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleFaq(slug)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${slug}`}
                        className="flex w-full cursor-pointer items-center gap-5 px-5 py-5 text-left transition hover:bg-[#F5F6EF]/50 md:px-7 md:py-6"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F6EF] text-sm font-medium text-[#616D43]">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="flex-1 text-sm font-medium leading-6 text-[#0D0D12] md:text-base">
                          {faq.question}
                        </span>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? 'rotate-180 bg-[#616D43] text-white'
                              : 'bg-[#F5F6EF] text-[#616D43]'
                          }`}
                        >
                          <FiChevronDown size={18} />
                        </span>
                      </button>
                    </div>

                    <div
                      id={`faq-answer-${slug}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-6 pl-[4.75rem] pr-5 md:px-7 md:pb-7 md:pl-[5.75rem]">
                          <div className="prose prose-slate max-w-none text-sm leading-7">
                            <PortableText value={faq.answer || []} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {loadedFaqs.length < totalCount && (
              <div className="mt-10 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2e3223] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Loading...
                    </>
                  ) : (
                    <>
                      See More
                      <FiPlus size={17} />
                    </>
                  )}
                </button>

                <span className="text-xs text-[#666D80]">
                  Showing {loadedFaqs.length} of {totalCount} questions
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-[1.25rem] border border-[#E6E8DE] bg-[#F5F6EF]/50 px-6 py-14 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#616D43]">
              <FiHelpCircle size={26} />
            </div>

            <h2 className="font-serif text-2xl italic text-[#131313]">
              No questions available
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#666D80]">
              We don't have any frequently asked questions available at the
              moment.
            </p>
          </div>
        )}
      </section>

      <section className="h-20 md:h-28" />

      <section className="relative mb-5 aspect-[2/3] w-full overflow-hidden md:mb-20 md:aspect-video lg:w-10/12">
        <div className="absolute inset-0 z-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/banner.svg')",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl italic leading-tight text-[#131313] md:text-[3.5rem] md:leading-[4.38rem]">
              Ready to find a property of choice?
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-[#666D80]">
            Having trouble finding a property? We’ve got you covered. Reach
            out to our team to get it all sorted.
          </p>

          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-sm font-medium capitalize text-white transition hover:bg-[#2e3223]"
          >
            View Listings
            <FiChevronRight size={18} />
          </Link>
        </div>
      </section>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const PAGE_SIZE = 12

  const totalCount = await sanityClient.fetch(
    `count(*[_type == "faq"])`,
  )

  const faqs = await sanityClient.fetch(
    `*[_type == "faq"] | order(_updatedAt desc)[0...${PAGE_SIZE}]{
      question,
      answer,
      category,
      slug,
      _updatedAt
    }`,
  )

  return {
    props: {
      faqs,
      totalCount,
    },
    revalidate: 60,
  }
}