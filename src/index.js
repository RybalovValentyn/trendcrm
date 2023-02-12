import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import App from './App';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import {Preloader} from './components/preloader/preloader';
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider} from 'notistack';
import {SnackbarCloseButton} from './components/alerts/clouse';
import { HashRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} loading={<Preloader/>} >
       <PersistGate persistor={persistor}>
       <HashRouter>
       <CookiesProvider>
           <SnackbarProvider maxSnack={8} preventDuplicate={true} action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey}
           disableWindowBlurListener={true} dense />}>
             <App /> 
           </SnackbarProvider>
         </CookiesProvider>
        </HashRouter>
       </PersistGate>
    </Provider>
  </React.StrictMode>
);



