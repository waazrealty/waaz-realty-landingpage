import { BasicLayout } from '@/components/Layout/BasicLayout'
import MasonryGallery from '@/components/MasonryGallery'
import PrimaryButton from '@/components/PrimaryButton'
import { sanityClient } from '@/lib/sanity'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

type Team = {
  _id: string
  name: string
  role: string
  photo: { asset?: { url?: string } }
}

export default function About({teams}: {teams : Team[]}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/about`

  const router = useRouter()

  return (
    <BasicLayout title="About Us | Wazz Realty" description="Learn about Wazz Realty and our commitment to premium real estate in Lagos." canonical={canonical} url={canonical} image="/assets/about-preview.png">
      <section className="flex flex-col w-10/12 lg:mt-10 mb:mb-35 space-y-12">
        <div className="md:text-[5rem] text-[4rem] font-serif italic md:leading-24 leading-18 md:w-[70%]">
          Guiding Your Vision to its <span className="text-[#7D8B57]">Ultimate Address... </span>
        </div>
      </section>
      <section className="relative md:aspect-10/5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about.png')" }} aria-hidden="true" />
          
        </div>
      </section>
      <section
        className="w-full flex flex-col items-center justify-between px-0 md:space-y-6"
      >
        <div className="flex items-center md:gap-5 gap-3 md:text-[3.35rem] text-4xl text-center leading-16 italic font-serif">
          <span className="text-[#9AA675]">Trust</span> <div className="h-2 w-2 rounded-full bg-[#9AA675] inline-flex">&nbsp;</div> <span className="text-[#7D8B57]">Value</span> <div className="h-2 w-2 rounded-full bg-[#9AA675] inline-flex">&nbsp;</div> <span className="text-[#616D43]">Excellence</span>
        </div>

        <div className="md:mb-5 mb-10 md:px-0 px-5">
          <div className="text-[#666D80] max-w-135 md:text-justify text-center text-[1rem] leading-7">
            At Waaz Realty, our work is defined by three unwavering principles. Trust is our foundation, built through absolute transparency and integrity in every interaction. We deliver enduring Value, not just in transactions, but in the quality of life and long-term growth our properties represent. And we pursue Excellence relentlessly, offering a curated, seamless service that transforms the property journey into a landmark experience.
          </div>
        </div>

        <MasonryGallery />
      </section>
      <section
        className="w-full flex flex-col items-center justify-between space-y-15"
      >
        <div className="flex md:flex-row flex-col md:items-center md:justify-end justify-center md:space-x-50 md:space-y-0 space-y-5 md:w-10/12 w-11/12">
          <div className="md:text-[3.5rem] md:w-100 md:px-0 px-5 text-5xl md:text-left text-center md:leading-16 leading-14 italic font-serif text-black">Meet Your Trusted Real Estate Guides.</div>
          <div className="text-[#666D80] md:text-justify text-center md:w-1/2 text-base leading-6.5">
            Our strength isn't just in our portfolio; it's in our people. The Waaz Realty team is a collective of seasoned strategists and dedicated market experts with an intimate understanding of the Lagos property landscape. We are more than agents; we are advisors and advocates for our clients. We listen to your vision and provide the steady guidance needed to ensure your property journey is seamless, informed, and ultimately, successful.
          </div>
        </div>
        <div className="flex flex-col md:items-end md:justify-end space-x-25 md:space-y-0 space-y-5 md:w-10/12 w-11/12">
          <div className="md:w-2/3 w-full justify-around">
            <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 w-full">
              {teams.map((team) => {
                const imageUrl = team.photo?.asset?.url
                return (
                <div key={team._id} className="snap-center shrink-0 md:max-w-75 w-full overflow-hidden">
                  <img src={imageUrl} alt={team.name} className="md:h-72 w-full rounded-b-[2.5rem] rounded-tr-[2.5rem] object-cover" />
                  <div className="md:space-y-1 md:py-6 py-2">
                    <p className="md:text-[1rem] text-sm text-black font-medium">{team.name}</p>
                    <h3 className="md:text-sm text-xs text-[#666D80] font-medium">{team.role}</h3>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </section>
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex md:flex-row flex-col md:items-center md:justify-center w-11/12 mb:mb-35 mb-18 md:space-x-15 md:space-y-0 space-y-8">
        <div className="md:max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Your Journey Starts  with a Conversation.</div>
        <PrimaryButton textColor="white" bgColor="[#616D43]" iconColor="white" onChangeClick={() => router.push('/contact')}>
          Schedule a Consultation
        </PrimaryButton>
      </section>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams = await sanityClient.fetch(
    `*[_type == "team"]{
      _id,
      name,
      role,
      photo{asset->{url}},
      _createdAt
    } | order(_createdAt asc)[0...10]`,
  )

  return {
    props: {
      teams,
    },
    revalidate: 60,
  }
}