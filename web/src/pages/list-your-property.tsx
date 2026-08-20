import ImageUploader from '@/components/ImageUploader';
import { BasicLayout } from '@/components/Layout/BasicLayout';
import SelectAltField from '@/components/SelectAlt';
import { validateEmail } from '@/lib/common';
import { useAlert } from '@/lib/notification/alertcontext';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { MdModeStandby, MdOutlineLocationOn } from 'react-icons/md';

// Options (unchanged)
const listingTypeOptions = ['For Rent', 'For Sale', 'Short-Let'];
const propertyTypeOptions = [
  'Fully Detached Duplex',
  'Semi Detached Duplex',
  'Terraced Duplex',
  'Blocks of Flats/Apartment',
  'Mini Flat',
  'Self Contain',
  'Office Space',
  'Retail Shop',
  'Vacant Land',
];

export default function ListYourProperty() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${siteUrl}/list-your-property`;
  const { addAlert } = useAlert();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    ownerType: '', // 'Property Owner' or 'Real Estate Agent'
    listingType: '',
    propertyType: '',
    address: '',
    expectedPrice: '',
    bedrooms: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to update a single field
  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Step validation ---
  const validateStep = (stepNumber: number): boolean => {
    const errors: string[] = [];

    if (stepNumber === 1) {
      // Step 1: personal details
      if (!formData.fullname.trim()) errors.push('Full name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      else if (!validateEmail(formData.email)) errors.push('Invalid email address');
      if (!formData.mobile.trim()) errors.push('Phone number is required');
      if (!formData.ownerType) errors.push('Please select whether you are the owner or an agent');
    } else if (stepNumber === 2) {
      // Step 2: property details
      if (!formData.listingType) errors.push('Listing type is required');
      if (!formData.propertyType) errors.push('Property type is required');
      if (!formData.address.trim()) errors.push('Location / Address is required');
      if (!formData.expectedPrice || Number(formData.expectedPrice) < 0)
        errors.push('Expected price must be a valid number >= 0');
    }
    // Step 3 has no required fields (images optional)

    if (errors.length > 0) {
      errors.forEach((msg) => addAlert({ message: msg, type: 'error' }));
      return false;
    }
    return true;
  };

  // --- Navigation handlers ---
  const goToNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const goToPrevStep = () => {
    setStep(step - 1);
  };

  // --- Submit handler (POST to /api/listing) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate step 3 (no required fields, but we still call to show any errors if any)
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // Build FormData for multipart upload (images)
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string);
    });
    // Append images
    images.forEach((file) => {
      payload.append('images', file);
    });

    try {
      const response = await fetch('/api/listing', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit listing');
      }

      // Reset form
      setFormData({
        fullname: '',
        email: '',
        mobile: '',
        ownerType: '',
        listingType: '',
        propertyType: '',
        address: '',
        expectedPrice: '',
        bedrooms: '',
      });
      setImages([]);
      setStep(1);
      addAlert({ message: 'Listing submitted successfully!', type: 'success' });
    } catch (error) {
      console.error(error);
      addAlert({
        message: error instanceof Error ? error.message : 'An error occurred',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Helper to get step title ---
  const getTitle = () => {
    switch (step) {
      case 1:
        return 'Your Details';
      case 2:
        return 'Property Details';
      case 3:
        return 'Upload Photos';
      default:
        return '';
    }
  };

  return (
    <BasicLayout
      title="List Your Property | Wazz Realty"
      description="Get in touch with Wazz Realty for property inquiries and support."
      canonical={canonical}
      url={canonical}
      image="/assets/contact-preview.png"
    >
      <section className="relative md:w-10/12 w-full">
        <div className="absolute inset-0">
          <div
            className="hidden md:block h-150 w-full bg-cover bg-center rounded-4xl"
            style={{ backgroundImage: "url('/assets/images/bg-listing.png')" }}
            aria-hidden="true"
          />
          <div
            className="block md:hidden h-160 w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/bg-listing.png')" }}
            aria-hidden="true"
          />
        </div>

        <div className="relative w-full flex flex-col items-center py-18 space-y-10">
          <div className="lg:text-[4.5rem] text-[3rem] font-serif text-center text-white italic md:leading-18 leading-13">
            List Your Property for Free
          </div>
          <div className="text-white lg:w-[40%] md:w-[70%] text-center text-base leading-7">
            Express your interest and let us market your property to thousands of active buyers and renters.
          </div>
        </div>

        <div className="relative mx-auto md:p-10 p-5 lg:w-[38%] md:w-10/12 w-11/12 bg-white md:rounded-4xl -mb-100">
          <p className="text-[2rem] italic font-medium font-serif">
            {step}. {getTitle()} {step ===3 && <span className="text-gray-500 text-lg">(Optional)</span>}
          </p>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="mt-6 space-y-6 font-medium">
              {/* Owner Type Selection */}
              <div>
                <label className="mb-2 block text-sm text-slate-700">I Am The ...</label>
                <div className="grid grid-cols-2 w-full gap-3">
                  {['Property Owner', 'Real Estate Agent'].map((type) => (
                    <div
                      key={type}
                      onClick={() => updateField('ownerType', type)}
                      className={`w-full flex flex-row gap-1 items-center px-2 py-3 md:text-sm text-xs outline-none transition rounded-lg cursor-pointer ${
                        formData.ownerType === type
                          ? 'bg-[#616D43] text-white'
                          : 'bg-[#ECEFF3] text-[#666D80]'
                      }`}
                    >
                      <MdModeStandby className={formData.ownerType === type ? 'text-white' : 'text-[#666D80]'} />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm text-slate-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullname}
                  onChange={(e) => updateField('fullname', e.target.value)}
                  className="w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.mobile}
                  onChange={(e) => updateField('mobile', e.target.value)}
                  className="w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg"
                />
              </div>

              <button
                onClick={goToNextStep}
                className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize w-full mt-10"
              >
                Next
                <FiChevronRight size={14} className="-mb-0.5" />
              </button>
            </div>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <div className="mt-6 space-y-6 font-medium">
              {/* Listing Type */}
              <div>
                <label className="mb-2 block text-sm text-slate-700">
                  Listing Type<span className="text-red-600">*</span>
                </label>
                <SelectAltField
                  recordList={listingTypeOptions}
                  value={formData.listingType}
                  onChangeText={(value) => updateField('listingType', value)}
                  placeholder="Select Listing Type"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 block text-sm text-slate-700">
                  Property Type<span className="text-red-600">*</span>
                </label>
                <SelectAltField
                  recordList={propertyTypeOptions}
                  value={formData.propertyType}
                  onChangeText={(value) => updateField('propertyType', value)}
                  placeholder="Select Property Type"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm text-slate-700">
                  Location / Address<span className="text-red-600">*</span>
                </label>
                <div className="flex flex-row items-center justify-between w-full bg-[#ECEFF3] px-4 py-3 rounded-lg">
                  <input
                    type="text"
                    placeholder="e.g. Phase 1, Lekki, Lagos"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full text-sm text-slate-900 outline-none transition focus:border-none focus:ring-2 focus:ring-[#E6ECD9]"
                  />
                  <MdOutlineLocationOn className="text-lg" />
                </div>
              </div>

              {/* Expected Price & Bedrooms */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 line-clamp-1">
                    Expected Price (₦)<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.expectedPrice}
                    onChange={(e) => updateField('expectedPrice', e.target.value)}
                    className="w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Bedrooms<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g 4"
                    value={formData.bedrooms}
                    onChange={(e) => updateField('bedrooms', e.target.value)}
                    className="w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full mt-10">
                <button
                  onClick={goToPrevStep}
                  className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:opacity-90 capitalize w-full"
                >
                  <FiChevronLeft size={14} className="-mb-0.5" />
                  Previous
                </button>
                <button
                  onClick={goToNextStep}
                  className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize w-full"
                >
                  Next
                  <FiChevronRight size={14} className="-mb-0.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Upload Photos */}
          {step === 3 && (
            <div className="mt-6 space-y-6 font-medium">
              <div className="mb-2 block text-sm text-slate-700">
                Properties with clear photos get listed faster. You can skip this and send photos later.
              </div>
              <ImageUploader
                selectedImageFiles={images}
                onImageChange={setImages}
                acceptTypes={['image/*']}
                maxFileSize={5 * 1024 * 1024}
                maxFiles={10}
              />

              {/* Navigation + Submit */}
              <div className="grid grid-cols-2 gap-3 w-full mt-10">
                <button
                  onClick={goToPrevStep}
                  className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:opacity-90 capitalize w-full"
                >
                  <FiChevronLeft size={14} className="-mb-0.5" />
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="text-sm text-center cursor-pointer flex justify-center items-center gap-2 rounded-full bg-[#616D43] px-6 py-3 text-white transition hover:opacity-90 capitalize w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  <FiChevronRight size={14} className="-mb-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="h-100"></section>
      <section className="relative md:aspect-video aspect-2/3 lg:w-10/12 w-full overflow-hidden mb-20">
        <div className="absolute inset-0 z-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/banner.svg')" }}
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-5">
          <div className="md:text-[3.5rem] text-5xl md:leading-[4.38rem] lg:w-[30%] italic font-serif text-[#131313] text-center">
            Ready to find a property of choice
          </div>
          <div className="text-[#666D80] lg:w-[28%] text-center text-[1rem] leading-7">
            Having trouble finding a property? We’ve got you covered. Reach out to our team to get it all sorted.
          </div>
          <div>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-[#616D43] px-5 py-2 text-white transition hover:opacity-90 capitalize"
            >
              View Listings
              <FiChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
}