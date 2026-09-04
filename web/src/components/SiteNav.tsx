import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'
import { MdSegment } from 'react-icons/md'

const desktopLinkBase =
  'leading-2 font-medium transition hover:text-[#1B1F14] inline-flex items-center justify-center pb-1'

const desktopLinkActive =
  'relative text-[#1B1F14] font-medium inline-flex items-center justify-center after:-mb-0.5 after:absolute after:rounded-full after:left-1/2 after:-bottom-0 after:block after:h-[2px] after:w-3 after:-translate-x-1/3 after:bg-[#1B1F14]'

const mobileLinkBase =
  'block rounded-2xl px-4 py-3 transition hover:bg-white/10'

const mobileLinkActive =
  'relative bg-white/10 text-[#B5BF97] font-semibold'

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
  { label: 'FAQ', href: '/faq' },
]

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useRouter()
  const componentRef = useRef<HTMLDivElement>(null)

  const getDesktopLinkClass = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)
      ? desktopLinkActive
      : desktopLinkBase

  const getMobileLinkClass = (href: string) =>
    `${mobileLinkBase} ${
      pathname === href || pathname.startsWith(`${href}/`)
        ? mobileLinkActive
        : 'text-white'
    }`

  // Close menu when clicking outside the mobile menu panel.
  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav className="relative w-full flex flex-col items-center px-3 py-2 md:px-6 md:py-10">
      {/* =========================
          DESKTOP NAVIGATION
      ========================== */}
      <div className="fixed z-50 mx-auto hidden w-10/12 items-center justify-between gap-4 rounded-4xl border border-[#B5BF97]/50 bg-[#D2D8BE]/40 px-10 py-1 text-sm backdrop-blur-xs lg:flex">
        <div className="flex w-5/12 flex-wrap items-center space-x-8 text-sm font-medium text-[#36394A]">
          {navItemsLeft.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              className={getDesktopLinkClass(item.href)}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/">
          <img
            src="/assets/images/logo.png"
            alt="Waaz Realty Logo"
            className="h-13 w-13"
          />
        </Link>

        <div className="flex w-5/12 flex-wrap items-center justify-end space-x-8 text-sm font-medium text-[#36394A]">
          {navItemsRight.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              className={getDesktopLinkClass(item.href)}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* =========================
          MOBILE HEADER
      ========================== */}
      <div className="fixed left-1/2 top-2 z-50 w-[92%] -translate-x-1/2 rounded-4xl border border-[#B5BF97]/50 bg-[#D2D8BE]/40 backdrop-blur-xs lg:hidden">
        <div className="flex h-16 items-center justify-between px-3">
          <Link href="/" aria-label="Waaz Realty home">
            <img
              src="/assets/images/logo.png"
              alt="Waaz Realty Logo"
              className="h-14 w-14 object-contain"
            />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#36394A] transition hover:bg-white/40"
          >
            {menuOpen ? (
              <AiOutlineClose size={22} />
            ) : (
              <MdSegment size={26} />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            ref={componentRef}
            className="absolute bottom-3 left-1/2 flex max-h-[calc(100dvh-1.5rem)] w-[94%] -translate-x-1/2 flex-col overflow-hidden rounded-3xl bg-black/95 p-4 text-base font-medium text-white shadow-2xl"
          >
            {/* Menu header */}
            <div className="mb-3 flex shrink-0 items-center justify-between">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-label="Waaz Realty home"
              >
                <img
                  src="/assets/images/logo.png"
                  alt="Waaz Realty Logo"
                  className="h-14 w-14 object-contain"
                />
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
              >
                <AiOutlineClose size={22} />
              </button>
            </div>

            {/* Menu links */}
            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-2">
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