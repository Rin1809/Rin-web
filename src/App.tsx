import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import TechSwarm from './components/Background/TechSwarm';
import VideoSection from './components/VideoSection/VideoSection';

function App() {
  return (
    <div className="app">
      <TechSwarm />
      <Header />
      <Hero />
      <VideoSection />
      {/* Components will go here */}
    </div>
  )
}

export default App
