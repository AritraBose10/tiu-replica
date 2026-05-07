import CrudPage from '../../components/admin/CrudPage';

const columns = [
 { key: 'title', label: 'Title' },
 { key: 'category', label: 'Category' },
 { key: 'description', label: 'Description' },
];

const fields = [
 { key: 'id', label: 'ID (slug)', type: 'text', required: true, placeholder: 'e.g. btech-cse-ai' },
 { key: 'title', label: 'Title', type: 'text', required: true },
 { key: 'description', label: 'Description', type: 'textarea' },
 { key: 'category', label: 'Category', type: 'select', options: ['School of Engineering & Technology', 'Information Technology & Applied Sciences', 'School of Business & Management', 'Creative Arts & Design', 'Health & Allied Sciences'] },
 { key: 'link', label: 'Link URL', type: 'text', placeholder: '#' },
 { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminCourses() {
 return <CrudPage title="Courses" endpoint="/api/courses" columns={columns} fields={fields} idField="id" />;
}
