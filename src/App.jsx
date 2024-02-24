import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardBox from './components/Dashboard/DashboardBox';
import AllUsersTable from './components/User/AllUsersTable';
import CreateNewUser from './components/User/CreateNewUser';
import AuthService from './services/AuthService';
import { useEffect, useState } from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [
          {
            path: '/',
            element: <DashboardBox />,
          },
          {
            path: '/users',
            element: <AllUsersTable />,
          },
          {
            path: '/create-user',
            element: <CreateNewUser />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      { path: '/register', element: <Register /> },
    ],
  },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('admin_user') ? true : false
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('admin_user') ? true : false);

    if (!isLoggedIn) {
      console.log('isLoggedIn: ', isLoggedIn);
      console.log('location.pathname: ', location.pathname);
      if (location.pathname === '/register') {
        navigate('register');
      } else {
        navigate('login');
      }
    }
  }, []);

  return (
    <div className>
      <Outlet />
    </div>
  );
}

export default App;
