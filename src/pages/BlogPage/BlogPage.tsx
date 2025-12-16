import React, { useEffect } from 'react';
import styles from './BlogPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { blogs } from '../../data/blogs';

const BlogPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>Blog</h1>
                </header>

                <article className={styles.featuredArticle}>
                    <div className={styles.videoHeader}>
                        <h2 className={styles.videoTitle}>| 17さいのうた。 / 『ユイカ』</h2>
                    </div>

                    <div className={styles.videoWrapper}>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/TLvMXOEXi_k"
                            title="Google Antigravity"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </article>

                <div className={styles.blogGrid}>
                    {blogs.map((blog) => (
                        <div key={blog.id} className={styles.blogCard}>
                            <div className={styles.cardImageWrapper}>
                                <img src={blog.image} alt={blog.title} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardDate}>{blog.date}</span>
                                    <span className={styles.cardCategory}>{blog.category}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{blog.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional content could go here */}
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;
