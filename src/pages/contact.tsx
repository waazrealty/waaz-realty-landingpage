import { BasicLayout } from '@/components/Layout/BasicLayout'

export default function Contact() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/contact`

  return (
    <BasicLayout title="Contact | Wazz Realty" description="Get in touch with Wazz Realty for property inquiries and support." canonical={canonical} url={canonical} image="/assets/contact-preview.png">
      <section className="bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-md">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-slate-600">Reach out for property inquiries, customer support, or partnership opportunities.</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Office</h2>
                <p className="mt-2 text-slate-600">123 Wazz Realty Avenue, Lekki, Lagos, Nigeria</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="mt-2 text-slate-600">hello@wazzrealty.com</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Phone</h2>
                <p className="mt-2 text-slate-600">+234 800 123 4567</p>
              </div>
            </div>

            <form className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" type="text" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Message</label>
                <textarea className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" rows={6} placeholder="Tell us about your inquiry" />
              </div>
              <button className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}
