import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';


export function PrivateRoute({ component: C, }) {
    const navigate = useNavigate();
   
    const isAuth = useSelector(state => state.auth.isAuth);
    const [auth, setAuth] = useState(false)
    // const auth = true

    useEffect(() => {
        if (isAuth) {
            setAuth(true)
        } else navigate('/auth')
   
      }, [isAuth]);
    // console.log(isAuth);

    return (<>

        {auth &&  <C />}

    </>)
}