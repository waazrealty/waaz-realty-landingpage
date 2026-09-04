import { FaChevronUp } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
import SocialButton from "./SocialButton";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <footer className="bg-[#3E452F] md:p-16 py-16 space-y-9 w-full">
      <div className="mx-auto flex w-11/12 flex-col md:gap-6 gap-10 text-white lg:flex-row md:items-start md:justify-between">
        <img src="/assets/images/logoAlt.png" alt="Waaz Realty Logo" className="h-15 w-15 md:hidden block" />
        <div className="space-y-6 lg:w-3/5">
          <div className="text-5xl italic font-serif text-white leading-13 md:block hidden">Begin Your Property <br/> Journey.</div>
          <div className="text-5xl italic font-serif text-white leading-13 md:hidden">Begin Your  <br/>Property Journey.</div>
          <PrimaryButton textColor="[#36394A]" bgColor="white" iconColor="[#36394A]" onChangeClick={() => router.push('/contact')}>
            Speak with an Advisor
          </PrimaryButton>
        </div>
        <div className="flex md:flex-row flex-col gap-5 space-x-14 text-sm lg:w-1/2">
          <div className="space-y-3 text-base font-medium tracking-tight">
            <div>Quick Links</div>
            <div className="space-y-3 md:text-xs text-base text-[#9AA675] flex flex-col">
              <Link href="/about">About</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/rent">Rent</Link>
              <Link href="/sale">Sale</Link>
            </div>
          </div>
          <div className="space-y-3 text-base font-medium tracking-tight">
            <div>Properties</div>
            <div className="space-y-3 md:text-xs text-base text-[#9AA675] flex flex-col">
              <Link href="/listings?type=flats-apartments">Flats & Apartments</Link>
              <Link href="/listings?type=warehouse">Warehouse</Link>
              <Link href="/listings?type=lands">Lands</Link>
              <Link href="/listings?type=mini-flats">Mini Flats</Link>
              <Link href="/listings?type=detached-duplex">Detached duplex</Link>
              <Link href="/listings?type=terraced-duplex">Terraced duplex</Link>
              <Link href="/listings?type=commercial">Commercial</Link>
              <Link href="/listings?type=bungalow">Bungalow</Link>
              <Link href="/listings?type=duplex">Duplex</Link>
            </div>
          </div>
          <div className="space-y-3 text-base font-medium tracking-tight">
            <div>Contact</div>
            <div className="space-y-3 md:text-xs text-base text-[#9AA675] flex flex-col">
              <Link href="/contact">Contact</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/faq">FAQs</Link>
            </div>
          </div>
          <div className="space-y-3 text-base font-medium tracking-tight">
            <div>Socials</div>
            <div className="lg:space-y-3 lg:space-x-0 space-x-3 md:text-xs text-base text-[#9AA675] flex lg:flex-col">
              <a
                href="https://www.instagram.com/waazrealty?igsi=MWxjcTE4c2U1ZXIxcg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-0"
              >
                <img src="/assets/images/instagram.svg" alt="social media icon" className="lg:h-5 h-10 lg:w-5 w-10 lg:rounded-sm rounded-lg" />
              </a>
              <a
                href="https://www.facebook.com/share/1S8gQk6QjR/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-0"
              >
                <img src="/assets/images/facebook.svg" alt="social media icon" className="lg:h-5 h-10 lg:w-5 w-10 lg:rounded-sm rounded-lg" />
              </a>
              <a
                href="https://www.tiktok.com/@waazrealty"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-0"
              >
                <img src="/assets/images/tiktok.svg" alt="social media icon" className="lg:h-5 h-10 lg:w-5 w-10 lg:rounded-sm rounded-lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/waaz-realty-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-0"
              >
                <img src="/assets/images/linkedIn.svg" alt="social media icon" className="lg:h-5 h-10 lg:w-5 w-10 lg:rounded-sm rounded-lg" />
              </a>
              <a
                href="https://twitter.com/waazrealty"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-0"
              >
                <img src="/assets/images/x.svg" alt="social media icon" className="lg:h-5 h-10 lg:w-5 w-10 lg:rounded-sm rounded-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-11/12">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex absolute -top-15 right-0 h-10 w-10 items-center justify-center rounded-full border border-white bg-white/50 text-white transition hover:bg-white hover:text-[#3E452F] focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-[#3E452F]" size={15} />
        </button>

      </div>
      <div className="mx-auto flex w-11/12 flex-col gap-6 text-white md:flex-row items-center md:justify-between">
        <img src="/assets/images/logoAlt.png" alt="Waaz Realty Logo" className="h-15 w-15 md:block hidden" />
        <div className="flex flex-row md:space-x-7 md:w-80 w-full justify-between md:text-xs text-base font-medium tracking-tight">
          <div>Cookies</div>
          <div>Term & Conditions</div>
          <div>Privacy Policy</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-11/12 mx-auto">
        <div className="md:text-sm text-base text-white font-medium tracking-tight">
          <div>© {new Date().getFullYear()} Waaz Realty. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
