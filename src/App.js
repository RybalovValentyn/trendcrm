import {SignIn} from './components/signIn/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import {Router} from './routs/routs';
// import {PublicRoute} from './routs/publikRouts';
import { Route, Routes} from 'react-router-dom';
// import {PrivateRoute} from './routs/privatRouts';
import {Home} from './components/tableBody/pages/home/home';
import {Users} from './components/tableBody/pages/users/users';
import {Order} from './components/tableBody/pages/order/order';
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
import { currentThunk, getAllStatuses, getAllOrders, getSitysFromNp, getFilteredOrders } from './redux/asyncThunc';
import {MiniDrawer} from './components/tableBody/navBar/navBar';
import { Preloader } from './components/preloader/preloader';
import SimpleBackdrop from './components/preloader/globalPreloader';
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const hashKey = useSelector(state => state.auth.hashKey);
  const currentUser = useSelector(state => state.auth.id);
  // const isAuth = useSelector(state => state.auth.isAuth)
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuth === false) {
  //     navigate("/auth", { replace: true });
  //   } else if (isAuth === true) {
  //     navigate("/orders", { replace: true });
  //   } else navigate("/auth", { replace: true });
  // }, [isAuth]);



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

  return (
    <div >

        <Routes >
               {/* <Route path='/auth'  element={<SignIn/>}/>             */}
               <Route path='/' element={<MiniDrawer/>}> 
                          <Route path={Router.HOMEBAR} element={<Home/>} />
                          <Route path={Router.USERS} element={<Users />} />
                          <Route path={Router.ORDER} element={<Order/>} />
                          <Route path={Router.PRODUCTS} element={<Products />} />
                          <Route path={Router.DELIVERY} element={<Delivery />} />
                          <Route path={Router.CALLS} element={<Calls />} />
                          <Route path={Router.MESSAGE} element={<Messages />} />
                          <Route path={Router.ANALITICS} element={<Analytics />} />
                          <Route path={Router.SETTINGS} element={<Settings />} />
                          <Route path={Router.FAQ} element={<Faq />} />
                          <Route path={Router.PURCH} element={<Purchasing />} />
                          <Route path={Router.HELP} element={<Help />} />
                          {/* <Route path="*" element={<PublicRoute component={SignIn} />} /> */}
                </Route> 
      </Routes>

















       {/* <CssBaseline />
       <Suspense fallback={<Preloader />}>
        <Routes >
               <Route path='/'  element={<PublicRoute component={SignIn} />}/>
            
                  <Route path={Router.HOME} element={<PrivateRoute component={MiniDrawer} />}> 
                          <Route path={Router.HOMEBAR} element={<PrivateRoute component={Home}/>} />
                          <Route path={Router.USERS} element={<PrivateRoute component={Users} />} />
                          <Route path={Router.ORDER} element={<PrivateRoute component={Order} errorElement= {<SignIn />}/>} />
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
                    </Route> 
      </Routes>
      </Suspense> */}
    </div>
  );
}

export default App;
