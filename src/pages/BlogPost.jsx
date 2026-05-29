import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Tag, ArrowLeft, Calendar, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`);
        if (res.status === 404) { setNotFound(true); return; }
        const data = await res.json();
        setBlog(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading article...</p>
      </div>
    </div>
  );

  if (notFound || !blog) return (
    <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-black text-white">Article Not Found</h1>
      <p className="text-gray-500">This blog post doesn't exist or has been removed.</p>
      <Link to="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blogs
      </Link>
    </div>
  );

  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  const metaTitle = blog.meta_title || blog.title;
  const metaDesc = blog.meta_description || blog.excerpt || '';

  // Parse schema_html for SchemaInjector
  let parsedSchema = null;
  if (blog.schema_html) {
    try {
      const match = blog.schema_html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (match) parsedSchema = JSON.parse(match[1]);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-red-600 selection:text-white">
      <SEO title={metaTitle} description={metaDesc} />
      {parsedSchema && <SchemaInjector schema={parsedSchema} />}

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-64 bg-red-600/5 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors text-sm mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>
          </motion.div>

          {/* Category */}
          {blog.category && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="inline-block text-xs font-black uppercase tracking-widest text-red-400 bg-red-600/10 border border-red-600/20 px-4 py-1.5 rounded-full mb-5">
              {blog.category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-red-600/40 pl-5">
              {blog.excerpt}
            </motion.p>
          )}

          {/* Meta bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-8 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(blog.author || 'E')[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{blog.author || 'Editorial Team'}</p>
                {blog.author_role && <p className="text-gray-600 text-xs">{blog.author_role}</p>}
              </div>
            </div>
            {blog.created_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {blog.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {blog.read_time}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Feature Image — appears just after title */}
      {blog.feature_image && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto px-4 mb-12">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={blog.feature_image} alt={blog.title} className="w-full h-auto max-h-[520px] object-cover" />
          </div>
        </motion.div>
      )}

      {/* Body Content */}
      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto px-4 pb-16">
        <div
          className="blog-body prose-content"
          dangerouslySetInnerHTML={{ __html: blog.body || '' }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-gray-600" />
              {tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back CTA */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <Link to="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors text-sm">
            Apply to TIU
          </Link>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;
