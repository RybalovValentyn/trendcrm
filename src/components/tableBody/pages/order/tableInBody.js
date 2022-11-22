import {useState, Fragment, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import {Tab, Button} from '@mui/material';
import {colorsRef} from '../../../../consts/colorConstants';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {AddStatusForm} from './modalAddStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getSortDate } from '../../../../redux/ordersReduser';
import { getAllOrders } from '../../../../redux/asyncThunc';
import { useParams, useSearchParams } from "react-router-dom";

export function ScrollTabsButton() {
  const [value, setValue] = useState(0);
  
const [searchParams, setSearchParams] = useSearchParams();
const statusName = searchParams.get('id');

// const visibleProducts = products.filter((product) =>
//   product.name.toLowerCase().includes(productName.toLowerCase())
// );

const statuses = useSelector((state) => state.ordersAll.getStatuses);
const dispatch = useDispatch();

useEffect(() => {
  if (statusName === "") return;
  console.log(statusName);
}, [statusName]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const boxStyles={
    flexGrow: 1,
    maxWidth: '100%',
    backgroundColor: '#fff',
    maxHeight: '32px',

  }

  const tabsStyles ={
    backgroundColor: colorsRef.tabBgColor,
    [`& .${tabsClasses.scrollButtons}`]: {
      '&.Mui-disabled': { opacity: 0.3 },
      maxHeight: '32px',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fff',
      width: 0,
    },
   }

const handleClick =(e)=>{
  let str = e.target.id;
  let id = 'status_name'
  setSearchParams({ id: str });
  if (str === 0 || str === '0') {
    str = ''
  }
  dispatch(getSortDate({id, str}));
  dispatch(getAllOrders());
}

  return (
    <Box sx={boxStyles} >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={tabsStyles}
      >
          
       {statuses.map((tab, ind) =>(        
        <Tab onClick={handleClick} id={tab.id}
        sx={{ borderTop: `6px solid ${tab.style}`, padding: '0px 10px',fontSize: '12px',color: colorsRef.tabHeaderTextColor,
        backgroundColor: colorsRef.tableHeaderBgColor, minWidth: 'min-content', minHeight: '32px',  maxHeight: '32px', 
        margin: '0px 1px 0px 1px', textTransform: 'none',
      '&.Mui-selected': {backgroundColor: '#fff',color: colorsRef.tabHeaderTextColor,
         }
      }}
        key={ind} label= {`${tab.name}: ${tab.count}`} />
       
       ))}
       
       <AddStatusForm/>
      </Tabs>
     
    </Box> 
  );
}



function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function SearchInput({props}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
// console.log(props);
  return (

    <Autocomplete
      id="asynchronous-demo"
      sx={{ maxWidth: 200, minWidth: '100px', '& input': {fontSize: 10}, marginLeft: 'auto',  marginRight: 'auto',
      '& div.MuiInputBase-root': {padding: 0, },
   }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField 
        sx={{ color: colorsRef.tableInputTextColor, minWidth: '80px', maxWidth: '150px'
                    }}
          {...params}
          label={''}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress  color="inherit" size={10} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
} 

const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];