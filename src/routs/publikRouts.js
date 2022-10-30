import { Navigate } from "react-router"
import { useSelector } from "react-redux";
import {Router} from './routs';


export function PublicRoute({ component: C, }) {
    // const isAuth = useSelector(state => state.auth.isAuth)
    const isAuth = true
    return <>

        {isAuth ? <Navigate to={'/trendcrm/order'} /> : <C />}


    </>
}