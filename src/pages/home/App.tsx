import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoShowcase from './components/DemoShowcase';
import ComoFunciona from './components/ComoFunciona';
import Planes from './components/Planes';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import CTAFinal from './components/CTAFinal';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <Navbar />

      <main>
        <div id="hero-section">
          <Hero />
        </div>
        <DemoShowcase />
        <ComoFunciona />
        <Planes />
        <SocialProof />
        <FAQ />
        <CTAFinal />
      </main>

      <FloatingCTA />
    </div>
  );
}
