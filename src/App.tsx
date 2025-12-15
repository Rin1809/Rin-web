import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import TechSwarm from './components/Background/TechSwarm';
import VideoSection from './components/VideoSection/VideoSection';
import FloatingIconsSection from './components/FloatingIconsSection/FloatingIconsSection';
import { useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <TechSwarm />
      <Header />
      <Hero />
      <VideoSection />
      <FloatingIconsSection />
      {/* Components will go here */}
    </div>
  )
}

export default App
