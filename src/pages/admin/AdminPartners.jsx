import CrudPage from '../../components/admin/CrudPage';

const columns = [
    { key: 'name', label: 'Name' },
    {
        key: 'logo_url', label: 'Logo', render: (v) => v ? (
            <img src={v} alt="" style={{ height: 24, maxWidth: 80, filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
        ) : '\u2013'
    },
    { key: 'sort_order', label: 'Order' },
];

const fields = [
    { key: 'name', label: 'Partner Name', type: 'text', required: true },
    { key: 'logo_url', label: 'Logo URL', type: 'image', required: true },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminPartners() {
    return <CrudPage title="Partners" endpoint="/api/partners" columns={columns} fields={fields} />;
}
