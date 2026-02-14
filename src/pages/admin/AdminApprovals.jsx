import CrudPage from '../../components/admin/CrudPage';

const columns = [
    { key: 'name', label: 'Short Name' },
    { key: 'full_name', label: 'Full Name' },
    { key: 'sort_order', label: 'Order' },
];

const fields = [
    { key: 'name', label: 'Short Name (e.g. UGC)', type: 'text', required: true },
    { key: 'full_name', label: 'Full Name', type: 'text', required: true },
    { key: 'logo', label: 'Logo character', type: 'text', placeholder: 'Unicode or symbol' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminApprovals() {
    return <CrudPage title="Approvals" endpoint="/api/approvals" columns={columns} fields={fields} />;
}
