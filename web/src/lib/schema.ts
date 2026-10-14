export function listingSchema(listing: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `https://www.waazrealty.com/listings/${listing.slug?.current}`,
    name: listing.title,
    description: listing.description?.[0]?.children?.[0]?.text || '',
    image: listing.gallery?.[0]?.asset?.url || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.title,
      addressLocality: listing.city,
      addressRegion: listing.state,
      addressCountry: 'NG',
    },
    price: {
      '@type': 'PriceSpecification',
      priceCurrency: 'NGN',
      price: listing.price?.toString(),
    },
    availabilityStarts: new Date().toISOString(),
    propertyType: listing.propertyType,
    numberOfRooms: parseInt(listing.bedrooms) || 0,
    numberOfBathroomsTotal: parseInt(listing.baths) || 0,
    url: `https://www.waazrealty.com/listings/${listing.slug?.current}`,
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Waaz Realty',
    url: 'https://www.waazrealty.com',
    logo: 'https://www.waazrealty.com/logo.png',
    description: 'Premium real estate solutions in Nigeria',
    sameAs: [
      'https://www.facebook.com/waazrealty',
      'https://www.instagram.com/waazrealty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@waazrealty.com',
      availableLanguage: ['en', 'yo'],
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url,
    })),
  };
}
