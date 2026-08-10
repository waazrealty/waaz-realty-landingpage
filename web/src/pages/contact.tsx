import { BasicLayout } from '@/components/Layout/BasicLayout'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

export default function Contact() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/contact`

  return (
    <BasicLayout title="Contact | Wazz Realty" description="Get in touch with Wazz Realty for property inquiries and support." canonical={canonical} url={canonical} image="/assets/contact-preview.png">
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-10 space-y-5 items-center">
        <div className="md:text-[4.5rem] text-[3rem] md:w-xl font-serif text-center italic md:leading-18 leading-13">
          Your Journey Starts With a Conversation.
        </div>
        <div className="text-[#666D80] md:w-[45%] text-center text-base leading-7">
          Whether you have a question about a specific property, wish to discuss selling your home, or need expert advice on the Lagos real estate market, our team is ready to assist. We look forward to connecting with you.
        </div>
      </section>
      <section className="h-40"></section>
      <section className="relative w-full">
        <div className="absolute inset-0">
          <div className="hidden md:block h-200 w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-contact.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-contact.png')" }} aria-hidden="true" />
        </div>

        <div className="relative mx-auto md:p-10 p-5 md:w-[30%] w-10/12 bg-white -mt-50">
          <p className="text-[2rem] italic font-medium font-serif">Get in Touch</p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-700">Name</label>
              <input type="text" placeholder="Enter name" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
              <input type="tel" placeholder="Enter phone number" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Discussion</label>
              <input type="text" placeholder="Enter discussion details" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">More Information</label>
              <textarea rows={4} placeholder="Please provide any details that will help us assist you, such as property names or specific questions." className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <button className="text-sm text-center flex justify-center items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize w-full">
              Send Message
              <FiChevronRight size={14} className="-mb-0.5" />
            </button>
          </form>
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
