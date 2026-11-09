import Hero from "../components/Hero";
import Brands from "../components/Brands";
import Stats from "../components/Stats";
import Results from "../components/Results";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Instagram from "../components/Instagram";
import CareersBanner from "../components/CareersBanner";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Brands />
      <Stats />
      <Results />
      <Services />
      <Testimonials />
      <Faq />
      <Instagram />
      <CareersBanner />
      <Contact />
    </main>
  );
}
