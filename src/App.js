import {SignIn} from './components/signIn/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import {Router} from './routs/routs';
import {PublicRoute} from './routs/publikRouts';
import { Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './routs/privatRouts';
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
import { currentThunk, getAllStatuses, getAllOrders, getSitysFromNp } from './redux/asyncThunc';
import {MiniDrawer} from './components/tableBody/navBar/navBar';
import { Preloader } from './components/preloader/preloader';
import SimpleBackdrop from './components/preloader/globalPreloader';

function App() {
  const dispatch = useDispatch();
  const hashKey = useSelector(state => state.auth.hashKey);
  const currentUser = useSelector(state => state.auth.id);

  useEffect(() => {
    if (hashKey) {
      dispatch(currentThunk());
    }
  }, [hashKey]);

  useEffect(() => {
      if (currentUser) {
        console.log('current user ');
        dispatch(getAllStatuses());
        dispatch(getAllOrders()); 
        dispatch(getSitysFromNp())     
    }
  }, [currentUser]);

  return (
    <div >
       <CssBaseline />
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
      </Suspense>
    </div>
  );
}

export default App;
