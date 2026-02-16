import CrudPage from '../../components/admin/CrudPage';

const columns = [
    { key: 'name', label: 'Short Name' },
    { key: 'full_name', label: 'Full Name' },
    {
        key: 'logo',
        label: 'Logo',
        render: (val) => val && val.startsWith('http') ? (
            <img src={val} alt="" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4, background: '#fff' }} />
        ) : (
            <span>{val || '—'}</span>
        ),
    },
    { key: 'sort_order', label: 'Order' },
];

const fields = [
    { key: 'name', label: 'Short Name (e.g. UGC)', type: 'text', required: true },
    { key: 'full_name', label: 'Full Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description of the approval body' },
    { key: 'logo', label: 'Logo Image', type: 'image', placeholder: 'Upload logo...' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminApprovals() {
    return <CrudPage title="Approvals" endpoint="/api/approvals" columns={columns} fields={fields} />;
}
