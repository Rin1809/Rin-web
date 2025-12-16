import React, { useState } from 'react';
import styles from './BlogSection.module.css';
import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';

const BlogSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const [isHovered, setIsHovered] = useState(false);

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
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Latest Blogs</h2>
                    <Link to="/blog" className={styles.viewAllButton}>View blog</Link>
                </div>

                <div className={styles.contentSplit}>
                    {/* Left Column: Blogs + Pagination */}
                    <div className={styles.leftColumn}>
                        <div className={styles.blogGrid}>
                            {currentBlogs.map((blog) => (
                                <div key={blog.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <img src={blog.image} alt={blog.title} className={styles.image} />
                                    </div>
                                    <div className={styles.content}>
                                        <h3 className={styles.title}>{blog.title}</h3>
                                        <div className={styles.meta}>
                                            <span className={styles.date}>{blog.date}</span>
                                            <span className={styles.category}>{blog.category}</span>
                                        </div>
                                        <a href={blog.link} className={styles.link}>Read blog &gt;</a>
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

                    {/* Right Column: Static Image */}
                    <div className={styles.rightColumn}>
                        <div
                            className={styles.imageDisplayWrapper}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                src="/c2.png"
                                alt="Featured Default"
                                className={`${styles.featureImage} ${styles.defaultImage}`}
                                style={{ opacity: isHovered ? 0 : 1 }}
                            />
                            <img
                                src="/c3.png"
                                alt="Featured Hover"
                                className={`${styles.featureImage} ${styles.hoverImage}`}
                                style={{ opacity: isHovered ? 1 : 0 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default BlogSection;
