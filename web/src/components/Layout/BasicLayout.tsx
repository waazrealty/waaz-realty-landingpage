import React from "react";
import Footer from "../Footer";
import SiteNav from "../SiteNav";
import Seo from "../Seo";
import SocialButton from "../SocialButton";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  canonical?: string;
  keywords?: string[];
}

export const BasicLayout = ({
  children,
  title,
  description,
  image,
  url,
  canonical,
  keywords,
}: LayoutProps) => {
  return (
    <>
      <Seo title={title} description={description} image={image} url={url} canonical={canonical} keywords={keywords} />
      <div className="min-h-screen w-full flex flex-col items-center-safe lg:space-y-10 bg-white relative">
        {/* Top navigation */}
        <SiteNav />
        {/* Main Content */}
        <main className="flex flex-col w-full items-center md:space-y-20 space-y-10 overflow-auto">{children}</main>
        <div className="z-50 fixed bottom-10 lg:right-10 right-3">
          <SocialButton socialType="whatsapp" textColor="white" bgColor="[#74C56B]" />
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};
