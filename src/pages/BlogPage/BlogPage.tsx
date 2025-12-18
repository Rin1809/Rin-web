import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { blogs } from '../../data/blogs';

const BlogPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [videoInteracting, setVideoInteracting] = useState(false);
    const itemsPerPage = 2;

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

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

                    <div
                        className={styles.videoWrapper}
                        onMouseLeave={() => setVideoInteracting(false)}
                        onClick={() => setVideoInteracting(true)}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/TLvMXOEXi_k"
                            title="Google Antigravity"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ pointerEvents: videoInteracting ? 'auto' : 'none' }}
                        ></iframe>
                    </div>
                </article>

                {/* Latest Blogs Section */}
                <div className={styles.latestSection}>
                    <h2 className={styles.sectionTitle}>Latest Blogs</h2>

                    <div className={styles.tabs}>
                        <span className={`${styles.tab} ${styles.activeTab}`}>All</span>
                        <span className={styles.tab}>Product</span>
                    </div>

                    <div className={styles.blogList}>
                        {currentBlogs.map((blog) => (
                            <div key={blog.id} className={styles.blogItem}>
                                <div className={styles.itemContent}>
                                    <h3 className={styles.itemTitle}>{blog.title}</h3>
                                    <div className={styles.itemMeta}>
                                        <span className={styles.itemDate}>{blog.date}</span>
                                        <span className={styles.itemCategory}>{blog.category}</span>
                                        <Link to={`/blog/${blog.id}`} className={styles.readMore}>Read &gt;</Link>
                                    </div>
                                    <p className={styles.itemDescription}>{blog.description}</p>
                                </div>
                                <div className={styles.itemImageWrapper}>
                                    <div className={styles.polaroidFrame}>
                                        <img src={blog.image} alt={blog.title} className={styles.itemImage} />
                                        {blog.imageCaption && <span className={styles.imageCaption}>{blog.imageCaption}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.paginationFooter}>
                        <button
                            className={styles.paginationButton}
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <button
                            className={styles.paginationButton}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* Additional content could go here */}
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;
