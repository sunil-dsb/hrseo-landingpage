import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FAQ from "@/components/sections/FAQ";
import GetStarted from "@/components/sections/GetStarted";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
