import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import TechSwarm from '../../components/Background/TechSwarm';
import VideoSection from '../../components/VideoSection/VideoSection';
import FloatingIconsSection from '../../components/FloatingIconsSection/FloatingIconsSection';
import PjSection from '../../components/PjSection/PjSection';
import GithubStatsSection from '../../components/GithubStatsSection/GithubStatsSection';
import BlogSection from '../../components/BlogSection/BlogSection';
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
            <BlogSection />
            <GithubStatsSection />
            <Footer />
        </>
    )
}

export default HomePage
