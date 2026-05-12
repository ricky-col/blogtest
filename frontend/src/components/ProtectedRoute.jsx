import { useAuth } from "../store/authStore"
import { useNavigate,Navigate } from "react-router"

function ProtectedRoute({children, allowedRoles}) {

    const {loading,currentUser,isAuthenticated}=useAuth()
    if(loading){
        return<p>Loading...</p>
    }
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    if(allowedRoles && !allowedRoles.includes(currentUser?.role)){
        return <Navigate to="/unauthorized" replace state={{redirectTo:'/'}}/>
    }
  return (children)
}

export default ProtectedRoute