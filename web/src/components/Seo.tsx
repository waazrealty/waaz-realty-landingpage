import Head from 'next/head'

type SeoProps = {
  title?: string
  description?: string
  url?: string
  image?: string
  keywords?: string[]
  canonical?: string
}

const defaultMeta = {
  title: 'Waaz Realty Web App',
  description: 'Your Foundation for Elevated Living in Lagos.',
  url: 'https://waaz-realty-landingpage.vercel.app',
  image: '/assets/seo-preview.png',
  keywords: ['landed properties', 'real estate', 'components'],
}

export default function Seo({
  title = defaultMeta.title,
  description = defaultMeta.description,
  url = defaultMeta.url,
  image = defaultMeta.image,
  keywords = defaultMeta.keywords,
  canonical,
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}

      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <meta name="theme-color" content="#3E452F" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
