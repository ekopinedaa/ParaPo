import { createBrowserRouter } from 'react-router-dom';
import Login from "./pages/Login";

const Routes = createBrowserRouter([
    { path: '/pineda', element: <Login/>},
    { path: '/', element: <Login/>},
])

export default Routes