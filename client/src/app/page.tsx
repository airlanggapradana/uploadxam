import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Preview from "@/components/landing-page/Preview";
import Contributions from "@/components/landing-page/Contributions";
import SlidesSection from "@/components/landing-page/SlideSection";
import { Chatbot } from "@/components/Chatbot";
import Statistics from "@/components/landing-page/Statistics";
import Teams from "@/components/landing-page/Teams";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Statistics />
      <SlidesSection />
      <Preview />
      <Teams />
      <Contributions />
      <Chatbot />
    </main>
  );
}
