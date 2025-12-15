import React from 'react';
import styles from './BlogSection.module.css';

const BlogSection: React.FC = () => {
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
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Latest Blogs</h2>
                    <a href="#" className={styles.viewAllButton}>View blog</a>
                </div>

                <div className={styles.grid}>
                    {blogs.map((blog) => (
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

                <div className={styles.footer}>
                    <button className={styles.paginationButton}>&lt;</button>
                    <button className={styles.paginationButton}>&gt;</button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
