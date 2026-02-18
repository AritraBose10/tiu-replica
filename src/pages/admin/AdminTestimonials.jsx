import CrudPage from '../../components/admin/CrudPage';

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'course', label: 'Course' },
    { key: 'company', label: 'Company' },
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
    { key: 'row_num', label: 'Row' },
];

const fields = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'course', label: 'Course / Batch', type: 'text' },
    { key: 'quote', label: 'Quote', type: 'textarea', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'image', label: 'Student Image', type: 'image' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'row_num', label: 'Display Row (1 or 2)', type: 'number' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminTestimonials() {
    return <CrudPage title="Testimonials" endpoint="/api/testimonials" columns={columns} fields={fields} />;
}
