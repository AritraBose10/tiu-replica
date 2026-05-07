import CrudPage from '../../components/admin/CrudPage';

const columns = [
 { key: 'title', label: 'Title' },
 { key: 'date', label: 'Date' },
 { key: 'category', label: 'Category' },
 {
 key: 'status', label: 'Status', render: (v) => (
 <span style={{
 padding: '4px 10px',
 borderRadius: 6,
 fontSize: '0.75rem',
 fontWeight: 700,
 background: v === 'upcoming' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.05)',
 color: v === 'upcoming' ? '#00e676' : '#888',
 border: `1px solid ${v === 'upcoming' ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
 }}>
 {v === 'upcoming' ? 'Upcoming' : 'Past'}
 </span>
 )
 },
 {
 key: 'featured', label: 'Featured', render: (v) => v ? (
 <span style={{
 padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700,
 background: 'rgba(255, 0, 0, 0.1)', color: '#FF0000', border: '1px solid rgba(255, 0, 0, 0.2)'
 }}>Featured</span>
 ) : ''
 },
];

const fields = [
 { key: 'id', label: 'ID', type: 'text', required: true, placeholder: 'e.g. event-1' },
 { key: 'title', label: 'Title', type: 'text', required: true },
 { key: 'description', label: 'Description', type: 'textarea' },
 { key: 'image', label: 'Event Banner', type: 'image' },
 { key: 'date', label: 'Date', type: 'text', placeholder: 'March 15-17, 2026' },
 { key: 'time', label: 'Time', type: 'text', placeholder: '9:00 AM - 6:00 PM' },
 { key: 'location', label: 'Location', type: 'text' },
 { key: 'category', label: 'Category', type: 'select', options: ['Technical', 'Cultural', 'Workshop', 'Seminar', 'Sports', 'Past'] },
 { key: 'image', label: 'Image URL', type: 'text' },
 { key: 'attendees', label: 'Expected Attendees', type: 'number' },
 { key: 'featured', label: 'Featured (1 or 0)', type: 'number' },
 { key: 'status', label: 'Status', type: 'select', options: ['upcoming', 'past'] },
 { key: 'link', label: 'External Link', type: 'text' },
 { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AdminEvents() {
 return <CrudPage title="Events" endpoint="/api/events" columns={columns} fields={fields} idField="id" />;
}
