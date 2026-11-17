import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import Projects from "@/components/home/Projects";
import Gallery from "@/components/home/Gallery";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Projects />
      <Gallery />
      <Contact />
    </>
  );
}