import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import { Search, Plus, Pencil, Trash2, Inbox, X, Check, AlertCircle } from 'lucide-react';

/**
 * Reusable CRUD admin page with premium UI.
 *
 * Props:
 *  - title: string
 *  - endpoint: string — API endpoint (e.g. '/api/courses')
 *  - columns: [{ key, label, render? }]
 *  - fields: [{ key, label, type, placeholder?, required?, options? }]
 *  - idField: string (default 'id')
 *  - generateId?: (formData) => string
 */
export default function CrudPage({ title, endpoint, columns, fields, idField = 'id', generateId }) {
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const fetchItems = useCallback(async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) setItems(await res.json());
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    const openAdd = () => {
        setEditItem(null);
        const initial = {};
        fields.forEach(f => { initial[f.key] = f.type === 'number' ? 0 : ''; });
        setFormData(initial);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditItem(item);
        const data = {};
        fields.forEach(f => { data[f.key] = item[f.key] ?? ''; });
        data[idField] = item[idField];
        setFormData(data);
        setModalOpen(true);
    };

    const handleDelete = async (item) => {
        if (!confirm(`Delete "${item[columns[0]?.key] || item[idField]}"?`)) return;
        try {
            await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ [idField]: item[idField] }),
            });
            showToast('Deleted successfully');
            fetchItems();
        } catch {
            showToast('Delete failed', 'error');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const body = { ...formData };
            if (!editItem && generateId) {
                body[idField] = generateId(body);
            }
            const method = editItem ? 'PUT' : 'POST';
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error('Save failed');
            showToast(editItem ? 'Updated successfully' : 'Created successfully');
            setModalOpen(false);
            fetchItems();
        } catch (err) {
            showToast(err.message || 'Save failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    const filtered = items.filter(item =>
        !search || columns.some(c =>
            String(item[c.key] || '').toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="admin-content-page">
            <div className="admin-page-header">
                <h1>{title}</h1>
                <p>{items.length} items total</p>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-wrap">
                    <Search />
                    <input
                        type="text"
                        className="admin-search"
                        placeholder={`Search ${title.toLowerCase()}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button onClick={openAdd} className="admin-add-btn">
                    <Plus style={{ width: 18, height: 18 }} />
                    Add New
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                    <div className="admin-spinner" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="admin-empty">
                    <div className="admin-empty-icon">
                        <Inbox />
                    </div>
                    <p>{search ? 'No items match your search' : `No ${title.toLowerCase()} yet. Click "Add New" to create one.`}</p>
                </div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item, idx) => (
                                <tr key={item[idField] || idx}>
                                    {columns.map(c => (
                                        <td key={c.key}>
                                            {c.render ? c.render(item[c.key], item) : (String(item[c.key] || '').slice(0, 80))}
                                        </td>
                                    ))}
                                    <td>
                                        <div className="admin-table-actions">
                                            <button className="admin-btn-edit" onClick={() => openEdit(item)}>
                                                <Pencil style={{ width: 14, height: 14 }} /> Edit
                                            </button>
                                            <button className="admin-btn-delete" onClick={() => handleDelete(item)}>
                                                <Trash2 style={{ width: 14, height: 14 }} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2>{editItem ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}</h2>
                            <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                                <X style={{ width: 18, height: 18 }} />
                            </button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="admin-modal-body">
                                {fields.map(f => (
                                    <div className="admin-input-group" key={f.key}>
                                        <label>{f.label}</label>
                                        {f.type === 'textarea' ? (
                                            <textarea
                                                value={formData[f.key] || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                placeholder={f.placeholder || ''}
                                                required={f.required}
                                            />
                                        ) : f.type === 'select' ? (
                                            <select
                                                value={formData[f.key] || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                required={f.required}
                                            >
                                                <option value="">Select...</option>
                                                {(f.options || []).map(o => (
                                                    <option key={o} value={o}>{o}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={f.type || 'text'}
                                                value={formData[f.key] ?? ''}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value
                                                }))}
                                                placeholder={f.placeholder || ''}
                                                required={f.required}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="admin-btn-save" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`admin-toast ${toast.type}`}>
                    {toast.type === 'success' ? <Check style={{ width: 18, height: 18 }} /> : <AlertCircle style={{ width: 18, height: 18 }} />}
                    {toast.message}
                </div>
            )}
        </div>
    );
}
