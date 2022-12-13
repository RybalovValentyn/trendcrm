import {useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export function ErrorPage() {
        const navigate = useNavigate();

        navigate('/trendcrm/orders');

    return(
        <div style={{width: '100vw', height: '100vh', textAlign: 'center', marginTop: '10%'}}>
            <div style ={{fontSize: '200px', color: '#d0d0d0',}}>404</div>
            <NavLink style={{border: '1px solid #d0d0d0', padding: '10px', borderRadius: '8px'}} to="/trendcrm/orders">
                    Перейти на головну      
                </NavLink>
        </div>
        
    )
}