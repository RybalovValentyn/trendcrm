import {SignIn} from './components/signIn/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import {Router} from './routs/routs';
import {PublicRoute} from './routs/publikRouts';
import { Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './routs/privatRouts';
import {Home} from './components/tableBody/pages/home/home';
import {Users} from './components/tableBody/pages/users/users';
import {Order} from './components/tableBody/pages/order/orders';
import {Products} from './components/tableBody/pages/products/products';
import {Delivery} from './components/tableBody/pages/delivery/delivery';
import {Calls} from './components/tableBody/pages/calls/calls';
import {Messages} from './components/tableBody/pages/message/message';
import {Analytics} from './components/tableBody/pages/analytics/analytics';
import {Settings} from './components/tableBody/pages/settings/settings';
import {Faq} from './components/tableBody/pages/faq/faq';
import {Purchasing} from './components/tableBody/pages/purchasing/purchasing';
import {Help} from './components/tableBody/pages/help/help';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Suspense } from 'react';
import { currentThunk, getAllStatuses, getAllOrders, getSitysFromNp, getFilteredOrders,getRowsAfterAdd } from './redux/asyncThunc';
import {MiniDrawer} from './components/tableBody/navBar/navBar';
import { Preloader } from './components/preloader/preloader';
import { useCookies } from 'react-cookie';
import { CreateRows } from './components/tableBody/pages/orderCreate/order';


function App(history) {
  const dispatch = useDispatch();
  const hashKey = useSelector(state => state.auth.hashKey);
  const currentUser = useSelector(state => state.auth.id);
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isLoading = useSelector(state => state.auth.isLoading);
  const ontableLoad = useSelector(state => state.ordersAll.isLoading);
  const idRows = useSelector((state) => state.ordersAll.rowsToUpdate.id);
  

//   useEffect(() => {
// dispatch(getRowsAfterAdd())
// }, []);


  const [cookies, setCookie] = useCookies(['user_id=1']);
  setCookie('user_id', '1', { path: '/' });
  useEffect(() => {
    if (hashKey) {
      dispatch(currentThunk());
    }
  }, [hashKey]);

  useEffect(() => {
      if (currentUser) {
        console.log('current user ');
        handleReload()  
    }
  }, [currentUser]);

  const handleReload =()=>{
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
    {id: 'order', target: CreateRows},
  ];

  return (
    
    <div >
      {isLoading && <Preloader/>}

        <Routes >      

                      <Route loader={<Preloader/>} errorElement={<Preloader/>}  path='/auth' element={<PublicRoute component={SignIn}  />}/>
                       <Route loader={<Preloader/>} errorElement={<Preloader/>} path='/trendcrm'  element={<PrivateRoute component={MiniDrawer} />}> 
                           
                           {wildcards.map(e => (
                                  <Route loader={<Preloader/>}
                                    path={`${e.id}`}
                                    element={<PrivateRoute component={e.target}/>}
                                    key={`component_${e.id}`}
                                  />
                                ))}  
                    <Route path={idRows?`order/${idRows}`:'orders'} element={<PrivateRoute component={CreateRows} />} />   
                    </Route>         
                    <Route path="*" element={<Preloader/>} />
                  {/* <Route path='/trendcrm' element={<PrivateRoute component={MiniDrawer}/>}> 
                           <Route path='auth'  element={<PublicRoute component={SignIn} />}/>
                          <Route path={Router.HOMEBAR} element={<PrivateRoute component={Home}/>} />
                          <Route path={Router.USERS} element={<PrivateRoute component={Users} />} />
                          <Route path='orders' element={<Outlet component={Order} />} />
                          <Route path={Router.PRODUCTS} element={<PrivateRoute component={Products} />} />
                          <Route path={Router.DELIVERY} element={<PrivateRoute component={Delivery} />} />
                          <Route path={Router.CALLS} element={<PrivateRoute component={Calls} />} />
                          <Route path={Router.MESSAGE} element={<PrivateRoute component={Messages} />} />
                          <Route path={Router.ANALITICS} element={<PrivateRoute component={Analytics} />} />
                          <Route path={Router.SETTINGS} element={<PrivateRoute component={Settings} />} />
                          <Route path={Router.FAQ} element={<PrivateRoute component={Faq} />} />
                          <Route path={Router.PURCH} element={<PrivateRoute component={Purchasing} />} />
                          <Route path={Router.HELP} element={<PrivateRoute component={Help} />} />
                          <Route path="*" element={<PublicRoute component={SignIn} />} />
                    </Route>  */}
      </Routes>

    </div>
  );
}

export default App;
