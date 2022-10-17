import { Navigate } from "react-router";
import { useSelector } from "react-redux";


export function PrivateRoute({ component: C, }) {
    // const isAuth = useSelector(state => state.auth.isAuth)
    const isAuth = true
    return (<>

        {isAuth ? <C /> : <Navigate to='/' />}

    </>)
}