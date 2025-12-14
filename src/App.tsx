import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ParticleBackground from './components/Background/ParticleBackground';

function App() {
  return (
    <div className="app">
      <ParticleBackground />
      <Header />
      <Hero />
      {/* Components will go here */}
    </div>
  )
}

export default App
