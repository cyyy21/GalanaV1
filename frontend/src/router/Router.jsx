import {createBrowserRouter} from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Home from '../home/Home';

const router = createBrowserRouter([
    {
    path: '/',
element:<Register/>,
},
{
 path:'/login', 
 element : <Login /> 
},
{
    path:'/home',
    element:<Home />,
}

])

export default router;
