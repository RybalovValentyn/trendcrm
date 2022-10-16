import {SignIn} from './components/signIn/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import {BodyContainer} from './components/bodyContainer/bodyContainer';

import {Crm} from './components/tableBody/crm/crm';
function App() {
  return (
    <div >
<CssBaseline />
<SignIn/>

<BodyContainer>
<Crm/>
</BodyContainer>
    </div>
  );
}

export default App;
