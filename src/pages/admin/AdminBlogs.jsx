import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';
import RichTextEditor from '../../components/admin/RichTextEditor';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft,
  FileText, Globe, Star, Tag, Clock, ChevronRight,
  Save, Send, Loader2, X, AlertCircle, CheckCircle, Upload
} from 'lucide-react';

// ─── helpers ─────────────────────────────────────────────────────────────────
const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const readingTime = (html) => {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
};

const CATEGORIES = ['General', 'AI & Tech', 'Career', 'Campus Life', 'Research', 'Industry', 'Tutorials'];

const emptyForm = {
  title: '', slug: '', excerpt: '', body: '', feature_image: '',
  category: 'General', tags: '', author: 'Editorial Team', author_role: '',
  meta_title: '', meta_description: '', schema_html: '',
  status: 'draft', featured: false, read_time: '', sort_order: 0,
};

// ─── Tag input ────────────────────────────────────────────────────────────────
function TagInput({ value, onChange }) {
  const [input, setInput] = useState('');
  const tags = Array.isArray(value) ? value : [];

  const add = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput('');
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 border border-red-600/30 text-red-400 text-xs rounded-full">
            {t}
            <button type="button" onClick={() => onChange(tags.filter(x => x !== t))}><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
          placeholder="Add tag, press Enter"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors">Add</button>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-medium transition-all ${
      type === 'success' ? 'bg-green-900/90 border-green-500/40 text-green-300' : 'bg-red-900/90 border-red-500/40 text-red-300'
    }`}>
      {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {msg}
    </div>
  );
}

// ─── Blog List ────────────────────────────────────────────────────────────────
function BlogList({ onNew, onEdit }) {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs?all=1', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch { showToast('Failed to load blogs', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;
    setDeleting(blog.id);
    try {
      await fetch('/api/blogs', { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id: blog.id }) });
      showToast('Blog deleted');
      load();
    } catch { showToast('Delete failed', 'error'); }
    setDeleting(null);
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div>
          <h1 className="admin-crud-title">Blogs</h1>
          <p className="admin-crud-subtitle">{blogs.length} article{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={onNew} className="admin-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-24 text-gray-600 bg-white/[0.02] border border-white/5 rounded-3xl p-8 max-w-lg mx-auto">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30 text-red-500 animate-pulse" />
          <p className="text-xl font-bold text-white mb-2">No articles written yet</p>
          <p className="text-sm text-gray-400 mb-6">Create and publish your first article on the TIU replica School of the Future website.</p>
          <button onClick={onNew} className="admin-btn-primary flex items-center gap-2 mx-auto shadow-lg shadow-red-600/25">
            <Plus className="w-4 h-4" /> Write Your First Post
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="font-medium text-white text-sm leading-tight">{b.title}</div>
                    <div className="text-gray-600 text-xs mt-0.5">/{b.slug}</div>
                  </td>
                  <td><span className="text-xs text-gray-400">{b.category}</span></td>
                  <td>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      b.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {b.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {b.status}
                    </span>
                  </td>
                  <td>{b.featured ? <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> : <span className="text-gray-700">—</span>}</td>
                  <td><span className="text-xs text-gray-500">{b.created_at?.split('T')[0] || '—'}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(b)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <a href={`/blog/${b.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors" title="Preview">
                        <Globe className="w-4 h-4" />
                      </a>
                      <button onClick={() => deleteBlog(b)} disabled={deleting === b.id} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                        {deleting === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Toast {...toast} />
    </div>
  );
}

// ─── Blog Editor ──────────────────────────────────────────────────────────────
function BlogEditor({ blog, onBack, onSaved }) {
  const { token } = useAuth();
  const isNew = !blog?.id;
  const [form, setForm] = useState(() => blog ? {
    ...emptyForm,
    ...blog,
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    featured: Boolean(blog.featured),
  } : { ...emptyForm, tags: [] });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Auto-slug from title (new posts only)
  useEffect(() => {
    if (isNew && form.title) set('slug', slugify(form.title));
  }, [form.title]);

  // Auto read-time from body
  useEffect(() => {
    if (form.body) set('read_time', readingTime(form.body));
  }, [form.body]);

  const save = async (publishStatus) => {
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    if (!form.slug.trim()) { showToast('Slug is required', 'error'); return; }
    setSaving(true);

    const payload = { ...form, status: publishStatus || form.status, tags: Array.isArray(form.tags) ? form.tags : [] };

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/blogs', {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast(isNew ? 'Blog created!' : 'Blog updated!');
      setTimeout(() => onSaved(), 1200);
    } catch (err) {
      showToast(err.message, 'error');
    }
    setSaving(false);
  };

  const inp = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors';
  const label = 'block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5';

  return (
    <div className="admin-crud">
      {/* Header */}
      <div className="admin-crud-header">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="admin-crud-title">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
            <p className="admin-crud-subtitle flex items-center gap-1.5 text-xs">
              <span className={`w-2 h-2 rounded-full ${form.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              {form.status}
              {form.read_time && <> · <Clock className="w-3 h-3" /> {form.read_time}</>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => save('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Draft
          </button>
          <button onClick={() => save('published')} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-2">
        {/* ── LEFT: Editor ── */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <textarea
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Blog Title / Headline"
              rows={2}
              className="w-full bg-transparent border-b border-white/10 focus:border-red-500/50 outline-none text-2xl md:text-3xl font-black text-white placeholder-gray-700 resize-none py-2 transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className={label}>Short Description (Excerpt)</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="A brief summary shown on the blog listing page..."
              rows={2}
              className={inp + ' resize-none'}
            />
          </div>

          {/* Feature Image */}
          <div>
            <label className={label}>Feature Image <span className="normal-case text-gray-600 font-normal">(paste URL or upload a file)</span></label>
            <div className="flex gap-2">
              <input
                value={form.feature_image}
                onChange={(e) => set('feature_image', e.target.value)}
                placeholder="https://... or select a file"
                className={inp + ' flex-1'}
              />
              <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg cursor-pointer text-sm font-semibold transition-colors whitespace-nowrap">
                <Upload className="w-4 h-4 text-red-500" />
                Upload File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const img = new Image();
                      img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 1200;
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > MAX_WIDTH) {
                          height = Math.round((height * MAX_WIDTH) / width);
                          width = MAX_WIDTH;
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Output as highly optimized compressed WebP
                        const compressedBase64 = canvas.toDataURL('image/webp', 0.82);
                        set('feature_image', compressedBase64);
                      };
                      img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </div>
            {form.feature_image && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-white/10 max-h-48 group/img">
                <img src={form.feature_image} alt="Feature" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => set('feature_image', '')}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Body editor */}
          <div>
            <label className={label}>Blog Content <span className="normal-case text-gray-600 font-normal">(use the toolbar to add images in-between content)</span></label>
            <RichTextEditor
              content={form.body}
              onChange={(html) => set('body', html)}
            />
          </div>

          {/* Schema HTML */}
          <div>
            <label className={label}><span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Schema / HTML Code</span></label>
            <textarea
              value={form.schema_html}
              onChange={(e) => set('schema_html', e.target.value)}
              placeholder={'<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article"\n}\n</script>'}
              rows={6}
              className={inp + ' resize-y font-mono text-xs'}
            />
          </div>
        </div>

        {/* ── RIGHT: Meta Sidebar ── */}
        <div className="space-y-4">
          {/* Status + Featured */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className={label + ' mb-0'}>Status</span>
              <div className="flex rounded-lg overflow-hidden border border-white/10">
                {['draft', 'published'].map((s) => (
                  <button key={s} type="button" onClick={() => set('status', s)}
                    className={`px-3 py-1.5 text-xs font-bold capitalize transition-colors ${form.status === s ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={label + ' mb-0'}>Featured Post</span>
              <button type="button" onClick={() => set('featured', !form.featured)}
                className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-red-600' : 'bg-white/10'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Slug */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <label className={label}><Globe className="w-3.5 h-3.5 inline mr-1" />URL Slug</label>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">/blog/</div>
            <input value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} placeholder="my-blog-post" className={inp} />
          </div>

          {/* Category */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <label className={label}>Category</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inp}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <label className={label}><Tag className="w-3.5 h-3.5 inline mr-1" />Tags</label>
            <TagInput value={form.tags} onChange={(t) => set('tags', t)} />
          </div>

          {/* Author */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <label className={label}>Author</label>
            <input value={form.author} onChange={(e) => set('author', e.target.value)} placeholder="Author Name" className={inp} />
            <input value={form.author_role} onChange={(e) => set('author_role', e.target.value)} placeholder="Author Role / Title" className={inp} />
          </div>

          {/* SEO */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <label className={label}>SEO</label>
            <div>
              <p className="text-xs text-gray-600 mb-1">Meta Title</p>
              <input value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} placeholder="Page title for search engines" className={inp} maxLength={70} />
              <p className={`text-xs mt-1 text-right ${form.meta_title.length > 60 ? 'text-yellow-500' : 'text-gray-700'}`}>{form.meta_title.length}/70</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Meta Description</p>
              <textarea value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} placeholder="Description for search snippets..." rows={3} className={inp + ' resize-none'} maxLength={160} />
              <p className={`text-xs mt-1 text-right ${form.meta_description.length > 145 ? 'text-yellow-500' : 'text-gray-700'}`}>{form.meta_description.length}/160</p>
            </div>
          </div>

          {/* Sort order */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <label className={label}>Sort Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} className={inp} />
          </div>
        </div>
      </div>

      <Toast {...toast} />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminBlogs() {
  const [view, setView] = useState('list'); // 'list' | 'new' | 'edit'
  const [editBlog, setEditBlog] = useState(null);

  const goEdit = (blog) => { setEditBlog(blog); setView('edit'); };
  const goNew = () => { setEditBlog(null); setView('new'); };
  const goList = () => { setEditBlog(null); setView('list'); };

  if (view === 'new') return <BlogEditor blog={null} onBack={goList} onSaved={goList} />;
  if (view === 'edit') return <BlogEditor blog={editBlog} onBack={goList} onSaved={goList} />;
  return <BlogList onNew={goNew} onEdit={goEdit} />;
}
