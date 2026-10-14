import useAuthStore from '@/store/authStore'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const user = useAuthStore(state => state.user);
  console.log(user)
  if (!user) return <Navigate to={'/'} replace />
  if (user) return <Outlet />
}

export default ProtectedRoutes