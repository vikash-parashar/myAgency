import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";

// Sections are added one by one: services, work, pricing, process, quote form, FAQ, footer.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
