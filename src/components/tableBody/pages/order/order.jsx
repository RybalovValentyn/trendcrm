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
import {GetRowsComparator} from './getRowsComparator';
import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable} from '../../../../redux/ordersReduser';
import {EnhancedTableHead} from './enhancedTableHead';
import { Preloader } from '../../../preloader/preloader';
import { ComentModalMenu } from './createRow/comentmodal';

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
  const isOpenCreator = useSelector((state) => state.ordersAll.modalControl.openCreator);
  const dataForSelect = useSelector((state) => state.ordersAll);
  const createdRows = useSelector((state) => state.ordersAll.createRows);
  // const getColumnToUpdate = useSelector((state) => state.ordersAll.rowsToUpdate);
  let arrayRows = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [coment, setComent] = useState(null);


  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
if (!allOrders[0]) {
  dispatch(getAllOrders());
}
  
        
}, []);

useEffect(() => {
  if (isGrabAll) {
    const newSelected = bodyTableRows.map((n,ind) => ind);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
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
  

    // const handleClick = (e, index, name) => {      
    //   if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
    //     dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));
    //     return setComent(name);
    //   }
    //       if (e.detail === 2) {
    //       handleDoubleClick(e, index, name)
    //   }
    
      // const selectedIndex = selected.indexOf(name);

      
      // let newSelected = [];  
      // if (selectedIndex === -1) {
      //   newSelected = newSelected.concat(selected, name);
      // }
      
      // else if (selectedIndex === 0) {
      //   newSelected = newSelected.concat(selected.slice(1));
      // } else if (selectedIndex === selected.length - 1) {
      //   newSelected = newSelected.concat(selected.slice(0, -1));
      // } else if (selectedIndex > 0) {
      //   newSelected = newSelected.concat(
      //     selected.slice(0, selectedIndex),
      //     selected.slice(selectedIndex + 1),
      //   );
      // }

      // setSelected(newSelected);

  
 const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
 const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };
  
const handleDoubleClick=(event, index, name)=>{
  dispatch(getOpenTableCreate({id: 'openCreator', str: !isOpenCreator}))
for (const key in name) {
  if (Object.hasOwnProperty.call(name, key)) {
    const element = name[key];
    // console.log(key, element);
if (element) {

   switch (key) {
    case 'client':
            dispatch(getFormTable({id: 'fio', str: element}));
            break;
     case 'fio':
           dispatch(getFormTable({id: 'fio', str: element}));
         break;
    case 'client_phone':
          dispatch(getFormTable({id: 'client_phone', str: element}));
         break;
    case 'email':
        dispatch(getFormTable({id: 'email', str: element}));
        break;
    case 'ig_username':
        dispatch(getFormTable({id: 'ig_username', str: element}));
        break;
    case 'comment':
        dispatch(getFormTable({id: 'comment', str: element}));
          break;
    case 'additional_field':
        dispatch(getFormTable({id: 'additional_field', str: element}));
          break;
    case 'delivery_type':
        //  console.log(dataForSelect.delivery_type.indexOf(element), element);
         let delivery_type = dataForSelect.delivery_type.indexOf('Нова пошта')
            dispatch(getFormTable({id: 'delivery_type', ind: delivery_type}));
          break;
     case 'packer_name':
            // console.log(dataForSelect.packer_name.indexOf(element), element);
            let packer_name = dataForSelect.packer_name.indexOf('admin')
           dispatch(getFormTable({id: 'packer_name', ind: packer_name}));
          break;  
    case 'payment_name':
      let id = name.payment_type;
      let payment_name = dataForSelect.payment_name?.find(n=>n?.id === id)
       dispatch(getFormTable({id: 'payment_name', str: payment_name}));
          break;  
     case 'datetime_sent':
      dispatch(getFormTable({id: 'datetime_sent', str: element}));
                break; 
     case 'delivery_service_type':
          dispatch(getFormTable({id: 'delivery_service_type', str: element}));
           break;   
       case 'prepay_status':
           dispatch(getFormTable({id: 'prepay_status', str: element}));
           break; 
       case 'store_url':
          dispatch(getFormTable({id: 'store_url', str: element}));
            break; 
       case 'backward_delivery_summ':
          dispatch(getFormTable({id: 'backward_delivery_summ', str: element}));
          break;
      case 'backward_summ':
          dispatch(getFormTable({id: 'backward_summ', str: element}));
        break;
      case 'warehouse_city':
         dispatch(getFormTable({id: 'warehouse_city', str: element}));
        break;
        case 'warehouse_address':
          dispatch(getFormTable({id: 'warehouse_address', str: element}));
         break;
         case 'delivery_payers':
          dispatch(getFormTable({id: 'delivery_payers', str: element}));
         break;
         case 'delivery_payers_redelivery':
          dispatch(getFormTable({id: 'delivery_payers_redelivery', str: element}));
         break;
         case 'weight':
          dispatch(getFormTable({id: 'weight', str: element}));
         break;
         case 'volume_general':
          dispatch(getFormTable({id: 'volume_general', str: element}));
         break;
         case 'seats_amount':
          dispatch(getFormTable({id: 'seats_amount', str: element}));
         break;
         case 'cost':
          dispatch(getFormTable({id: 'cost', str: element}));
         break;
         case 'novaposhta_comment':
          dispatch(getFormTable({id: 'novaposhta_comment', str: element}));
         break;
         case 'tnn':
          dispatch(getFormTable({id: 'tnn', str: element}));
         break;
         case 'sent':
          dispatch(getFormTable({id: 'sent', str: element}));
         break;
         case 'status':
          dispatch(getFormTable({id: 'status', str: element}));
         break;
         case 'doors_address':
          dispatch(getFormTable({id: 'doors_address', str: element}));
         break;
         case 'doors_city':
          dispatch(getFormTable({id: 'doors_city', str: element}));
         break;
         case 'responsible':
          dispatch(getFormTable({id: 'responsible', str: element}));
         break;
         case 'group_name':
          dispatch(getFormTable({id: 'group_name', str: element}));
         break;
         case 'data_create':
          dispatch(getFormTable({id: 'data_create', str: element}));
         break;
          default:
            break;
        }}   
  }
};

}

const  hexToRgbA = (hex) =>{
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length == 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.25)';
  }
  throw new Error('Bad Hex');
}

const handleClick = (e, index, name) => { 
  let id = name?.find(n=>n.id === 'id').value;
  let idRows = columns.find(n=>n.id === id)
 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: idRows}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));       
 
      };
   if (e.detail === 2) {
       handleDoubleClick(e, index, idRows)
      }
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
                .map((rows, index, arr) => {
                  // console.log(rows);
                  return (
                    <TableRow 
                    onClick={(e)=>handleClick(e, index, arr[index])}
                    tabIndex={-1}
                    key={index}
                    sx={{
                      '&:focus': {backgroundColor: '#B0C4FF', color: '#fff'},
                      backgroundColor: selected.includes(index)?'#B0C4FF':hexToRgbA(rows[0]?.color),
                      color: selected.includes(index)?'#fff':'#000',
                      cursor: 'pointer',
                      border: '1px solid #fff'
                  
                    }}
                  >
            {rows.map((row,ind) => (
              
            <TableCell sx={{ minWidth: '100px', fontSize: '12px', height: '21px', whiteSpace: 'nowrap', padding: '0px 10px',
            //  borderRight: '1px solid #fff',
             maxWidth: '400px',  overflowX: 'auto', width: '200px',
             color: 'inherit', position: 'relative', borderBottom: '1px solid #fff'
            }}
            key={ind} align="center" ><GetRowsComparator row={row}/>  </TableCell>
            
            ))} 
             </TableRow> );
             
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
    <ComentModalMenu/>
    </Box>
  );
}
