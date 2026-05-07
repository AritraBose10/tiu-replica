import CrudPage from '../../components/admin/CrudPage';

const columns = [
 { key: 'name', label: 'Company Name' },
 { key: 'sort_order', label: 'Order' },
];

const fields = [
 { key: 'name', label: 'Company Name', type: 'text', required: true },
 { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminRecruiters() {
 return <CrudPage title="Top Recruiters" endpoint="/api/recruiters" columns={columns} fields={fields} />;
}
