import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ParticleBackground from './components/Background/ParticleBackground';
import CursorTrail from './components/Cursor/CursorTrail';

function App() {
  return (
    <div className="app">
      <CursorTrail />
      <ParticleBackground />
      <Header />
      <Hero />
      {/* Components will go here */}
    </div>
  )
}

export default App
