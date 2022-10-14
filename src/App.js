import {AppBAr} from './components/appBar/AppBar';
import { Route, Routes } from 'react-router-dom';

import {TestRouterfirst} from './components/test1/test1';
import {TestRoutersecond}  from './components/test2/test2';
import{ ErrorPage} from './components/errorPage/ErrorPage';
import {SignIn} from './components/signIn/signIn';

function App() {
  return (
    <div >

<SignIn/>

      {/* <AppBAr/> */}


        {/* <Routes>
        <Route
            path='/'
            element={<AppBAr/>} 
          />
          <Route
            path='/test1'
            element={<TestRouterfirst />} 
          />

          <Route
            path='/test2'
            element={<TestRoutersecond />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes> */}

    </div>
  );
}

export default App;
