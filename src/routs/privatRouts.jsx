import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";


export function PrivateRoute({ component: C, }) {
    const navigate = useNavigate();
   
    const isAuth = useSelector(state => state.auth.isAuth)
    // const isAuth=true
    return (<>

        {isAuth ? <C /> : navigate('/auth')}

    </>)
}