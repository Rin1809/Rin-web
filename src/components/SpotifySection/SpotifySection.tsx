import React, { useState } from 'react';
import styles from './SpotifySection.module.css';

const PLAYLISTS = [
    {
        id: '2uZFS0NuNYPSR0neKprFwU',
        title: 'Lofi Chill',
        description: 'Những giai điệu nhẹ nhàng giúp tập trung làm việc và học tập. Một chút bình yên giữa bộn bề cuộc sống.',
    },
    {
        id: '0NtIFyq7ZFQtDvKDcDycHS',
        title: 'Programming Focus',
        description: 'Nhạc không lời, beat mạnh mẽ để giữ vững flow code. Tăng sự tập trung tối đa.',
    },
    {
        id: '6MlXr1lH5XtSVn7SECc68E',
        title: 'Late Night Vibes',
        description: 'Dành cho những đêm thức trắng chạy deadline. Hơi buồn một chút, nhưng rất thấm.',
    },
    {
        id: '2PynP8hcLDnj7JbLgixwbt',
        title: 'Gaming Music',
        description: 'Năng lượng bùng nổ cho những trận game căng thẳng hoặc khi cần boost tinh thần.',
    },
];

const SpotifySection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <div className={styles.embedContainer}>
                        <iframe
                            style={{ borderRadius: '12px' }}
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
