import { BasicLayout } from '@/components/Layout/BasicLayout'
import PrimaryButton from '@/components/PrimaryButton'
import { validateEmail } from '@/lib/common'
import { contactErrorMessageMap, ContactErrorTypes, ERROR_EMAIL_INVALID } from '@/lib/errors'
import { useAlert } from '@/lib/notification/alertcontext'
import { EMAIL_REGEX } from '@/lib/regex'
import Link from 'next/link'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { FiChevronRight } from 'react-icons/fi'
import { VscChevronRight } from 'react-icons/vsc'

export default function Contact() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/contact`

  const { addAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formInfo, setFormInfo] = useState({fullname: '', email: '', mobile: '', discussion: '', message:''});


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { fullname, email, mobile, discussion, message } = formInfo;

    const errors: string[] = [];

    Object.entries(formInfo).forEach(([key, value]) => {
      if (!value && key !== 'email') errors.push(contactErrorMessageMap[key as ContactErrorTypes]);
      if (key === 'email' && value && !validateEmail(value)) errors.push(ERROR_EMAIL_INVALID);
    });

    if (errors.length > 0) {
      errors.forEach((msg) => addAlert({ message: msg, type: 'error' }));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          mobile,
          discussion,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'error occurred while submitting form');
      }

      setFormInfo({ fullname: '', email: '', mobile: '', discussion: '', message: '' });
      addAlert({ message: 'Contact form submitted successfully', type: 'success' });
    } catch (error) {
      console.log(error);
      addAlert({ message: error instanceof Error ? error.message : 'error occurred while submitting form', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BasicLayout title="Contact | Waaz Realty" description="Get in touch with Waaz Realty for property inquiries and support." canonical={canonical} url={canonical} image="/assets/contact-preview.png">
      <section className="flex flex-col md:w-10/12 w-11/12 lg:mt-15 mt-25 space-y-5 items-center">
        <div className="md:text-[4.5rem] text-[3rem] md:w-xl font-serif text-center italic md:leading-18 leading-13">
          Your Journey Starts With a Conversation.
        </div>
        <div className="text-[#666D80] lg:w-[45%] text-center text-base leading-7">
          Whether you have a question about a specific property, wish to discuss selling your home, or need expert advice on the Lagos real estate market, our team is ready to assist. We look forward to connecting with you.
        </div>
      </section>
      <section className="h-50"></section>
      <section className="relative md:w-10/12 w-11/12">
        <div className="absolute inset-0">
          <div className="hidden md:block h-200 w-full bg-cover bg-center rounded-4xl" style={{ backgroundImage: "url('/assets/images/bg-contact.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-160 w-full bg-cover bg-center rounded-4xl" style={{ backgroundImage: "url('/assets/images/bg-contact.png')" }} aria-hidden="true" />
        </div>

        <div className="relative mx-auto md:p-10 p-5 lg:w-[35%] w-11/12 bg-[#F6F8FA] border border-[#ECEFF3] rounded-4xl -mt-50">
          <p className="text-[2rem] italic font-medium font-serif">Get in Touch</p>
          <form className="mt-6 space-y-4 font-medium">
            <div>
              <label className="mb-2 block text-sm text-slate-700">Full Name</label>
              <input type="text" placeholder="Enter full name" value={formInfo.fullname} onChange={({ target}) => {setFormInfo({ ...formInfo, fullname: target.value })}} className="w-full bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" placeholder="Enter email address" value={formInfo.email} onChange={({ target}) => {setFormInfo({ ...formInfo, email: target.value })}} className="w-full bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
              <input type="tel" placeholder="Enter phone number" value={formInfo.mobile} onChange={({ target}) => {setFormInfo({ ...formInfo, mobile: target.value })}} className="w-full bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Discussion</label>
              <input type="text" placeholder="Enter discussion details" value={formInfo.discussion} onChange={({ target}) => {setFormInfo({ ...formInfo, discussion: target.value })}} className="w-full bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">More Information</label>
              <textarea rows={4} placeholder="Please provide any details that will help us assist you, such as property names or specific questions." value={formInfo.message} onChange={({ target}) => {setFormInfo({ ...formInfo, message: target.value })}} className="w-full bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
            </div>
            <div onClick={handleSubmit} className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize w-full">
              {!isSubmitting ? 'Send Message' : 'Sending ....'}
              <FiChevronRight size={14} className="-mb-0.5" />
            </div>
          </form>
        </div>
      </section>
      <section className="md:h-75 h-25"></section>
      <section
        className="md:w-10/12 w-11/12 flex flex-col items-center justify-between space-y-8"
      >
        <div className="lg:w-lg w-11/12">
          <div className="lg:text-6xl text-5xl text-center leading-16 italic font-serif text-black">Pick your channel</div>
        </div>

        <div className="text-[#666D80] text-center md:w-7/12 w-11/12 md:text-base text-lg leading-6">
          Whether you need instant answers or want to schedule a sit-down consultation, our team is available across multiple platforms to serve you.
        </div>

        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mt-10">
          <div className="w-full gap-5 bg-[##F5F6EF] rounded-4xl border border-[#D2D8BE]">
            <div className="relative flex justify-center my-10">
              <img
                src="/assets/images/email.svg"
                alt="Mail icon"
                className="h-30 object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#c5d63a]/60 mix-blend-color" />
            </div>
            <div className="w-full bg-cover bg-center rounded-b-4xl" style={{ backgroundImage: "url('/assets/images/card.png')" }} aria-hidden="true">
              <div className="p-7 md:w-full w-11/12">
                <div className="text-3xl italic font-serif text-white leading-13">Send Us an Email</div>
                <div className="text-sm text-[#E8EADD] pt-2 pb-7">For detailed inquiries, partnership proposals, or document submissions. We typically reply within 24 hours.</div>
                <div
                  className="flex items-center gap-2 rounded-full bg-white capitalize px-6 py-2 text-xs tracking-tight transition hover:opacity-90 w-max cursor-pointer"
                >
                  <span>Send A Mail</span>
                  <VscChevronRight size={14} className="-mb-1" />
                </div>
              </div> 
            </div>
          </div>
          <div className="w-full gap-5 bg-[##F5F6EF] rounded-4xl border border-[#D2D8BE]">
            <div className="relative flex justify-center my-10">
              <img
                src="/assets/images/phone.svg"
                alt="Mail icon"
                className="h-30 object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#c5d63a]/60 mix-blend-color" />
            </div>
            <div className="w-full bg-cover bg-center rounded-b-4xl" style={{ backgroundImage: "url('/assets/images/card.png')" }} aria-hidden="true">
              <div className="p-7 md:w-full w-11/12">
                <div className="text-3xl italic font-serif text-white leading-13">Call Our Experts</div>
                <div className="text-sm text-[#E8EADD] pt-2 pb-7">Prefer to hear a voice? Speak directly with our real estate experts. We are available Monday to Saturday, 9am - 6pm.</div>
                <div className="inline-flex gap-3">
                  <div
                    className="flex items-center gap-2 rounded-full bg-white capitalize px-6 py-2 text-xs tracking-tight transition hover:opacity-90 w-max cursor-pointer"
                  >
                    <span>Give Us A Call</span>
                    <VscChevronRight size={14} className="-mb-1" />
                  </div>
                  <div className="flex items-center gap-1 font-medium capitalize p-2 bg-[#74C56B] rounded-full border border-white">
                    <FaWhatsapp size={14} className="text-white"/>
                  </div>
                </div>
              </div> 
            </div>
          </div>
          <div className="w-full gap-5 bg-[##F5F6EF] rounded-4xl border border-[#D2D8BE]">
            <div className="relative flex justify-center my-10">
              <img
                src="/assets/images/store.svg"
                alt="Mail icon"
                className="h-30 object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#c5d63a]/60 mix-blend-color" />
            </div>
            <div className="w-full bg-cover bg-center rounded-b-4xl" style={{ backgroundImage: "url('/assets/images/card.png')" }} aria-hidden="true">
              <div className="p-7 md:w-full w-11/12">
                <div className="text-3xl italic font-serif text-white leading-13">Visit Our Office</div>
                <div className="text-sm text-[#E8EADD] pt-2 pb-7">Prefer a face-to-face consultation? Drop by our headquarters to discuss your real estate goals over a cup of coffee.</div>
                <div
                  className="flex items-center gap-2 rounded-full bg-white capitalize px-6 py-2 text-xs tracking-tight transition hover:opacity-90 w-max cursor-pointer"
                >
                  <span>Get Directions</span>
                  <VscChevronRight size={14} className="-mb-1" />
                </div>
              </div> 
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 md:my-15">
          <a
            href="https://www.instagram.com/waazrealty?igsi=MWxjcTE4c2U1ZXIxcg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-0"
          >
            <img src="/assets/images/instagram.svg" alt="social media icon" className="h-10 w-10" />
          </a>
          <a
            href="https://www.facebook.com/share/1S8gQk6QjR/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-0"
          >
            <img src="/assets/images/facebook.svg" alt="social media icon" className="h-10 w-10" />
          </a>
          <a
            href="https://www.tiktok.com/@waazrealty"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-0"
          >
            <img src="/assets/images/tiktok.svg" alt="social media icon" className="h-10 w-10" />
          </a>
          <a
            href="https://www.linkedin.com/company/waaz-realty-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-0"
          >
            <img src="/assets/images/linkedIn.svg" alt="social media icon" className="h-10 w-10" />
          </a>
          <a
            href="https://twitter.com/waazrealty"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-0"
          >
            <img src="/assets/images/x.svg" alt="social media icon" className="h-10 w-10" />
          </a>
        </div>
      </section>
      <section className="relative md:aspect-video aspect-2/3 lg:w-10/12 w-full overflow-hidden mb-20">
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/banner.svg')" }} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
          <div className=" md:text-[3.5rem] text-5xl md:leading-[4.38rem] lg:w-[30%] italic font-serif text-[#131313] text-center">Ready to find a property of choice</div>
          <div className="text-[#666D80] lg:w-[28%] text-center text-[1rem] leading-7">
            Having trouble finding a property? We’ve got you covered. Reach out to our team to get it all sorted.
          </div>
          <div>
            <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-5 py-2 text-white transition hover:opacity-90 capitalize">
              View Listings
              <FiChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}
