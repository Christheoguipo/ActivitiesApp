import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useStore } from "../stores/store";

export default function RequireAuth() {

    const { userStore: { isUserLoggedIn } } = useStore();
    const location = useLocation();

    if (!isUserLoggedIn) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return <Outlet />;
}