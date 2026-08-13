import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { BasicLayout } from '@/components/Layout/BasicLayout'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import { formatToHumanNumber, getFirstWord, getFormattedDate, sumObjectValues } from '@/lib/common'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import MoreListings from '@/components/MoreListings'
import Carousel from '@/components/Carousel'
import { MdBed, MdBathtub, MdBathroom, MdOutlineStar, MdFolderOpen, MdError, MdReceipt, MdOutlineCall } from 'react-icons/md'
import { VscChevronRight } from 'react-icons/vsc'
import { IoLogoWhatsapp } from 'react-icons/io'
import { getIcon, IconKey } from '@/lib/icons'

type ListingDetail = {
  title: string
  slug: { current: string }
  price?: number
  city?: string
  state?: string
  bedrooms?: string
  baths?: string
  propertyType?: string
  category?: string
  gallery?: Array<{ asset?: { url?: string } }>
  description?: any[]
  propertyFeatures: Array<{ feature?: string }>
  availableDocuments: Array<{ feature?: string }>
  communityAmenities: Array<{ feature?: string }>
  luxuryAmenities: Array<{ feature?: string }>
  securityFeatures: Array<{ feature?: string }>
  outdoorAmenities: Array<{ feature?: string }>
  coreInfrastructure: Array<{ feature?: string }>
  specializedRooms: Array<{ feature?: string }>
  ecoFeatures: Array<{ feature?: string }>
  propertyRules: Array<{ feature?: string }>
  utilities: Array<{ feature?: string }>
  moveInCosts: Array<{ item: string; detail: string; amount: number }>
  agent: { name: string; phone?: string }
  _updatedAt?: string
}

const formatPrice = (value?: number) => {
  if (!value) return 'Price on request'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

const formatLabel = (value: string) =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const featureTitles: Record<string, string> = {
  wc: 'Guest Toilet',
  kitchen: 'Kitchen',
  inventory_2: 'Pantry',
  inventory: 'Store Room',
  weekend: 'Living Room / Lounge',
  chair_alt: 'Family Lounge (Upstairs)',
  restaurant: 'Dining Area',
  balcony: 'Balcony / Terrace',
  checkroom: 'Walk-in Closet',
  shower: 'En-suite Bathrooms',
  meeting_room: 'Ante Room / Foyer',
  archive: 'Box Room / Extra Storage',
  layers: 'Mezzanine Level',
  deck: 'Verandah',
  pool: 'Swimming Pool',
  waves: 'Infinity Pool',
  hot_tub: 'Hot Tub / Jacuzzi',
  spa: 'Sauna / Steam Room',
  wine_bar: 'Wine Cellar',
  local_bar: 'Lounge / Bar Area',
  sports_tennis: 'Tennis Court',
  sports_basketball: 'Basketball Court',
  fitness_center: 'Gym / Fitness Center',
  golf_course: 'Golf / Mini-Golf',
  flight_takeoff: 'Helipad',
  directions_boat: 'Private Boat Dock / Jetty',
  roofing: 'Rooftop Lounge',
  sports_score: 'Squash Court',
  smoking_rooms: 'Cigar Lounge',
  water: 'Indoor Pool',
  router: 'Smart Home System',
  doorbell: 'Video Doorbell',
  fingerprint: 'Biometric / Fingerprint Access',
  bolt: 'Electric Fence',
  videocam: 'CCTV Surveillance',
  ring_volume: 'Intercom System',
  sensors: 'Motion Sensors',
  notifications_active: 'Panic Alarm',
  local_police: 'Uniformed Security Guard',
  security: 'Armed Patrol',
  lock: 'Keyless Entry / Smart Lock',
  garage: 'Automated Gates',
  detector_smoke: 'Fire Alarm / Smoke Detector',
  door_front: 'Security / Bulletproof Doors',
  grid_3x3: 'Burglary Proof / Window Guards',
  blinds: 'Automated Blinds / Curtains',
}

const getFeatureTitle = (featureKey?: string) => {
  if (!featureKey) return ''
  return featureTitles[featureKey] ?? formatLabel(featureKey)
}

const otherFeatureTitles: Record<string, string> = {
  roofing: 'Rooftop Terrace',
  holiday_village: 'Gazebo / Pergola',
  outdoor_grill: 'BBQ / Grilling Area',
  shower: 'Outdoor Shower',
  yard: 'Private Garden',
  water_drop: 'Fountain / Water Feature',
  grid_on: 'Stamped Concrete Compound',
  garage: 'Carport / Shaded Parking',
  local_fire_department: 'Fire Pit',
  beach_access: 'Cabana',
  agriculture: 'Greenhouse / Orchard',
  deck: 'Courtyard / Patio',
  grass: 'Artificial Turf',
  electric_bolt: 'Dedicated Transformer',
  sanitizer: 'Water Treatment Plant',
  wifi_tethering: 'High-Speed Fibre Internet',
  gas_meter: 'Piped Central Gas Line',
  elevator: 'Elevator / Lift',
  accessible_forward: 'Wheelchair Ramp',
  delete_sweep: 'Trash Chute',
  cleaning_services: 'Central Vacuum System',
  battery_charging_full: 'Backup Battery / UPS Room',
  flash_on: 'Lightning Arrestor',
  fire_extinguisher: 'Fire Sprinkler System',
  hvac: 'HVAC System',
  unfold_more: 'Freight Elevator / Service Lift',
  kitchen: 'Dumbwaiter',
  cottage: 'Boys Quarters (BQ) / Maids Room',
  theaters: 'Home Cinema / Theater',
  desk: 'Study Room / Home Office',
  place_of_worship: 'Prayer Room / Mosque / Chapel',
  local_laundry_service: 'Laundry Room',
  meeting_room: 'Mudroom / Foyer',
  foundation: 'Underground Basement',
  sports_esports: 'Gaming Room',
  mic: 'Music / Recording Studio',
  menu_book: 'Private Library',
  wb_sunny: 'Sunroom / Conservatory',
  enhanced_encryption: 'Safe Room / Panic Room',
  dns: 'Server / IT Room',
  ac_unit: 'Cold Room (Storage)',
  handyman: 'Workshop / DIY Room',
  content_cut: 'Home Salon / Spa',
  solar_power: 'Solar Panels / Inverter',
  ev_station: 'EV Charging Station',
  light_mode: 'Natural Light / Floor-to-Ceiling Windows',
  water_ec: 'Rainwater Harvesting System',
  eco: 'Energy Efficient Appliances',
  forest: 'Green Roof / Living Wall',
  window: 'Double Glazed / Insulated Windows',
  recycling: 'Composting Area',
  science: 'Biodigester',
  nest_thermostat: 'Smart Thermostat',
}

const getOtherFeatureTitle = (otherKey?: string) => {
  if (!otherKey) return ''
  return otherFeatureTitles[otherKey] ?? formatLabel(otherKey)
}

const utilitiesTitles: Record<string, string> = {
  electric_meter: 'Prepaid Meter',
  receipt: 'Postpaid Meter',
  water_drop: 'Borehole / Treated Water',
  electric_bolt: 'Grid Power Supply',
  solar_power: 'Solar Inverter System',
  power: 'Backup Generator',
  water: 'Good Drainage System',
  delete: 'Waste Disposal / Central Bins',
  plumbing: 'Septic Tank / Soakaway',
  opacity: 'Overhead Water Tank',
  settings_input_component: 'Water Pumping Machine',
  ac_unit: 'Central Air Conditioning',
  thermostat: 'Central Heating',
}

const getUtilityTitle = (utilityKey?: string) => {
  if (!utilityKey) return ''
  return utilitiesTitles[utilityKey] ?? formatLabel(utilityKey)
}

const documentTitles: Record<string, string> = {
  workspace_premium: 'Certificate of Occupancy (C of O)',
  gavel: 'Governor`s Consent',
  assignment: 'Deed of Assignment',
  history_edu: 'Registered Conveyance',
  map: 'Survey Plan',
  article: 'Excision / Gazette',
  receipt_long: 'Purchase Receipt',
  supervisor_account: 'Power of Attorney',
  mark_email_read: 'Letter of Allocation',
  handshake: 'Contract of Sale',
  balance: 'Court Judgment',
  contract: 'Tenancy Agreement'
}

const getDocumentTitle = (documentKey?: string) => {
  if (!documentKey) return ''
  return documentTitles[documentKey] ?? formatLabel(documentKey)
}

const amenitiesTitles: Record<string, string> = {
  directions_car : 'Parking Space',
  fence : 'Gated Estate / Community',
  add_road : 'Tarred / Paved Roads',
  light : 'Street Lights',
  shopping_cart : 'Supermarket / Grocery',
  local_pharmacy : 'Pharmacy / Clinic',
  local_hospital : 'Hospital / Medical Center',
  school : 'School / Daycare Nearby',
  church : 'Church',
  mosque : 'Mosque',
  child_friendly : 'Children\'s Playground',
  deck : 'Club House',
  directions_bus : 'Public Transport / Bus Stop',
  local_atm : 'Bank / ATM Nearby',
  local_police : 'Police Station Nearby',
  co_present : 'Coworking Space',
}

const getAmenityTitle = (amenityKey?: string) => {
  if (!amenityKey) return ''
  return amenitiesTitles[amenityKey] ?? formatLabel(amenityKey)
}

const propertyRuleTitles: Record<string, string> = {
  noise_control_off: 'No Generators Allowed',
  do_not_disturb: 'No Pets Allowed',
  pets: 'Pet Friendly',
  request_quote: 'Service Charge Applies',
  new_releases: 'Newly Built',
  construction: 'Recently Renovated',
  shield: 'Flood Free Zone',
  chair: 'Furnished',
  check_box_outline_blank: 'Unfurnished',
  category: 'Semi-Furnished',
  filter_b_and_w: 'Corner Piece Property',
  pool: 'Waterfront Property',
  person: 'Owner Occupied',
  people: 'Tenanted',
  business: 'Commercial Use Allowed',
  home: 'Residential Use Only',
  smoke_free: 'No Smoking',
}

const getPropertyRuleTitle = (ruleKey?: string) => {
  if (!ruleKey) return ''
  return propertyRuleTitles[ruleKey] ?? formatLabel(ruleKey)
}

export default function ListingDetails({ listing, listings }: { listing: ListingDetail | null; listings?: any[] }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <BasicLayout title="Loading..." description="Loading listing details...">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  if (!listing) {
    return (
      <BasicLayout title="Listing not found | Wazz Realty" description="The listing could not be found.">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <h1 className="text-2xl font-semibold">Listing not found</h1>
            <p className="mt-4 text-slate-600">Please check the listing link and try again.</p>
          </div>
        </div>
      </BasicLayout>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/listings/${listing.slug.current}`
  const location = [listing.city, listing.state].filter(Boolean).join(' • ')
  const summary = listing.description?.find((block: any) => block._type === 'block')?.children?.map((child: any) => child.text).join(' ') || ''
  const agent = listing.agent || { name: 'Dami', phone: '+234 807 909 7547' }
  const imageUrl = listing.gallery?.[0]?.asset?.url || '/assets/images/listing-image.png'
  const agentPhoneRaw = agent.phone || '+2348079097547'
  const agentPhoneFormatted = agentPhoneRaw.replace(/\D/g, '')
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${agentPhoneFormatted}&text=${encodeURIComponent(
    `Hello ${agent.name || 'Agent'}, I am interested in the ${listing.title} property located in ${location}.`
  )}`
  const telUrl = `tel:${agentPhoneFormatted}`

  const totalPackageCost = formatToHumanNumber(sumObjectValues(listing?.moveInCosts, 'amount')); 

  return (
    <BasicLayout
      title={listing.title}
      description={summary.slice(0, 140)}
      canonical={canonical}
      image={imageUrl}
      url={canonical}
      keywords={['listings', 'real estate', 'property', 'Wazz Realty']}
    >
      <section className="flex flex-col md:w-10/12 w-11/12">
        <div className="md:text-[3rem] text-[2rem] md:leading-12 leading-10 font-medium font-serif italic md:mb-10">
          <span className="px-1 text-[#666D80]">Listings</span>/ {listing.title}
        </div>
      </section>
      <Carousel images={listing.gallery?.map((item) => item.asset?.url).filter(Boolean) as string[] | undefined} />
      <section className="md:w-10/12 flex flex-col lg:flex-row md:gap-25 gap-5 md:pt-12 px-4 lg:px-0 md:-mt-10">
        <div className="lg:w-[60%] space-y-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm text-[#666D80] font-medium">{location}</div>
            <div className="flex flex-col gap-2 md:gap-4 font-serif font-medium italic text-4xl">
              <div className="leading-tight">{listing.title}</div>
              <div>
                {formatPrice(listing.price)} <span className="text-[#666D80]">Yearly</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-base leading-8 text-slate-600">
            {listing.description ? <PortableText value={listing.description} /> : 'Details for this property are coming soon.'}
          </div>

          <div className="mt-4 text-base leading-8 font-medium">
            Schedule a private viewing today to experience it for yourself.
          </div>

          <div className="flex flex-col w-full gap-6 font-medium">
            <div className="w-full">
              <div className="flex items-center space-x-2 px-5 py-2 bg-[#F6F8FA] max-w-max">
                <MdOutlineStar />
                <div className="text-sm font-medium">Features</div>
              </div>
              <div className="flex flex-row flex-wrap md:gap-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                <span className="inline-flex items-center gap-2">
                  <MdBed className="text-[#36394A] text-lg" />
                  {listing.bedrooms} Bedrooms
                </span>
                <span className="inline-flex items-center gap-2">
                  <MdBathtub className="text-[#36394A] text-lg" />
                  {listing.baths} Baths
                </span>
                {listing.propertyFeatures && listing.propertyFeatures.length > 0 && listing.propertyFeatures.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.luxuryAmenities && listing.luxuryAmenities.length > 0 && listing.luxuryAmenities.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.specializedRooms && listing.specializedRooms.length > 0 && listing.specializedRooms.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getOtherFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.outdoorAmenities && listing.outdoorAmenities.length > 0 && listing.outdoorAmenities.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getOtherFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.coreInfrastructure && listing.coreInfrastructure.length > 0 && listing.coreInfrastructure.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getOtherFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.securityFeatures && listing.securityFeatures.length > 0 && listing.securityFeatures.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getFeatureTitle(featureKey)}
                    </span>
                  )
                })}
                {listing.ecoFeatures && listing.ecoFeatures.length > 0 && listing.ecoFeatures.map((feature) => {
                  const featureKey = feature.feature || ''
                  const iconName = featureKey as IconKey
                  const FeatureIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={featureKey || JSON.stringify(feature)} className="inline-flex items-center gap-2">
                      <FeatureIcon className="text-[#36394A] text-lg" />
                      {getOtherFeatureTitle(featureKey)}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center space-x-2 px-5 py-2 bg-[#F6F8FA] max-w-max">
                <MdFolderOpen className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Available Documents</div>
              </div>
              <div className="flex flex-row flex-wrap md:gap-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {listing.availableDocuments && listing.availableDocuments.length > 0 ? listing.availableDocuments.map((doc) => {
                  const docKey = doc.feature || ''
                  const iconName = docKey as IconKey
                  const DocumentIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={docKey || JSON.stringify(doc)} className="inline-flex items-center gap-2">
                      <DocumentIcon className="text-[#36394A] text-lg" />
                      {getDocumentTitle(docKey)}
                    </span>
                  )
                }): (<span className="text-[#666D80]">No documents available for this property.</span>)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col w-full gap-6 font-medium">
            <div className="w-full">
              <div className="flex items-center space-x-2 px-5 py-2 bg-[#F6F8FA] max-w-max">
                <MdBathroom />
                <div className="text-sm font-medium">Community & Lifestyle Amenities</div>
              </div>
              <div className="flex flex-row flex-wrap md:space-x-10 gap-5 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {listing.communityAmenities && listing.communityAmenities.length > 0 ? listing.communityAmenities.map((amenity) => {
                  const amenityKey = amenity.feature || ''
                  const iconName = amenityKey as IconKey
                  const AmenityIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={amenityKey || JSON.stringify(amenity)} className="inline-flex items-center gap-2">
                      <AmenityIcon className="text-[#36394A] text-lg" />
                      {getAmenityTitle(amenityKey)}
                    </span>
                  )
                }): (<span className="text-[#666D80]">No community & lifestyle amenities available for this property.</span>)}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center space-x-2 px-5 py-2 bg-[#F6F8FA] max-w-max">
                <MdError className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Key Property Details</div>
              </div>
              <div className="flex flex-row flex-wrap gap-10 w-full border border-[#F7F7F8] p-5 text-[#666D80]">
                {!listing.propertyRules && !listing.utilities && (<span className="text-[#666D80]">No key property details available for this property.</span>)}
                {listing.propertyRules && listing.propertyRules.length > 0 && listing.propertyRules.map((rule) => {
                  const ruleKey = rule.feature || ''
                  const iconName = ruleKey as IconKey
                  const RuleIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={ruleKey || JSON.stringify(rule)} className="inline-flex items-center gap-2">
                      <RuleIcon className="text-[#36394A] text-lg" />
                      {getPropertyRuleTitle(ruleKey)}
                    </span>
                  )
                })}
                {listing.utilities && listing.utilities.length > 0 && listing.utilities.map((utility) => {
                  const utilityKey = utility.feature || ''
                  const iconName = utilityKey as IconKey
                  const UtilityIcon = getIcon(iconName) || MdBed

                  return (
                    <span key={utilityKey || JSON.stringify(utility)} className="inline-flex items-center gap-2">
                      <UtilityIcon className="text-[#36394A] text-lg" />
                      {getUtilityTitle(utilityKey)}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center space-x-2 px-5 py-2 bg-[#F6F8FA] max-w-max">
                <MdReceipt className="text-[#36394A] text-lg" />
                <div className="text-sm font-medium">Move-In Cost Overview</div>
              </div>
              <div className="flex flex-col w-full gap-5 border border-[#F7F7F8] p-5 text-sm text-[#36394A]">
                <div className="flex flex-col w-full gap-2.5">
                  {listing.moveInCosts && listing.moveInCosts.length > 0 && listing.moveInCosts.map((cost) => (
                    <div key={cost.item} className="flex items-center ">
                      <div className="w-1/3">{cost.item}</div>
                      <div className="w-1/3 text-center">{cost.detail || '-'}</div>
                      <div className="w-1/3 text-right">{cost.amount ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(cost.amount) : '-'}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-300 pt-4 flex items-center justify-between w-full">
                  <div className="text-base font-semibold">Total :</div>
                  <div className="text-base font-semibold text-right">₦ {totalPackageCost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] space-y-6">
          <div className="bg-[#7D8B57] md:p-10 p-5">
            <div className="flex flex-col gap-7">
              <div className="flex flex-row items-center gap-4">
                <img src={'/assets/images/caller.png'} alt={agent.name || 'Agent'} className="h-20 w-20 rounded-full object-cover" />
                <div className="text-white">
                  <p className="text-base">{agent.name || 'Dami'}</p>
                  <p className="text-sm">Agent in charge</p>
                </div>
              </div>
              <div>
                <div className="text-sm text-white text-justify leading-5">
                  As your dedicated Wazz Realty advisor for this property, I am here to provide detailed information and guide you through every step of the process. My goal is to ensure your experience is seamless and informed.
                </div>
              </div>

              <div className="gap-2 flex flex-col">
                <a
                  href={telUrl}
                  className="flex items-center gap-[.2rem] outline-0"
                >
                  <div className="flex items-center gap-[.2rem] font-medium capitalize p-3 bg-white">
                    <MdOutlineCall size={22} className="mb-[-0.1rem]" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    {agent.phone || '+234 807 909 7547'}
                    <VscChevronRight size={14} />
                  </div>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[.2rem] outline-0"
                >
                  <div className="flex items-center gap-1 font-medium capitalize p-3 bg-white">
                    <IoLogoWhatsapp size={22} className="mb-[-0.1rem] text-[#58B04E]" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 capitalize px-6 py-[.77rem] text-sm bg-white justify-between font-medium">
                    Send {getFirstWord(agent.name) || 'Agent'} a Message
                    <VscChevronRight size={14} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="md:p-6 p-5">
            <p className="text-[2rem] italic font-medium font-serif">Schedule an Inspection</p>
            <form className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-700">Name</label>
                <input type="text" placeholder="Enter name" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" placeholder="Enter phone number" className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea rows={4} placeholder="Hello, I am interested in this property. Please let me know the best time for a viewing." className="w-full bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9]" />
              </div>
              <div className="flex items-center justify-end">
                <button className="text-sm inline-flex items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize">
                  Request Inspection
                  <FiChevronRight size={14} className="-mb-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <MoreListings listings={listings || []} />
      <section className="relative md:aspect-10/4 md:-mt-5 aspect-2/3 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block h-full w-full bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-about2.png')" }} aria-hidden="true" />
          <div className="block md:hidden h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/images/bg-mobile-about2.png')" }} aria-hidden="true" />
        </div>
      </section>
      <section className="flex md:flex-row flex-col md:items-center md:justify-center w-11/12 md:mt-20 mt-5 md:mb-35 mb-27 md:space-x-56 md:space-y-0 space-y-8">
        <div className="max-w-120 md:text-[3.5rem] text-5xl md:leading-[4.38rem] italic font-serif text-[#131313]">Start your property <br/> journey with us</div>
        <div>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-5 py-2 text-white transition hover:opacity-90 capitalize">
            Contact Us
            <FiChevronRight size={18} />
          </Link>
        </div>
      </section>
    </BasicLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listings = await sanityClient.fetch(`*[_type == "listing" && status == "active"]{ "slug": slug.current }`)

  return {
    paths: listings.map((listing: { slug: string }) => ({ params: { slug: listing.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const listing = await sanityClient.fetch(
    `*[_type == "listing" && status == "active" && slug.current == $slug][0]{
      title,
      slug,
      price,
      city,
      state,
      bedrooms,
      baths,
      propertyType,
      category,
      gallery[]{asset->{url}},
      description,
      propertyFeatures[]{feature},
      availableDocuments[]{feature},
      communityAmenities[]{feature},
      propertyRules[]{feature},
      moveInCosts,
      agent->{name, phone, photo{asset->{url}}, bio},
      _updatedAt
    }`,
    { slug }
  )

  if (!listing) {
    return { notFound: true }
  }

  const moreListings = await sanityClient.fetch(
    `*[_type == "listing" && status == "active" && slug.current != $slug]{
      title,
      slug,
      price,
      city,
      state,
      bedrooms,
      baths,
      gallery[0]{asset->{url}},
      _updatedAt
    } | order(_updatedAt desc)[0...4]`,
    { slug }
  )

  return {
    props: {
      listing,
      listings: moreListings,
    },
    revalidate: 60,
  }
}
