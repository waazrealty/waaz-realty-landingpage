import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BasicLayout } from "@/components/Layout/BasicLayout";

export default function Custom404() {
  const router = useRouter();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonical = `${siteUrl}/404`

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <BasicLayout title="Page Not Found — Redirecting... | Waaz Realty" description="Landmarks of Our Clients' Success." canonical={canonical} url={canonical} image="/assets/portfolio-preview.png">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-semibold mb-4">404 — Page Not Found</h1>
        <p className="text-lg leading-8 mb-6">
          The page you&apos;re looking for does not exist. Redirecting you back to the homepage.
        </p>
        <p className="text-sm text-slate-300">If the redirect does not happen, use the home link.</p>
      </div>
    </BasicLayout>
  );
}
