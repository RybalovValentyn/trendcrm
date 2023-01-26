import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import App from './App';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import {Preloader} from './components/preloader/preloader';
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider} from 'notistack';
import {SnackbarCloseButton} from './components/alerts/clouse';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} loading={<Preloader/>} basename="/trendcrm" >
       <PersistGate persistor={persistor}>
       <BrowserRouter>
       <CookiesProvider>
           <SnackbarProvider maxSnack={8} preventDuplicate={true} action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey}
           disableWindowBlurListener={true} dense />}>
             <App /> 
           </SnackbarProvider>
         </CookiesProvider>
       </BrowserRouter>
       </PersistGate>
    </Provider>
  </React.StrictMode>
);



