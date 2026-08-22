import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'
import { MdSegment } from 'react-icons/md'

const desktopLinkBase = 'leading-2 font-medium transition hover:text-[#1B1F14] inline-flex items-center justify-center pb-1'
const desktopLinkActive = 'relative text-[#1B1F14] font-medium inline-flex items-center justify-center after:-mb-0.5 after:absolute after:rounded-full after:left-1/2 after:-bottom-0 after:block after:h-[2px] after:w-3 after:-translate-x-1/3 after:bg-[#1B1F14]'
const mobileLinkBase = 'block rounded-2xl py-2 transition hover:bg-[#F5F5F5] hover:text-[#363C2B] px-4'
const mobileLinkActive = 'relative text-[#1B1F14] font-semibold pb-1 after:absolute after:rounded-full after:left-0/3 after:-bottom-1 after:block after:h-[4px] after:w-50 after:-translate-x-1/2 after:bg-[#1B1F14]'

const navItemsLeft = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Listings', href: '/listings' },
  { label: 'List Your Property', href: '/list-your-property' },
]

const navItemsRight = [
  { label: 'For Sale', href: '/sale' },
  { label: 'For Rent', href: '/rent' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useRouter()
  const getDesktopLinkClass = (href: string) => pathname.includes(href) ? desktopLinkActive : desktopLinkBase
  const getMobileLinkClass = (href: string) => `${mobileLinkBase} ${pathname.includes(href) ? mobileLinkActive : 'text-[#1B1F14]'}`

  return (
    <nav className="w-full md:px-6 px-3 md:py-10 py-2 relative flex flex-col items-center">
      <div className="mx-auto w-10/12 items-center px-10 py-1 bg-[#D2D8BE]/40  backdrop-blur-xs fixed z-50 border border-[#B5BF97]/50 rounded-4xl justify-between text-sm gap-4 lg:flex hidden">
        <div className="flex flex-wrap items-center space-x-8 font-medium text-sm text-[#36394A] w-5/12 ">
          {navItemsLeft.map((item) => (
            <Link key={`${item.href}-${item.label}`} className={getDesktopLinkClass(item.href)} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/">
          <img src="/assets/images/logo.png" alt="Waaz Realty Logo" className="h-13 w-13" />
        </Link>

        <div className="flex flex-wrap items-center justify-end space-x-8 font-medium text-sm text-[#36394A] w-5/12 ">
          {navItemsRight.map((item) => (
            <Link key={`${item.href}-${item.label}`} className={getDesktopLinkClass(item.href)} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:hidden w-11/12 bg-[#D2D8BE]/40  backdrop-blur-xs fixed z-50 border border-[#B5BF97]/50 rounded-4xl">
        <div className="flex items-center justify-between pr-2">
          <Link href="/">
            <img src="/assets/images/logo.png" alt="Waaz Realty Logo" className="h-15 w-15" />
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white transition hover:bg-[#F5F5F5]"
          >
            <MdSegment
              size={25}
              className={`transition-transform text-[#36394A] `}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 w-full z-50">
          <div className="w-full h-full bg-white/50 p-2">
            <div className="flex flex-col gap-3 rounded-3xl bg-[#D2D8BE]/80 p-5 pb-15 text-sm text-white font-medium shadow-sm max-h-full overflow-auto">
              <div className="flex items-center justify-between mb-5">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <img src="/assets/images/logo.png" alt="Waaz Realty Logo" className="h-15 w-15" />
                </Link>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-label="Toggle navigation menu"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="text-white transition hover:bg-[#F5F5F5]"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>

              {[...navItemsLeft, ...navItemsRight].map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={getMobileLinkClass(item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
