import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Testimonials from "@/components/landing-page/Testimonials";
import Preview from "@/components/landing-page/Preview";
import Contributions from "@/components/landing-page/Contributions";
import SlidesSection from "@/components/landing-page/SlideSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Testimonials />
      <SlidesSection />
      <Preview />
      <Contributions />
    </main>
  );
}
