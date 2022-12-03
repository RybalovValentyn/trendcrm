import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import App from './App';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import {Preloader} from './components/preloader/preloader';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} loading={<Preloader/>} basename="/trendcrm" >
       {/* <PersistGate persistor={persistor} loading={Preloader}> */}
       <BrowserRouter>
         <App />
       </BrowserRouter>
       {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);



