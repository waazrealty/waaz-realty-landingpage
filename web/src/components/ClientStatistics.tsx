
export default function ClientStatistics() {
  return (
    <section
        className="w-full flex flex-col items-center justify-between md:space-y-12"
      >
      <div className="flex items-center md:gap-5 gap-3 md:text-[3.35rem] text-[2.5rem] text-center md:leading-16 leading-12 md:px-0 px-5 italic font-serif">
        The Waaz Realty Benchmark.
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:w-2/3 w-11/12">
        <div className="bg-[#F5F6EF] border border-[#D2D8BE] w-full flex flex-col py-20 space-y-8 items-center">
          <div className="text-[#515B3A] leading-30 md:text-9xl text-8xl">20</div>
          <div className="text-[#0D0D12] text-[1rem] font-medium">Properties Sold & Closed</div>
        </div>
        <div className="bg-[#F5F6EF] border border-[#D2D8BE] w-full flex flex-col py-20 space-y-8 items-center">
          <div className="text-[#515B3A] leading-30 md:text-9xl text-8xl">30</div>
          <div className="text-[#0D0D12] text-[1rem] font-medium">Premium Rentals Secured</div>
        </div>
        <div className="bg-[#F5F6EF] border border-[#D2D8BE] w-full flex flex-col py-20 space-y-8 items-center">
          <div className="text-[#515B3A] leading-30 md:text-9xl text-8xl">30</div>
          <div className="text-[#0D0D12] text-[1rem] font-medium">Client Journeys Guided</div>
        </div>
        <div className="bg-[#F5F6EF] border border-[#D2D8BE] w-full flex flex-col py-20 space-y-8 items-center">
          <div className="text-[#515B3A] leading-30 md:text-9xl text-8xl">30</div>
          <div className="text-[#0D0D12] text-[1rem] font-medium">Satisfied Clients</div>
        </div>
        <div className="bg-[#F5F6EF] border border-[#D2D8BE] w-full flex md:flex-row flex-col py-20 md:col-span-2 space-x-8 items-center justify-center">
          <div className="text-[#515B3A] md:text-9xl text-8xl">40%</div>
          <div className="text-[#0D0D12] text-[1rem] md:text-left text-center font-medium mt-10">Business from Client <br/> Referrals</div>
        </div>
      </section>
    </section>
    
  )
}
