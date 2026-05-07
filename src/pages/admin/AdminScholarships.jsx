import CrudPage from '../../components/admin/CrudPage';

const columns = [
 { key: 'title', label: 'Title' },
 { key: 'coverage_label', label: 'Coverage' },
 { key: 'criteria', label: 'Criteria' },
];

const fields = [
 { key: 'title', label: 'Scholarship Title', type: 'text', required: true },
 { key: 'coverage', label: 'Coverage %', type: 'number' },
 { key: 'coverage_label', label: 'Coverage Label', type: 'text', placeholder: 'Up to 100% Tuition' },
 { key: 'criteria', label: 'Criteria', type: 'textarea' },
 { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminScholarships() {
 return <CrudPage title="Scholarships" endpoint="/api/scholarships" columns={columns} fields={fields} />;
}
