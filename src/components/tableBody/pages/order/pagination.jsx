import {TablePagination, Box} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { autoUpdate } from '../../../../redux/ordersReduser';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import {useMemo, useState}  from 'react';


export const CustomTablePagination =({length, rowsPerPage, page})=>{
const dispatch = useDispatch();
const theme = useTheme();
// const [locale, setLocale] = useState('ruRU');
const [locale, setLocale] = useState('ukUA');

const themeWithLocale = useMemo(
  () => createTheme(theme, locales[locale]),
  [locale, theme],
);
    const handleChangePage = (event, newPage) => {
        dispatch(autoUpdate({id: 'page', str: newPage}))
      };
   const handleChangeRowsPerPage = (event) => {
    dispatch(autoUpdate({id: 'rowsPerPage', str: parseInt(event.target.value)}))
    dispatch(autoUpdate({id: 'page', str: 0}))
      };
const paginationStyle = {
    maxWidth: '450px',
     height: '50px',
     maxHeight: '50px', 
    overflowY: 'hidden',

    backgroundColor: '#fff',

 }

    return(        
       
        <ThemeProvider theme={themeWithLocale}>
        <TablePagination        
            sx={paginationStyle}
            rowsPerPageOptions={[10, 25, 50, 100, 250, 500]}
            component="div"
            count={length?length:0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </ThemeProvider>



    )
}
