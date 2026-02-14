import CrudPage from '../../components/admin/CrudPage';

const columns = [
    { key: 'caption', label: 'Caption' },
    { key: 'category', label: 'Category' },
    {
        key: 'src', label: 'Preview', render: (v) => v ? (
            <img src={v} alt="" style={{ height: 40, borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)' }} />
        ) : '\u2013'
    },
    { key: 'span', label: 'Grid Span' },
];

const fields = [
    { key: 'src', label: 'Image URL', type: 'text', required: true },
    { key: 'alt', label: 'Alt Text', type: 'text' },
    { key: 'caption', label: 'Caption', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', options: ['Innovation Labs', 'AI Workshops', 'Hackathons', 'Study Tours', 'Startup Incubation'] },
    { key: 'span', label: 'Grid Span', type: 'select', options: ['col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-2', 'col-span-2 row-span-1'] },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminGallery() {
    return <CrudPage title="Gallery" endpoint="/api/gallery" columns={columns} fields={fields} />;
}
