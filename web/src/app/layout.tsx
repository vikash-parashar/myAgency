import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/lib/site";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description:
    "Websites, Android and iPhone apps, Google Business listings, SEO and Google/Facebook ads for shops, restaurants and service businesses. Clear prices, live in weeks.",
  openGraph: { title: site.name, description: site.tagline, type: "website" },
};

export const viewport: Viewport = { themeColor: "#07070B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
