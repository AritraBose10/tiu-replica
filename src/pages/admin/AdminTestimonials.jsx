import CrudPage from '../../components/admin/CrudPage';

const columns = [
    {
        key: 'image',
        label: 'Photo',
        render: (v) => v ? (
            <img
                src={v}
                alt="student"
                style={{
                    width: 40, height: 40, borderRadius: '50%', objectFit: 'cover',
                    border: '2px solid rgba(255,0,0,0.3)', background: '#111'
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        ) : (
            <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,0,0,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 16
            }}>👤</div>
        )
    },
    { key: 'name', label: 'Name' },
    { key: 'course', label: 'Course / Batch' },
    {
        key: 'quote',
        label: 'Quote (preview)',
        render: (v) => (
            <span style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>
                "{String(v || '').slice(0, 80)}{v && v.length > 80 ? '…' : ''}"
            </span>
        )
    },
    {
        key: 'rating', label: 'Rating', render: (v) => (
            <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i <= (v || 5) ? '#FF0000' : 'rgba(255,255,255,0.1)'
                    }} />
                ))}
            </div>
        )
    },
    { key: 'sort_order', label: 'Order' },
];

const fields = [
    { key: 'name', label: 'Student Name', type: 'text', required: true, placeholder: 'e.g. Anushka Mondal' },
    { key: 'course', label: 'Course & Batch', type: 'text', placeholder: 'e.g. B.Tech CSE (Data Science) — Batch 2024–2028' },
    { key: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true, placeholder: 'What does this student say about SoF?' },
    { key: 'rating', label: 'Rating (1–5)', type: 'number' },
    {
        key: 'image',
        label: 'Student Photo',
        type: 'image_combined',
        placeholder: 'Paste a URL or Google Drive link…'
    },
    { key: 'company', label: 'Label / Company (e.g. School of the Future)', type: 'text' },
    { key: 'row_num', label: 'Display Row (1, 2 or 3)', type: 'number' },
    { key: 'sort_order', label: 'Sort Order (lower = first)', type: 'number' },
];

export default function AdminTestimonials() {
    return <CrudPage title="Testimonials" endpoint="/api/testimonials" columns={columns} fields={fields} />;
}
