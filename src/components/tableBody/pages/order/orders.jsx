import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {Paper, Typography} from '@mui/material';
import {useState, useEffect, useLayoutEffect, useRef, Profiler, lazy, useMemo,Suspense} from 'react';
import {useNavigate, useSearchParams, useLocation, createSearchParams} from 'react-router-dom';
import { colorsRef } from '../../../../consts/colorConstants';
import {getRowsAfterAdd, getAllOrders, getAllStatuses, getSitysFromNp, getFilteredOrders} from '../../../../redux/asyncThunc';
import {GetRowsComparator} from './getRowsComparator';
// import { descendingComparator, getComparator, stableSort} from './functionOrder';
import { useDispatch, useSelector } from 'react-redux';
import {dividerStyle, rowPosition, tHeadStyle, tableBoxStyle,
         paperTableStyle, tableContainerStyle, inOrdersBoxStyle} from './styles';
import {bodyTableRowsUpdate, getWidthUpdate, setWidthColumn,
   getOpenTableCreate, autoUpdate, getFormTable, getClouseTableCreate} from '../../../../redux/ordersReduser';
import { Preloader } from '../../../preloader/preloader';
import { TableRows } from './tableRows';
import { getselected } from '../../../../redux/funcReduser';


const ComentModalMenu = lazy(() => import("../modals/comentmodal.jsx"));
const EnhancedTableHead = lazy(() => import("./enhancedTableHead.jsx"));
const ScrollTabsButton = lazy(() => import("./tableInBody.jsx"));
const HeaderContainer = lazy(() => import("./header.jsx"));
const MyTablePagination = lazy(() => import("./myPagination.jsx"));

export  function Order() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
  const bodyTableRows = useSelector((state) => state.ordersAll.bodyTableRows);
  const isLoading = useSelector((state) => state.ordersAll.isLoading);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);

  const filteredColumn = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
  const isGrabAll = useSelector((state) => state.ordersAll.isGrabAll);
  const idRows = useSelector((state) => state.ordersAll.createRows?.id);
  const tableLength = useSelector((state) => state.ordersAll.tableLength);
  const startRows = useSelector((state) => state.ordersAll.start);
  const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
  const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const [searchParams, setSearchParams] = useSearchParams();
const statusName = searchParams.get('status');
const selectedRows = useSelector((state) => state.function.selectedRow);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
 
    const page = useSelector((state) => state.ordersAll.page);
    const rowsPerPage = useSelector((state) => state.ordersAll.rowsPerPage);

   useEffect(()=>{
    console.log(statusName);
       if (Number(statusName)) {
        // console.log('filter status_name');
      dispatch(autoUpdate({id:'statusName', str: statusName}));
      getUpdate();      
      } else if (!statusName && !idRows) {
        // console.log('orders');
        dispatch(autoUpdate({id:'statusName', str: null}));
        navigate('/trendcrm/orders')
        getUpdate()
      } else if(Number(idRows) && isUpdateRows){      
        // console.log('Number(idRows) && isUpdateRows', idRows);
        navigate(`/trendcrm/order/:${idRows}`);        
      } else if (location.pathname === '/trendcrm/orders') {
        console.log(location.pathname);
        dispatch(autoUpdate({id:'statusName', str: null}));
        getUpdate();
      }
   

  },[statusName, idRows])  

  useEffect(() => {
if (statuses.length === 0) {
  dispatch(getAllStatuses());
}
// if (!allOrders[0]) {
//   getUpdate()
// }
  
        
}, []);

const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}

useEffect(() => {
if (columns.length > 0 && dataForHeader.length > 0 && filteredColumn.length === 0) {
 dispatch(bodyTableRowsUpdate([...arrayRows]))
} else if (columns.length > 0 && filteredColumn.length > 0 ) {
  console.log(arrayFilteredRows, filteredColumn.length);
 dispatch(bodyTableRowsUpdate([...arrayFilteredRows]))
}
}, [columns, filteredColumn, dataForHeader ]);

const arrayFilteredRows = useMemo(() => columns.map((str, ind) =>{
  return (filteredColumn.reduce((acc,val, ind) =>{    
    acc.push({id:val.data, value: str[val.data], color: str.status_style })         
    return [...acc]   
  },[]))

}),[filteredColumn, columns]
);

const arrayRows = useMemo(() => columns.map((str, ind) =>{
        return (dataForHeader.reduce((acc,val, ind) =>{
          acc.push({id:val.id, value: str[val.id], color: str.status_style })         
          return [...acc]   
        },[]))


    }),[dataForHeader, columns]
);

const handleSelect = (ctrlKey,shiftKey, id) =>{
  if (isGrabAll === true){
  dispatch(autoUpdate({id: 'isGrabAll', str: false}))} 
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];
if (selectedIndex === -1 && !ctrlKey) {
  newSelected.push(id);
  }  
 if (ctrlKey) {
  console.log('ctrlKey',selectedRows);
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedRows, id)
  } else if (selectedIndex >= 0) {
    let arr = [...selectedRows]
    arr.splice(selectedIndex,1);
    newSelected = [...arr]
  };
};
if (shiftKey) {
  const lastElement = selectedRows.length - 1;
  // console.log('shiftKey',selectedRows, selectedIndex,lastElement);
  
  if (lastElement >=0) {
    let newElements=[]
    const firstElement = columns.findIndex(n=> n.id === selectedRows[lastElement])
    const lastIndexElement = columns.findIndex(n=> n.id === id);
    if (firstElement<lastIndexElement) {
       newElements = columns.slice(firstElement, lastIndexElement+1).map(n=>n.id)
    } else if (firstElement > lastIndexElement) {
       newElements = columns.slice(lastIndexElement, firstElement).map(n=>n.id)
    } else newElements = [id]
    
    newSelected = [...selectedRows,...newElements]

    console.log('firstelement', newElements);
    } else if (lastElement >= 0) {
 
    let lastSelected = 'selectedRows[],'
    // console.log(lastSelected, firstElement);
    // let arr = [...selectedRows]
    // arr.splice(selectedIndex,1);
    // newSelected = [...arr]
  };
};
dispatch(getselected(newSelected))
 }; 

const handleClick = (e, index, ref, color) => { 
  let id = columns[index].id
  if (id) {
    handleSelect(e.ctrlKey,e.shiftKey, id)     
  } 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: id}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));       
 
      };
   if (e.detail === 2) {
    let idRows = columns[index]
       handleDoubleClick(e, index, idRows)
      }
  }
 const handleDoubleClick=(event, index, name)=>{

    let id = name.id;
    dispatch(autoUpdate({id: 'isUpdateRows', str: true}));
    if (Number(statusName)){
      dispatch(autoUpdate({id:'statusName', str: null}));
      setSearchParams('');
    } 
    dispatch(getRowsAfterAdd(id));   

  };

const rowsForRender = useMemo(
  () => bodyTableRows,
  [bodyTableRows]
);
const MemoizedChildComponent = useMemo(()=>TableRows, [rowsForRender]);


return (

    <Box sx={tableBoxStyle} >    
   < HeaderContainer/>

      <Paper sx={paperTableStyle}>
      <ScrollTabsButton/> 
         <TableContainer sx={tableContainerStyle} >
         {isLoading && <Preloader/>}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead 
                          rowCount={rowsForRender?.length}/>
    
        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor, }}>
        <Suspense fallback={<Preloader/>}>
        {rowsForRender.map((rows, index, arr) => {
         return (<MemoizedChildComponent key={index} 
         rows ={rows} index={index} arr={arr} click={handleClick} selected = {selectedRows}/>)
        })}                 
       
      </Suspense>
             </TableBody>
                 </Table>
        </TableContainer> 

      </Paper>
  <Box sx={inOrdersBoxStyle}>
  <Box sx={{display: 'flex', '@media (max-width:768px)': {display: 'block', textAlign: 'center',},
                             '@media (min-width:768px) and (max-width:898px)': { marginTop: '17px', marginLeft: '10px' },
                              '@media (min-width:899px)': {marginLeft: '20px',}}}>
  <Typography sx={{fontSize: '14px', '@media (max-width:768px)': {
    display: 'block', textAlign: 'center',

  },}}> {`Записів від ${startRows+1} до ${(startRows+rowsPerPage)>tableLength?tableLength:startRows+rowsPerPage} 
            з ${tableLength} записів`}</Typography> 
            <Typography sx={{'@media (max-width:768px)': { display: 'block', textAlign: 'center',marginLeft: '0px'}, fontSize: '14px', marginLeft: '10px' }}>{`Вибрано:
             ${selectedRows[0]?selectedRows.length: 0}`}</Typography>
  </Box>
<MyTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/>
</Box>
    <ComentModalMenu/>
    </Box>
  );
}
