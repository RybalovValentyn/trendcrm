import { Navigate } from "react-router"
import { useSelector } from "react-redux";


export function PublicRoute({ component: C, }) {
    // const isAuth = useSelector(state => state.auth.isAuth)
    const isAuth = true
    return <>

        {isAuth ? <Navigate to={'/trendcrm'} /> : <C />}


    </>
}