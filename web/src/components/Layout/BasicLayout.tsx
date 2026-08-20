import React from "react";
import Footer from "../Footer";
import SiteNav from "../SiteNav";
import Seo from "../Seo";

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
      <div className="min-h-screen w-full flex flex-col items-center-safe lg:space-y-10 bg-white">
        {/* Top navigation */}
        <SiteNav />
        {/* Main Content */}
        <main className="flex flex-col w-full items-center space-y-10 overflow-auto">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};
