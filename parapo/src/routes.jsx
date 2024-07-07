import { createBrowserRouter } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import AccountingDashboard from './pages/AccountingDashboard';
import PasaheroDashboard from './pages/PasaheroDashboard';
import RiderDashboard from './pages/RiderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UpdateAccount from './pages/UpdateAccount';
import ViewUsers from './pages/ViewUsers';
import ViewRides from './pages/ViewRides'
import ViewTransactions from './pages/VIewTransactions';
import ViewRideRequests from './pages/ViewRideRequests';
 
const Routes = createBrowserRouter([
    { path: '/pineda', element: <Login/>},
    { path: '/', element: <Login/>},
    { path: '/signup', element: <Signup/>},
    { path: '/Accounting', element: <AccountingDashboard/>},
    { path: '/Pasahero', element: <PasaheroDashboard/>},
    { path: '/Rider', element: <RiderDashboard/>},
    { path: '/Admin', element: <AdminDashboard/>},
    { path: '/UpdateAccount', element: <UpdateAccount/>},
    { path: '/ViewUsers', element: <ViewUsers/>},
    { path: '/ViewRides', element: <ViewRides/>},
    { path: '/ViewTransactions', element: <ViewTransactions/>},
    { path: '/ViewRideRequests', element: <ViewRideRequests/>},
])

export default Routes