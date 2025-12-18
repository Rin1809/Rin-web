
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRawPlugin from 'rehype-raw';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './BlogPost.module.css';
import { blogs } from '../../data/blogs';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const blog = blogs.find(b => b.id === Number(id));

    useEffect(() => {
        if (blog?.contentPath) {
            fetch(blog.contentPath)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to load markdown");
                    return res.text();
                })
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [blog]);

    if (!blog) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Blog not found.</div>
                <Link to="/" className={styles.backLink}>&larr; Back to Home</Link>
            </div>
        );
    }

    if (loading) {
        return <div className={styles.container}><div className={styles.loading}>Loading...</div></div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <article className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{blog.title}</h1>
                    <div className={styles.meta}>
                        <span>{blog.date}</span>
                        <span>|</span>
                        <span>{blog.category}</span>
                    </div>
                </header>

                {blog.image && (
                    <img src={blog.image} alt={blog.imageCaption} className={styles.featuredImage} />
                )}

                <div className={styles.content}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRawPlugin]}
                        components={{
                            a: ({ node, href, children, ...props }) => {
                                const isVideo = href?.includes('user-attachments/assets') ||
                                    href?.match(/\.(mp4|webm|ogg)$/i);

                                if (isVideo) {
                                    return (
                                        <video controls style={{ maxWidth: '100%', borderRadius: '8px', margin: '24px 0', display: 'block' }}>
                                            <source src={href} />
                                            Your browser does not support the video tag.
                                        </video>
                                    );
                                }
                                return <a href={href} {...props}>{children}</a>;
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                <Link to="/" className={styles.backLink}>&larr; Back to Home</Link>
            </article>
            <Footer />
        </div>
    );
};

export default BlogPost;
