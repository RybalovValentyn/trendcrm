import {useState, Fragment, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {colorsRef} from '../../consts/colorConstants';
import { useDispatch, useSelector,  } from 'react-redux';
import { getSitysFromNp, getAdressFromNp } from '../../redux/asyncThunc';
import {getFormTable} from '../../redux/ordersReduser';

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  
  export function SearchInputSity({props}) {
    const dispatch = useDispatch();
    const sityValue = useSelector((state) => state.ordersAll.createRows.warehouse_city);    
    const sitys = useSelector((state) => state.ordersAll.sityNewPost);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
  
    useEffect(() => {
  
      (async () => {
        await sleep(2000); 
        if (sitys.length > 0) {
          setOptions([...sitys])
        }
      })();
  

    }, [open]);

    useEffect(() => {
      if (sitys.length === 0) {
        dispatch(getSitysFromNp())
      }
      if (!open) {
        setOptions([]);
      }
    }, [open]);

  const setSytyDelivery =(e) =>{  
    let ind = e.target.id.split('-')[2]
    let str = sitys[ind]
      dispatch(getFormTable({id: 'warehouse_city', str})) 
  }
  
    return (  
      <Autocomplete
        id={'warehouse_city'}
        name={'warehouse_city'}
        sx={{ maxWidth: 250, width: '100%', '& input': {fontSize: 10}, marginLeft: 'auto',  marginRight: 'auto',
        '& div.MuiInputBase-root': {padding: '1px 0px', },
     }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value = {sityValue?sityValue:null}
         onChange={setSytyDelivery}
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
  
  