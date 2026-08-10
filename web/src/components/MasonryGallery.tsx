const galleryItems = [
  { src: '/assets/images/gallery/image1.png', alt: 'Aerial neighbourhood', classes: 'lg:col-span-2 col-span-2 lg:row-span-1' },
  { src: '/assets/images/gallery/image2.png', alt: 'Property exterior', classes: 'lg:col-span-1 lg:row-span-2' },
  { src: '/assets/images/gallery/image3.png', alt: 'Dining area', classes: 'lg:col-span-1 lg:row-span-1' },
  { src: '/assets/images/gallery/image4.png', alt: 'Kitchen', classes: 'lg:col-span-1 lg:row-span-1' },
  { src: '/assets/images/gallery/image5.png', alt: 'Bedroom', classes: 'lg:col-span-1 lg:row-span-2' },
  { src: '/assets/images/gallery/image6.png', alt: 'Terrace view', classes: 'lg:col-span-2 lg:row-span-1' },
  // { src: '/assets/images/gallery/image6.png', alt: 'Terrace view', classes: 'lg:col-span-2 lg:row-span-1' },
]
const galleryMobileItems = [
  { src: '/assets/images/gallery/image1.png', alt: 'Aerial neighbourhood', classes: 'lg:col-span-2 col-span-2 lg:row-span-1' },
  { src: '/assets/images/gallery/image3.png', alt: 'Dining area', classes: 'lg:col-span-1 lg:row-span-1' },
  { src: '/assets/images/gallery/image4.png', alt: 'Kitchen', classes: 'lg:col-span-1 lg:row-span-1' },
  { src: '/assets/images/gallery/image2.png', alt: 'Property exterior', classes: 'col-span-2 row-span-1' },
  { src: '/assets/images/gallery/image5.png', alt: 'Bedroom', classes: 'lg:col-span-1 lg:row-span-2' },
  { src: '/assets/images/gallery/image6.png', alt: 'Terrace view', classes: 'lg:col-span-2 lg:row-span-1' },
  // { src: '/assets/images/gallery/image6.png', alt: 'Terrace view', classes: 'lg:col-span-2 lg:row-span-1' },
]

export default function MasonryGallery() {
  return (
    <section className="w-full md:pb-16">
      {/* <div className="columns-3">
        {galleryItems.map((item, idx) => (
          <div
            key={item.src}
            className={`overflow-hidden flex items-stretch ${item.classes}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-center transition duration-500 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div> */}
      <div className="md:grid hidden grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, idx) => (
          <div
            key={item.src}
            className={`overflow-hidden bg-slate-100 shadow-sm flex items-stretch ${item.classes}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-center transition duration-500 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="grid md:hidden grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {galleryMobileItems.map((item, idx) => (
          <div
            key={item.src}
            className={`overflow-hidden bg-slate-100 shadow-sm flex items-stretch ${item.classes}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-center transition duration-500 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
