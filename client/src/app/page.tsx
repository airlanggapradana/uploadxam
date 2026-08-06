import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Statistics from "@/components/landing-page/Statistics";
import BrandMarquee from "@/components/landing-page/BrandMarquee";
import ServicesGrid from "@/components/landing-page/ServicesGrid";
import SlidesSection from "@/components/landing-page/SlideSection";
import Preview from "@/components/landing-page/Preview";
import { SeoDirectory } from "@/components/landing-page/SeoDirectory";
import Teams from "@/components/landing-page/Teams";
import Contributions from "@/components/landing-page/Contributions";
import { Chatbot } from "@/components/Chatbot";

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <Statistics />
      <BrandMarquee />
      <ServicesGrid />
      <SlidesSection />
      <Preview />
      <SeoDirectory />
      <Teams />
      <Contributions />
      <Chatbot />
    </main>
  );
}
