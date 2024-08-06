import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-switch";
import { strEnv } from "@/lib/env";
import { inter } from "@/lib/global";

const siteTitle = strEnv("NEXT_PUBLIC_SITE_TITLE", "Whois");
const siteDescription = strEnv(
  "NEXT_PUBLIC_SITE_DESCRIPTION",
  "Whois Lookup Tool, Support Domain/IPv4/IPv6/ASN/CIDR Whois Lookup, Provided Beautiful, Clean and Simple UI."
);
const siteKeywords = strEnv(
  "NEXT_PUBLIC_SITE_KEYWORDS",
  "Whois, Lookup, Tool, whois"
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={cn(`relative w-full h-full`, inter.className)}>
          <div
            className={cn(
              `absolute top-4 right-4 flex flex-row items-center z-50 space-x-2`
            )}
          >
            <ThemeToggle />
            <Link href="https://www.atomao.com" target="_blank">
              <Button variant="outline" size="icon" tapEnabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64h-185.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.3c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64h-123.1c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32h-116.7c-10-63.9-29.8-117.4-55.3-151.6 78.3 20.7 142 77.5 171.9 151.6zm-149.1 0h-176.6c6.1-36.4 15.5-68.6 27-94.7 10.5-23.6 22.2-40.7 .5-51.5 11.2-10.6 20.5-13.8 27.8-13.8s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5 11.6 26 20.9 58.2 27 94.7zm-209 0h-116.7c-30 74.1-93.6 130.9-171.9 151.6 25.5-34.2 45.2-87.7 55.3-151.6h116.7zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6 25.5-34.2 45.2-87.7 55.3-151.6h116.7zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6h176.6c-6.1 36.4-15.5 68.6-27 94.6-10.5 23.6-22.2 40.7-33.5 51.5-11.2 10.6-20.5 13.8-27.8 13.8s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5z"/>
                </svg>
              </Button>
            </Link>
          </div>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}
