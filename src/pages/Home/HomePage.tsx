import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import TechSwarm from '../../components/Background/TechSwarm';
import VideoSection from '../../components/VideoSection/VideoSection';
import FloatingIconsSection from '../../components/FloatingIconsSection/FloatingIconsSection';
import PjSection from '../../components/PjSection/PjSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import SpotifySection from '../../components/SpotifySection/SpotifySection';

import Footer from '../../components/Footer/Footer';

function HomePage() {
    return (
        <>
            <TechSwarm />
            <Header />
            <Hero />
            <VideoSection />
            <FloatingIconsSection />
            <PjSection />
            <SpotifySection />
            <BlogSection />

            <Footer />
        </>
    )
}

export default HomePage
