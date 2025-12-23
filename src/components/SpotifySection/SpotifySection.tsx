import React, { useState, useEffect, useRef } from 'react';
import styles from './SpotifySection.module.css';

const PLAYLISTS = [
    {
        id: '2uZFS0NuNYPSR0neKprFwU',
        title: 'V-Pop Favorites',
        description: 'Songs from 2022 and earlier. The nostalgic and gentle melodies help focus on work and study. A little peace amidst the chaos of life.',
    },
    {
        id: '0NtIFyq7ZFQtDvKDcDycHS',
        title: 'Top Melancholic J-Pop',
        description: 'Deep and sorrowful. Sad if you understand the lyrics, and even if you don\'t, the vibe is still sad :(',
    },
    {
        id: '6MlXr1lH5XtSVn7SECc68E',
        title: 'J-Pop Hits',
        description: 'Very J-Pop. And very J-Pop.',
    },
    {
        id: '2PynP8hcLDnj7JbLgixwbt',
        title: 'Long Cao',
        description: 'As the name suggests. Long Cao only :)',
    },
];

const SpotifySection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInteractive, setIsInteractive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to reset interactivity
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsInteractive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? PLAYLISTS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === PLAYLISTS.length - 1 ? 0 : prev + 1));
    };

    const currentPlaylist = PLAYLISTS[currentIndex];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>My Playlist</h2>
                </div>

                <div className={styles.contentWrapper}>
                    {/* Mascot Image */}
                    <img src="/c71.png" alt="" className={styles.mascot} />

                    {/* Left: Spotify Embed */}
                    <div
                        className={styles.embedContainer}
                        ref={containerRef}
                    >
                        {!isInteractive && (
                            <div
                                className={styles.overlay}
                                onClick={() => setIsInteractive(true)}
                                title="Click to interact with Spotify"
                            />
                        )}
                        <iframe
                            style={{ borderRadius: '12px', pointerEvents: isInteractive ? 'auto' : 'none' }}
                            src={`https://open.spotify.com/embed/playlist/${currentPlaylist.id}?utm_source=generator&theme=0`}
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            key={currentPlaylist.id} // Force re-render on change
                        ></iframe>
                    </div>

                    {/* Right: Info & Controls */}
                    <div className={styles.infoContainer}>
                        <div className={styles.infoContent}>
                            <h3 className={styles.playlistTitle}>{currentPlaylist.title}</h3>
                            <p className={styles.playlistDesc}>{currentPlaylist.description}</p>
                        </div>

                        <div className={styles.controls}>
                            <button onClick={handlePrev} className={styles.navButton} aria-label="Previous">
                                &lt;
                            </button>
                            <span className={styles.counter}>
                                {currentIndex + 1} / {PLAYLISTS.length}
                            </span>
                            <button onClick={handleNext} className={styles.navButton} aria-label="Next">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpotifySection;
