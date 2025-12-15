import React, { useState } from 'react';
import styles from './BlogSection.module.css';

const BlogSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const blogs = [
        {
            id: 1,
            title: "The Ultimate Guide to Kitten Naps",
            date: "Dec 15, 2025",
            category: "Lifestyle",
            image: "/cat-blog-1.png",
            link: "#"
        },
        {
            id: 2,
            title: "Street Style: Feline Fashion Trends",
            date: "Dec 14, 2025",
            category: "Fashion",
            image: "/cat-blog-2.png",
            link: "#"
        },
        {
            id: 3,
            title: "Why Cats Love Boxes More Than Beds",
            date: "Dec 13, 2025",
            category: "Psychology",
            image: "/cat-blog-3.png",
            link: "#"
        },
        {
            id: 4,
            title: "10 Purr-fect Toys for Active Cats",
            date: "Dec 12, 2025",
            category: "Review",
            image: "/cat-blog-4.png",
            link: "#"
        }
    ];

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
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Latest Blogs</h2>
                    <a href="#" className={styles.viewAllButton}>View blog</a>
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
                        <div className={styles.imageDisplayWrapper}>
                            <img src="/c2.png" alt="Featured" className={styles.featureImage} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
