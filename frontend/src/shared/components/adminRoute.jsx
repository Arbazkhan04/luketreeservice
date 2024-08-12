import AdminDashboard from '../../admin/components/dashboard'
import About from '../../admin/components/about'
import EditReview from '../../admin/components/editReview'

const route = [
    { path: '/admin/reviews', element: <AdminDashboard /> },
    { path:'/admin/about',element:<About />},
    { path:'/admin/edit/review/:reviewId',element:<EditReview />}
]

export default route