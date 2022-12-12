import {useState, Fragment, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {colorsRef} from '../../consts/colorConstants';
import { useDispatch, useSelector,  } from 'react-redux';
import {getAdressFromNp } from '../../redux/asyncThunc';
import {getFormTable} from '../../redux/ordersReduser';

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  
  export function SearchInputAdress() {
    const dispatch = useDispatch();
    const sityValue = useSelector((state) => state.ordersAll.createRows.warehouse_city);    
    const deliveryAddress = useSelector((state) => state.ordersAll.adressNewPost);
    const adressValue = useSelector((state) => state.ordersAll.createRows.warehouse_address); 
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
  
    useEffect(() => {
  
      (async () => {
        await sleep(2000); 
        if (deliveryAddress.length > 0) {
          setOptions([...deliveryAddress])
        }
      })();

    }, [open]);

    useEffect(() => {
        // dispatch(getAdressFromNp())
      
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    const setStreetDelivery=(e)=>{
      let id = 'warehouse_address'
      let ind = e.target.id.split('-')[2]
      let str = deliveryAddress[ind]
        dispatch(getFormTable({id, str}))
       
    }
// const handleFocus=()=>{
//   if (sityValue !== '' && sityValue ) {
//       
//   }
// }  
    return (  
      <Autocomplete
        id={'warehouse_city'}
        name={'warehouse_city'}
        sx={{ maxWidth: 250, width: '100%', '& input': {fontSize: 10}, marginLeft: 'auto',  marginRight: 'auto',
        '& div.MuiInputBase-root': {padding: '1px 0px', },
     }}
        // open={open}
        // onOpen={() => {
        //   setOpen(true);
        // }}
        // onClose={() => {
        //   setOpen(false);
        // }}
        value = {adressValue?adressValue:null}
         onChange={setStreetDelivery}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField 
          sx={{ color: colorsRef.tableInputTextColor, minWidth: '80px',width: '100%',
                      }}
            {...params}
            label={''}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress  color="inherit" size={10} sx={{marginRight: '10px'}} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    );
  } 
  
  