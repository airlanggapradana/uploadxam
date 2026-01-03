import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Testimonials from "@/components/landing-page/Testimonials";
import Preview from "@/components/landing-page/Preview";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Testimonials />
      <Preview />
    </main>
  );
}
