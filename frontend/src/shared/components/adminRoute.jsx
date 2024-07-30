import AdminDashboard from '../../admin/components/dashboard'
import About from '../../admin/components/about'

const route = [
    { path: 'admin/dashboard', element: <AdminDashboard /> },
    { path:'/admin/about',element:<About />}
]

export default route