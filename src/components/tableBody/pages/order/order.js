import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import {dataParse} from './dataParse';
import TableRow from '@mui/material/TableRow';
import {Paper,TableSortLabel, Stack, Tab, Checkbox,Divider, 
    TablePagination, FormControlLabel, Switch, Hidden} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef} from 'react';
// import {HeaderTable} from './tHead';
// import {tableParse} from './tableParse';
// import {translater} from './translate';
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
import { Preloader } from '../../../preloader/preloader';

export  function Order() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);
  const allOrders = useSelector((state) => state.ordersAll.columns);
  const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [rowsTable, useRowsTable] = useState([]);


  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
if (!allOrders[0]) {
  dispatch(getAllOrders());
}
  
        
}, []);

useEffect(() => {
handleSelectAllClick()
}, [isGrabAll]);


useEffect(() => {
if (columns.length > 0 && dataForHeader.length > 0 && filteredColumn.length === 0) {
  GetRenderRows(dataForHeader, columns)
 dispatch(bodyTableRowsUpdate([...arrayRows.reverse()]))
} else if (columns.length > 0 && filteredColumn.length > 0 ) {
  GetRenderFilteredRows(filteredColumn, columns)
 dispatch(bodyTableRowsUpdate([...arrayRows.reverse()]))
}

}, [columns, dataForHeader, filteredColumn]);

const GetRenderFilteredRows =(dataForHeader, columns) =>{   
  const arrayRow = columns.map((str, ind) =>{
   let result = []
    const rowSpan = filteredColumn.reduce((acc,val, ind) =>{
        return result.push({id:val.data, value: str[val.data], color: str.status_style }
            )  },[])
     arrayRows.push(result)

   })   

};
  
 const GetRenderRows =(dataForHeader, columns) =>{   
     const arrayRow = columns.map((str, ind) =>{
      let result = []
       const rowSpan = dataForHeader.reduce((acc,val, ind) =>{
           return result.push({id:val.id, value: str[val.id], color: str.status_style }
               )  },[])
        arrayRows.push(result)
  
      })   
   };
   
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = () => {
      if (isGrabAll) {
        const newSelected = bodyTableRows.map((n,ind) => ind);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
    const handleClick = (event, name) => {
         if (event.detail === 2) {
          handleDoubleClick(event, name)
      }
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
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      // backgroundColor: colorsRef.tableRowBgFirstColor,

      // '&:nth-of-type(odd)': {
      //   backgroundColor: colorsRef.tableRowSecondColor,        
      // },

    }));
const handleDoubleClick=(event, name)=>{
  console.log('event.target.id',event.target, 'name', name);
}

return (

    <Box sx={{flexGrow: 1, paddingTop: '47px', maxWidth: '100%',overflowX: 'hidden', overflowY: 'hidden',
               maxHeight: '100%', height: '100%',
               backgroundColor: colorsRef.boxTableColor, paddingBottom: '10px'}} >    
 {/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */} 
   < HeaderContainer/>
      <Paper sx={{position: "relative", width: '98%', 
                   height: 'calc(90% - 20px)', marginLeft: 'auto', 
                  marginRight: 'auto',overflowY: 'hidden',
                   boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'}}>
      <ScrollTabsButton/> 
{/* HEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHTHEIGHT */}
         <TableContainer sx={{ width: '100%', maxHeight: 'calc(95% - 70px)',  backgroundColor: '#fff', minHeight: '100px',
                           paddingBottom: '10px', overflowY: 'scroll',overflowX: 'scroll', }} >
         {isLoading && <Preloader/>}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead   props ={bodyTableRows}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={bodyTableRows?.length}/>

        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}} >
              {stableSort(bodyTableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => {
                  return (
                    <StyledTableRow 
                    // hover
                    onClick={(event) => handleClick(event, index)}
                    tabIndex={-1}
                    key={index}
                    sx={{
                      backgroundColor: selected.includes(index)?'#B0C4FF':rows[0]?.color,
                      color: selected.includes(index)?'#fff':'#000',
                      cursor: 'pointer',

                    }}
                  >
            {rows.map((row,ind) => (
              
            <TableCell sx={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',
            //  borderRight: '1px solid #fff',
             maxWidth: '400px',  overflowX: 'auto', width: '200px',
             color: 'inherit'
            }}
            key={ind} align="center" >{getRowsComparator(row.value, row.id)} </TableCell>
            
            ))} 
             </StyledTableRow> );
             
                })}
             </TableBody>

          </Table>
        </TableContainer>  
        <TablePagination
        
         sx={{ maxWidth: '450px', height: '50px', maxHeight: '50px', 
              overflowY: 'hidden', marginTop: 'auto', marginBottom: 'auto'}}
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
