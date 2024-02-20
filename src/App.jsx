import { Outlet, createBrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AllUsersTable from './components/common/AllUsersTable';
import DashboardBox from './components/Dashboard/DashboardBox';

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
  return (
    <div className>
      <Outlet />
    </div>
  );
}

export default App;