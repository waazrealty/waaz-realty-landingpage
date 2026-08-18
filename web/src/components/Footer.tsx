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
    <footer className="bg-[#3E452F] md:p-16 py-16 px-7 space-y-9 w-full">
      <div className="mx-auto flex md:w-11/12 flex-col md:gap-6 gap-10 text-white lg:flex-row md:items-start md:justify-between">
        <img src="/assets/images/logoAlt.png" alt="Wazz Realty Logo" className="h-15 w-15 md:hidden block" />
        <div className="space-y-6 lg:w-3/5">
          <div className="text-5xl italic font-serif text-white leading-13 md:block hidden">Begin Your Property <br/> Journey.</div>
          <div className="text-5xl italic font-serif text-white leading-13 md:hidden">Begin Your  <br/>Property Journey.</div>
          <PrimaryButton textColor="[#36394A]" bgColor="white" iconColor="[#36394A]" onChangeClick={() => router.push('/contact')}>
            Speak with an Advisor
          </PrimaryButton>
        </div>
        <div className="flex md:flex-row flex-col gap-5 space-x-14 text-sm lg:w-2/5">
          <div className="space-y-3 text-sm font-medium tracking-tight">
            <div>Quick Links</div>
            <div className="space-y-3 text-xs text-[#9AA675] flex flex-col">
              <Link href="/about">About</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/rent">Rent</Link>
              <Link href="/sale">Sale</Link>
            </div>
          </div>
          <div className="space-y-3 text-sm font-medium tracking-tight">
            <div>Properties</div>
            <div className="space-y-3 text-xs text-[#9AA675]">
              <div>Flats & Apartments</div>
              <div>Warehouse</div>
              <div>Lands</div>
              <div>Mini Flats</div>
              <div>Detached duplex</div>
              <div>Terraced duplex</div>
              <div>Commercial</div>
              <div>Bungalow</div>
              <div>Duplex</div>
            </div>
          </div>
          <div className="space-y-3 text-sm font-medium tracking-tight">
            <div>Contact</div>
            <div className="space-y-3 text-xs text-[#9AA675] flex flex-col">
              <Link href="/contact">Contact</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/listings">Listings</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex absolute -top-15 right-0 h-10 w-10 items-center justify-center rounded-full border border-white bg-white/50 text-white transition hover:bg-white hover:text-[#3E452F] focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-[#3E452F]" size={15} />
        </button>

      </div>
      <div className="md:mx-auto flex w-11/12 flex-col gap-6 text-white md:flex-row md:items-center md:justify-between">
        <img src="/assets/images/logoAlt.png" alt="Wazz Realty Logo" className="h-15 w-15 md:block hidden" />
        <div className="flex flex-row md:space-x-7 justify-between text-xs font-medium tracking-tight">
          <div>Cookies</div>
          <div>Term & Conditions</div>
          <div>Privacy Policy</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-11/12 md:mx-auto">
        <div className="text-xs text-white font-medium tracking-tight">
          <div>© {new Date().getFullYear()} Wazz Realty. All rights reserved.</div>
        </div>
        <div className="justify-end md:flex hidden">
          <SocialButton socialType="whatsapp" textColor="white" bgColor="[#74C56B]" />
        </div>
      </div>
    </footer>
  )
}
