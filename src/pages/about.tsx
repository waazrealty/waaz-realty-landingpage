import { BasicLayout } from '@/components/Layout/BasicLayout'

export default function About() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/about`

  return (
    <BasicLayout title="About Us | Wazz Realty" description="Learn about Wazz Realty and our commitment to premium real estate in Lagos." canonical={canonical} url={canonical} image="/assets/about-preview.png">
      <section className="flex flex-col w-10/12 lg:mt-10 mb:mb-35 space-y-12">
        <div className="md:text-[5rem] text-[4rem] font-serif italic md:leading-24 leading-18">
          Guiding Your Vision to its <br /> <span className="text-[#3E452F]">Ultimate Address... </span>
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-md">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Wazz Realty is dedicated to delivering premium residential properties that blend elegance, comfort, and strong investment value.
            We focus on customer service, quality craftsmanship, and modern design.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">Vision</h2>
              <p className="mt-3 text-slate-600">Create communities that inspire exceptional living experiences.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">Mission</h2>
              <p className="mt-3 text-slate-600">Deliver modern, high-quality real estate with trust and transparency.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">Values</h2>
              <p className="mt-3 text-slate-600">Service, integrity, innovation, and lasting value.</p>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}
