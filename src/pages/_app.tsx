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
            <Link
  href={`https://www.domain.bf`}
  target={`_blank`}
>
  <Button variant={`outline`} size={`icon`} tapEnabled>
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 fill-primary`}
    >
      <title>Earth</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
      <path d="M12 4.5C10.34 4.5 9 5.84 9 7.5S10.34 10.5 12 10.5 15 9.16 15 7.5 13.66 4.5 12 4.5zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z" />
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
