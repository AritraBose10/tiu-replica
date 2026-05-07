import CrudPage from '../../components/admin/CrudPage';

const columns = [
 { key: 'question', label: 'Question' },
 { key: 'answer', label: 'Answer' },
 { key: 'sort_order', label: 'Order' },
];

const fields = [
 { key: 'question', label: 'Question', type: 'text', required: true },
 { key: 'answer', label: 'Answer', type: 'textarea', required: true },
 { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminFAQs() {
 return <CrudPage title="FAQs" endpoint="/api/faqs" columns={columns} fields={fields} />;
}
