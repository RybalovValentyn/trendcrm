import {SignIn} from './components/signIn/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import {PublicRoute} from './routs/publikRouts';
import { Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import {PrivateRoute} from './routs/privatRouts';
import {Order} from './components/tableBody/pages/order/orders';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
import { currentThunk, getAllStatuses, getAllOrders, getSitysFromNp, getFilteredOrders,getRowsAfterAdd } from './redux/asyncThunc';
import {MiniDrawer} from './components/tableBody/navBar/navBar';
import { Preloader } from './components/preloader/preloader';
import { useCookies } from 'react-cookie';
import { CreateRows } from './components/tableBody/pages/orderCreate/order';
import {ErrorPage} from './components/errorPage/ErrorPage'
const Home = lazy(() => import("./components/tableBody/pages/home/home"));
const Users = lazy(() => import("./components/tableBody/pages/users/users"));
const Products = lazy(() => import("./components/tableBody/pages/products/products"));
const Delivery = lazy(() => import("./components/tableBody/pages/delivery/delivery"));
const Calls = lazy(() => import("./components/tableBody/pages/calls/calls"));
const Messages = lazy(() => import("./components/tableBody/pages/message/message"));
const Analytics = lazy(() => import("./components/tableBody/pages/analytics/analytics"));
const Settings = lazy(() => import("./components/tableBody/pages/settings/settings"));
const Faq = lazy(() => import("./components/tableBody/pages/faq/faq"));
const Purchasing = lazy(() => import("./components/tableBody/pages/purchasing/purchasing"));
const Help = lazy(() => import("./components/tableBody/pages/help/help"));

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hashKey = useSelector(state => state.auth.hashKey);
  const currentUser = useSelector(state => state.auth.id);
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isLoading = useSelector(state => state.auth.isLoading);
  const ontableLoad = useSelector(state => state.ordersAll.isLoading);
  const idRows = useSelector((state) => state.ordersAll.createRows?.id);
  const isAuth = useSelector(state => state.auth.isAuth)

  const [cookies, setCookie] = useCookies(['user_id=1']);
  

  useEffect(()=>{
    sessionStorage.setItem("selected", '');
if (location.pathname === '/trendcrm' && isAuth) {
  navigate('/trendcrm/orders')
}  else navigate('/auth')
   

  },[])  
 
  useEffect(() => {
    // console.log('currentThunk');
    if (hashKey) {
      dispatch(currentThunk());
    }
  }, [hashKey]);


  useEffect(() => {
      if (currentUser) {
        console.log('current user ');
        setCookie('user_id', '1', { path: '/' });
        handleReload()
    }
  }, [currentUser]);

  const handleReload =()=>{
    // console.log('reload');
    dispatch(getAllStatuses())
    if (filteredRows?.length > 0) {
      dispatch(getFilteredOrders())
    } else dispatch(getAllOrders())
  }


  const wildcards = [
    {id: 'homeBar', target: Home},
    {id: 'users', target: Users},
    {id: 'orders', target: Order},
    {id: 'products', target: Products},
    {id: 'delivery', target: Delivery},
    {id: 'calls', target: Calls},
    {id: 'message', target: Messages},
    {id: 'analytics', target: Analytics},
    {id: 'settings', target: Settings},
    {id: 'faq', target: Faq},
    {id: 'purchasing', target: Purchasing},
    {id: 'help', target: Help},
  ];

  return (
    
    <div >
      {isLoading && <Preloader/>}

        <Routes >      

                      <Route loader={<Preloader/>} errorElement={<ErrorPage/>}  path='/auth' element={<PublicRoute component={SignIn}  />}/>
                       <Route loader={<Preloader/>} errorElement={<ErrorPage/>} path='/trendcrm'  element={<PrivateRoute component={MiniDrawer} />}>
                           
                           {wildcards.map(e => (
                                  <Route 
                                    path={`${e.id}`}
                                    element={<PrivateRoute component={e.target}/>}
                                    key={`component_${e.id}`}
                                  />
                                ))}  
                         <Route path={'order'} element={<PrivateRoute component={CreateRows}/>}>
                             <Route path={':idRows'} element={<CreateRows/>} />
                         </Route>                        
                         

                    </Route>
                    <Route path="/trendcrm/order/*" element={<ErrorPage/>} />         
                    <Route path="*" element={<Preloader/>} />

      </Routes>

    </div>
  );
}

export default App;
