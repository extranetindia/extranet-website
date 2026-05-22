import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Features } from "@/components/Features";
import { LoginSection } from "@/components/LoginSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <DashboardPreview />
        <Features />
        <LoginSection />
      </main>
      <Footer />
    </>
  );
}
