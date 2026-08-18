import { useEffect, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import PropertyShowcaseSection from '@/components/PropertyShowcaseSection'
import { FaWhatsapp } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { sanityClient } from '@/lib/sanity'
import { GetStaticProps } from 'next'

type Listing = {
  title: string
  slug: { current: string }
  price: number
  city?: string
  state?: string
  bedrooms?: string
  baths?: string
  propertyType?: string
  category?: string
  _updatedAt?: string
  gallery?: { asset?: { url?: string } }
}

type Testimonals = {
  author: string
  quote: string
  location: string
}

export default function Home({ listings, rentalListings, testimonals }: { listings: Listing[]; rentalListings: Listing[]; testimonals: Testimonals[] }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    if (!testimonals || testimonals.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonals.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [testimonals])

  const activeTestimonialData = testimonals?.[activeTestimonial]

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmail('')
  }
  const handleExploreProperties = () => {
    router.push('/listings')
  }

  return (
    <BasicLayout
      title="Wazz Realty"
      description="A starter Next.js site with TypeScript, Tailwind CSS, reusable components, fonts, and SEO."
    >
      <section className="flex flex-col w-10/12 md:mt-10 md:mb-40 md:space-y-10 space-y-12">
        <div className="md:text-[5rem] text-[4rem] font-serif italic md:leading-24 leading-18 md:w-[70%]">
          Your <span className="text-[#3E452F]">Foundation </span> for Elevated Living in Lagos.
        </div>
        <div className="">
          <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={handleExploreProperties}>
            Explore Properties
          </PrimaryButton>
        </div>
      </section>

      <section className="relative md:aspect-video aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-home.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-home.png')" }} aria-hidden="true" />
          <div className="relative z-10">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex absolute top-40 right-8 h-10 w-10 items-center justify-center rounded-full border border-white bg-[#74C56B] text-white transition hover:bg-white hover:text-[#3E452F] focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Scroll to top"
            >
              <FaWhatsapp size={18} />
            </button>
          </div>
        </div>
      </section>

      <PropertyShowcaseSection listings={listings} rentalListings={rentalListings} />

      <section
        className="lg:w-10/12 w-full lg:flex hidden items-center justify-between gap-20 lg:bg-cover px-25 py-30"
        style={{ backgroundImage: "url('/assets/images/bg-gradient.png')" }}
        aria-label="Wazz Realty banner"
      >
        <img src="/assets/images/badge.png" alt="Wazz Realty Logo" className="relative z-10 h-120 w-120" />

        <div className="relative z-10 flex-1 max-w-xl">
          <div className="relative">
            <div
              className="absolute -top-15 -left-25 w-max bg-cover bg-center px-6 py-4 text-sm"
              style={{ backgroundImage: "url('/assets/images/frame.png')" }}
              aria-label="Wazz Realty frame"
            >
              We Offer
            </div>
            <div className="absolute -left-12">
              <img src="/assets/images/left.png" alt="Wazz Realty icon" className="" />
            </div>
            <div className="text-[3.5rem] italic font-serif text-white">Premium Value</div>
          </div>

          <div className="relative">
            <div className="text-[3.5rem] italic font-serif text-white">Excellent Reward</div>
            <div
              className="absolute -top-10 right-0 w-max bg-cover bg-center px-6 py-4 text-sm"
              style={{ backgroundImage: "url('/assets/images/frame.png')" }}
              aria-label="Wazz Realty frame"
            >
              You Get
            </div>
            <div className="absolute top-5 right-10">
              <img src="/assets/images/right.png" alt="Wazz Realty icon" className="" />
            </div>
          </div>

          <div className="text-white max-w-110 text-[1rem] text-justify leading-6 tracking-wider mt-10">
            At Wazz Realty, we believe your property journey should be seamless and rewarding. We combine trust with a diverse portfolio, offering everything from luxurious estates to truly affordable homes. Our commitment is to exceptional service, ensuring you find the perfect property that meets your dreams and budget.
          </div>
        </div>
      </section>
      
      <section
        className="w-full lg:hidden flex flex-col items-center justify-between bg-cover md:px-20 px-6 py-20 space-y-10"
        style={{ backgroundImage: "url('/assets/images/bg-mobile-gradient.png')" }}
        aria-label="Wazz Realty banner"
      >
        <img src="/assets/images/badge.png" alt="Wazz Realty Logo" className="h-70" />

        <div className="text-5xl italic font-serif text-white">Premium Value Excellent Reward</div>

        <div className="text-white text-[1rem] text-justify leading-6 -mt-5">
          At Wazz Realty, we believe your property journey should be seamless and rewarding. We combine trust with a diverse portfolio, offering everything from luxurious estates to truly affordable homes. Our commitment is to exceptional service, ensuring you find the perfect property that meets your dreams and budget.
        </div>
      </section>

      <section
        className="w-full flex flex-col items-center justify-between md:px-20 px-5 space-y-8"
      >
        <div className="lg:w-lg w-full">
          <div className="lg:text-[3.35rem] text-5xl text-center leading-16 italic font-serif text-black">The Standard for Premium Rentals</div>
        </div>

        <div className="text-[#666D80] text-center max-w-120 text-[1rem] leading-6">
          Experience a simplified and secure rental process. We connect discerning tenants with high-quality homes in Lagos's most sought-after communities.
        </div>

        <div className="md:max:w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-3 mt-10">
          <div className="flex lg:w-100 w-full flex-col gap-5 bg-[#515B3A]">
            <img src="/assets/images/card-image1.png" alt="Wazz Realty house" className="h-auto" />
            <div className="space-y-6 px-8 pb-10 md:w-full w-11/12">
              <div className="text-5xl italic font-serif text-white leading-13">Exceptional Properties for Rent</div>
              <PrimaryButton textColor="[#36394A]" bgColor="white" iconColor="[#36394A]" onChangeClick={() => router.push('/rent')}>
                Discover Rentals
              </PrimaryButton>
            </div> 
          </div>
          <div className="flex lg:w-100 w-full flex-col gap-5 bg-[#7D8B57]">
            <div className="space-y-6 px-8 pt-10 md:w-full w-11/12">
              <div className="text-5xl italic font-serif text-white leading-13">From Vision to Keys in Hand</div>
              <PrimaryButton textColor="[#36394A]" bgColor="white" iconColor="[#36394A]" onChangeClick={() => router.push('/contact')}>
                Schedule a Consultation
              </PrimaryButton>
            </div> 
            <img src="/assets/images/card-image2.png" alt="Wazz Realty house" className="h-auto" />
          </div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-home2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-home2.png')" }} aria-hidden="true" />
        </div>

        <div className="relative mx-auto flex md:w-2/5 w-10/12 pt-50">
          <div className="mx-auto flex w-full flex-col gap-10 px-6 py-12 md:px-12 md:py-20 lg:px-15 bg-[#363C2B] -mb-50 ">
            <div className="grid md:space-y-40 space-y-20">
              <div className="max-w-3xl text-white">
                <h2 className="mt-6 md:text-[3.5rem] text-[2.8rem] font-serif italic leading-14 text-white md:leading-18">
                  Your <span className="text-[#F7F6EF]">Cornerstone</span> For Exceptional Property Journeys.
                </h2>
              </div>

              <div className="backdrop-blur-xl">
                {activeTestimonialData ? (
                  <div className="space-y-8">
                    <div className="text-sm leading-8 text-white md:text-lg">
                      "{activeTestimonialData.quote}"
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-white">{activeTestimonialData.author}</div>
                      <div className="text-sm text-[#D9D9CC]">{activeTestimonialData.location}</div>
                    </div>
                  </div>
                ) : null}

                <div className="md:mt-20 mt-10 flex w-full items-center gap-3">
                  {(testimonals || []).map((item, index) => (
                    <button
                      key={`${item.author}-${index}`}
                      type="button"
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-1.5 flex-1 rounded-full transition ${index === activeTestimonial ? 'bg-[#9AA675]' : 'bg-white'}`}
                      aria-label={`Show testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-14 mt-28">
        <div className="mx-auto flex flex-col items-center w-10/12">
          <div className="grid gap-5 bg-white items-center md:justify-between md:p-10">
            <h2 className="text-[2.5rem] md:w-100 font-serif italic text-center text-[#1F1F1A] md:text-[3rem]">Receive Curated Market Insights</h2>

            <form onSubmit={handleSubscribe} className="grid gap-2">
              <label htmlFor="newsletter-email" className="">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Email Address"
                className="min-w-0 rounded-xl border border-[#D6D8D0] bg-[#ECEFF3] px-6 py-4 text-base text-[#1F1F1A] outline-none transition focus:border-[#616D43] focus:ring-2 focus:ring-[#616D43]/20"
              />
              <button
                type="submit"
                className="rounded-full bg-[#616D43] px-8 py-4 text-base font-medium text-white transition hover:bg-[#2e3223] mt-5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const listings = await sanityClient.fetch(
    `*[_type == "listing" && status == "active"]{
      title,
      slug,
      price,
      city,
      state,
      bedrooms,
      baths,
      gallery[0]{asset->{url}},
      _updatedAt
    } | order(_updatedAt desc)[0...4]`,
  )

  const rentalListings = await sanityClient.fetch(
    `*[_type == "listing" && status == "active"  && category == "for-rent"]{
      title,
      slug,
      price,
      city,
      state,
      bedrooms,
      baths,
      gallery[0]{asset->{url}},
      _updatedAt
    } | order(_updatedAt desc)[0...10]`,
  )
  
  const testimonals = await sanityClient.fetch(
    `*[_type == "testimonal"]{
      author,
      quote,
      location,
      _updatedAt
    } | order(_updatedAt desc)[0...10]`,
  )

  return {
    props: {
      listings,
      rentalListings,
      testimonals,
    },
    revalidate: 60,
  }
}