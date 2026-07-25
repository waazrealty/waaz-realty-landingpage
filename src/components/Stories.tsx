

const saleListings = [
  {
    id: 1,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image3.png',
  },
  {
    id: 2,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
  {
    id: 3,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image3.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
  {
    id: 4,
    title: 'Palm Beach',
    price: '₦250M /YR',
    location: 'Ajao Estate • Lagos',
    bedrooms: '3 Bedrooms',
    baths: '2 Baths',
    image: '/assets/images/card-image4.png',
  },
]

export default function Stories() {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:px-20 px-7 md:space-y-8 space-y-5"
      >
        <div className="md:w-90 w-full">
          <div className="text-[3.35rem] text-center leading-16 italic font-serif text-black">Behind Each Door, A Story of Success.</div>
        </div>

        <div className="text-[#666D80] text-center max-w-170 text-[1rem] leading-6">
          We invite you to browse a selection of our landmark transactions. From securing dream homes for families in Lekki to leasing premium apartments in Ikoyi, these properties showcase our ability to navigate the Lagos market and deliver exceptional results for buyers, sellers, landlords, and tenants alike.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {saleListings.map((listing, index) => (
            <div key={listing.id} className="space-y-1.5">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="font-medium text-sm">0{index+1}</div>
                <div className="font-medium text-sm">Sale</div>
              </div>
              <img src={listing.image} alt={listing.title} className="h-auto w-full object-cover" />
              <h3 className="text-sm text-[##0D0D12] font-medium">{listing.title}</h3>
            </div>
          ))}
        </div>

      </section>
  )
}
