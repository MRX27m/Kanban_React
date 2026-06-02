import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'
import { NavigationEnum } from '../../enum/enums'

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()
  return user ? <>{children}</> : <Navigate to={NavigationEnum.login} replace />
}
