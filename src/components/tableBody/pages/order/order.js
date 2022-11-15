import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {dataParse} from './dataParse';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox,Divider, 
    TablePagination, FormControlLabel, Switch, Hidden} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {HeaderTable} from './tHead';
import {tableParse} from './tableParse';
import {translater} from './translate';
import {ScrollTabsButton} from './tableInBody';

import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp} from '../../../../redux/asyncThunc';
import {HeaderContainer} from './header';
import {getRowsComparator} from './getRowsComparator';
import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn} from '../../../../redux/ordersReduser';
import {replaceRows} from './tHead';
import {EnhancedTableHead} from './enhancedTableHead';
import s from './styles.module.scss';
import { Preloader } from '../../../preloader/preloader';

export  function Order() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);
  const allOrders = useSelector((state) => state.ordersAll.columns);

  
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [rowsTable, useRowsTable] = useState([]);


  useEffect(() => {
    console.log('getAllOrders');
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
if (!allOrders[0]) {
  console.log('no orders');
  dispatch(getAllOrders());
}
  
        
}, []);


useEffect(() => {
if (columns.length > 0 && dataForHeader.length > 0 ) {
  GetRenderRows(dataForHeader, columns)
 dispatch(bodyTableRowsUpdate([...arrayRows.reverse()]))
}

}, [columns]);

  

  
 const GetRenderRows =(dataForHeader, columns) =>{   
     const arrayRow = columns.map((str, ind) =>{
      let result = []
       const rowSpan = dataForHeader.reduce((acc,val, ind) =>{
           return result.push({id:val.id, value: str[val.id], color: str.status_style }
               )  },[])
        arrayRows.push(result)
  
      })   
      // console.log(arrayRows);
   }
   
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = bodyTableRows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      backgroundColor: colorsRef.tableRowBgFirstColor,
      '&:nth-of-type(odd)': {
        backgroundColor: colorsRef.tableRowSecondColor,        
      }
    }));

return (
    <Box sx={{height: '100%', width: '100%', backgroundColor: colorsRef.boxTableColor, paddingBottom: '20px 0px'}} >     
   < HeaderContainer/>
      <Paper sx={{position: "relative", width: '98%', marginLeft: 'auto', marginRight: 'auto',overflowY: 'auto',
        boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'}}>
      <ScrollTabsButton/> 

         <TableContainer sx={{ width: '100%', height: '700px',  backgroundColor: '#fff', paddingBottom: '80px', overflowY: 'scroll',overflowX: 'scroll', }} >
         {isLoading && <Preloader/>}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead   props ={bodyTableRows}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={bodyTableRows?.length}/>

        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}} >
              {stableSort(bodyTableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => {
                  const isItemSelected = isSelected(rows.index);
                  return (
                    <StyledTableRow 
                    // hover
                    onClick={(event) => handleClick(event, rows.id)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={index}
                    // selected={isItemSelected}
                    // sx={{backgroundColor: '#fff' }}
                  >
            {rows.map((row,ind) => (
              
            <TableCell  sx={{ backgroundColor: row.color, minWidth: '100px',
             fontSize: '12px', height: '21px', whiteSpace: 'nowrap', 
             padding: '0px 10px',borderRight: '1px solid #fff',maxWidth: '400px',  overflowX: 'auto', width: '200px'
                      }}
            key={ind} align="center" >{getRowsComparator(row.value, row.id)} </TableCell>
            
            ))} 
             </StyledTableRow> );
             
                })}
             </TableBody>

          </Table>
        </TableContainer>  
        <TablePagination
         sx={{ maxWidth: '450px'}}
          rowsPerPageOptions={[50, 100, 250, 500]}
          component="div"
          count={columns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
