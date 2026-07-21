import Link from 'next/link'
import { useState } from 'react'
import { FaAlignLeft } from "react-icons/fa6";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full px-6 py-10">
      <div className="mx-auto w-10/12 items-center px-10 py-1 border border-[#ECEFF3] rounded-4xl justify-between text-sm gap-4 md:flex hidden">
        <div className="flex flex-wrap items-center space-x-8 font-medium text-sm text-black">
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/">About</Link>
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/about">Portfolio</Link>
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/contact">Listings</Link>
        </div>
        <img src="/assets/images/logo.png" alt="Wazz Realty Logo" className="h-12 w-12" />
        <div className="flex flex-wrap items-center space-x-8 font-medium text-sm text-black">
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/">For Sale</Link>
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/about">For Rent</Link>
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/contact">Contact</Link>
          <Link className="hover:text-[#3E452F] leading-2 font-medium" href="/blog">Blog</Link>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <img src="/assets/images/logo.png" alt="Wazz Realty Logo" className="h-15 w-15" />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full border border-[#D9D9D9] p-2 text-black transition hover:bg-[#F5F5F5]"
          >
            <FaAlignLeft
              size={20}
              className={`transition-transform ${menuOpen ? "rotate-90" : "-scale-y-100"}`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 rounded-3xl border border-[#D9D9D9] bg-white p-4 text-sm text-black shadow-sm">
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/">About</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/about">Portfolio</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/contact">Listings</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/">For Sale</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/about">For Rent</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/contact">Contact</Link>
            <Link onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2 hover:bg-[#F5F5F5]" href="/blog">Blog</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
