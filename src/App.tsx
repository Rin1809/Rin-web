import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import HomePage from './pages/Home/HomePage';
import BlogPage from './pages/BlogPage/BlogPage';
import BlogPost from './pages/BlogPost/BlogPost';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ProjectDocsPage from './pages/ProjectDocsPage/ProjectDocsPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cong thuc toan hoc nhuc dau de lam muot scroll
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(newLenis);

    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop lenis={lenis} />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/docs/:id" element={<ProjectDocsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
