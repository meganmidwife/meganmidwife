import type { Metadata } from "next";

import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { createClient } from "@/prismicio";
//import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";
// import { NavBar } from "@/components/Navbar"
// import { Footer } from "@/components/Footer";

import { isFilled } from "@prismicio/client";
import NavBar from "@/components/Navbar2";






 export async function generateMetdata(): Promise<Metadata> {

   const client = createClient();

   const settings = await client.getSingle("settings");


   return {

     title: settings.data.site_title || "Megan Midwife",

     description:

       settings.data.meta_description ||

       "Megan Midwife - Compassionate and Personalised Midwifery Care",

     openGraph: {

       images: isFilled.image(settings.data.fallback_og_image)

         ? [settings.data.fallback_og_image.url]

         : ["/a1heading.svg"],

     },

   };

 }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>
      
        <body className="bg-neutral-900 text-white">
          <NavBar settings={settings} />
          
          <main className="">{children}</main>
          {/* <Footer /> */}
        </body>
        <PrismicPreview repositoryName={repositoryName} />
    </ViewTransitions>
  );
}