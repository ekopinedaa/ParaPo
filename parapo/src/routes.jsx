import { createBrowserRouter } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import AccountingDashboard from './pages/AccountingDashboard';
import PasaheroDashboard from './pages/PasaheroDashboard';
import RiderDashboard from './pages/RiderDashboard';
import AdminDashboard from './pages/AdminDashboard';

const Routes = createBrowserRouter([
    { path: '/pineda', element: <Login/>},
    { path: '/', element: <Login/>},
    { path: '/signup', element: <Signup/>},
    { path: '/Accounting', element: <AccountingDashboard/>},
    { path: '/Pasahero', element: <PasaheroDashboard/>},
    { path: '/Rider', element: <RiderDashboard/>},
    { path: '/Admin', element: <AdminDashboard/>},
])

export default Routes