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
import { hexToRgbA } from "./functionOrder";

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
    let selected =  sessionStorage.getItem("selected");
    const page = useSelector((state) => state.ordersAll.page);
    const rowsPerPage = useSelector((state) => state.ordersAll.rowsPerPage);
    const rowRef = useRef(null);
    let countSelected = 0;

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
        // console.log(location.pathname);
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
 dispatch(bodyTableRowsUpdate([...arrayFilteredRows]))
}
}, [columns, filteredColumn, dataForHeader ]);

useEffect(() => {
 let prevSelected = sessionStorage.getItem("selected").split(',');
if (isGrabAll) {    
  prevSelected.map(str=>{
    if (str) {
      addColor(String(str))
    }
  }) 
  countUpdate()  
}else if (!isGrabAll) {
  sessionStorage.setItem("selected", '');
  prevSelected.map(str=>{
    if (str) {
      removeColor(str)
    }
})};
countUpdate()  
  }, [isGrabAll]);

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
const addColor =(id)=>{  
  const element = document.getElementById(`${id}+rows`);
  element.style.backgroundColor = '#B0C4FF'
}
const removeColor=(id)=>{
  let color = columns.find(col=>col.id === id)?.status_style
  const element = document.getElementById(`${id}+rows`);
  element.style.backgroundColor = hexToRgbA(color)
}

const handleSelect = (ctrlKey,shiftKey, id) =>{
let prevSelected= [];
if (sessionStorage.getItem("selected")) {
  prevSelected = sessionStorage.getItem("selected").split(',');
    if (prevSelected.length === 1 && !ctrlKey && !shiftKey) {
         removeColor(prevSelected[0])
    } else if(prevSelected.length > 1 && !ctrlKey && !shiftKey){
      prevSelected.map(str=>{if (str) { removeColor(str)}})
    }
}
  addColor(id)
  const selectedIndex = prevSelected.indexOf(id);
  let newSelected = [];
if (selectedIndex === -1 && !ctrlKey) {
  newSelected.push(id);
  }  else if (selectedIndex >= 0){
    removeColor(id)
  }
 if (ctrlKey) {
  if (selectedIndex === -1) {
    newSelected = prevSelected.concat(id)
    if (newSelected.length > 1) {
      newSelected.map(str=>{
        if (str) {
          addColor(str)
        }
      })
    }
  } else if (selectedIndex >= 0) {
    removeColor(id)
    let arr = [...prevSelected]
    arr.splice(selectedIndex,1);
    newSelected = [...arr]
  };
};
if (shiftKey) {
  
  const lastElement = prevSelected.length-1; 
  if (lastElement >= 0) {
    console.log(prevSelected);
    let newElements=[]
    const firstElement = columns.findIndex(n=> n.id === prevSelected[lastElement])
    const lastIndexElement = columns.findIndex(n=> n.id === id);
     if (firstElement<lastIndexElement) {
       newElements = columns.slice(firstElement, lastIndexElement+1).map(n=>n.id)
    } else if (firstElement > lastIndexElement) {
       newElements = columns.slice(lastIndexElement, firstElement).map(n=>n.id)
    } else newElements = [id]
    newSelected = [...prevSelected,...newElements]
    console.log(prevSelected);
    if (newSelected.length > 1) {
      newSelected.map(str=>{
        if (str) {
          addColor(str) 
        }
      })
    }

};}
sessionStorage.setItem("selected", newSelected);
 }; 

const handleClick = (e, index) => { 
  let id = columns[index].id
  if (id) {
    handleSelect(e.ctrlKey,e.shiftKey, id) ;
    countUpdate()    
  } 
    if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') {
      dispatch(autoUpdate({id: 'rowsToUpdate', str: columns[index]}))
        dispatch(getOpenTableCreate({id: 'comentSettings', str: true}));       
 
      };
      dispatch(autoUpdate({id: 'isGrabAll', str: false}))
   if (e.detail === 2) {
    let idRows = columns[index]
       handleDoubleClick(e, index, idRows)
      }
  }
 const handleDoubleClick=(event, index, name)=>{
  sessionStorage.setItem("selected", '');
    let id = name.id;
    dispatch(autoUpdate({id: 'isUpdateRows', str: true}));
    if (Number(statusName)){
      dispatch(autoUpdate({id:'statusName', str: null}));
      setSearchParams('');
    } 
    dispatch(getRowsAfterAdd(id));   

  };
const countUpdate = ()=>{
  const element = rowRef
  if (sessionStorage.getItem("selected").length) {
    let count = sessionStorage.getItem("selected")?.split(',')?.filter((str,ind,arr)=>arr.indexOf(str) === ind).length    
    countSelected = count
    element.current.textContent = `${countSelected}`
  } else element.current.textContent = `${0}`

}
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
         {/* {isLoading && <Preloader/>} */}
                <Table sx={{ minWidth: 550}} aria-labelledby="tableTitle">
            <EnhancedTableHead 
                          rowCount={rowsForRender?.length}/>
    
        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor, }}>

        {rowsForRender.map((rows, index, arr) => {
         return (<MemoizedChildComponent key={index} 
         rows ={rows} index={index} arr={arr} click={handleClick} />)
        })}                 
       

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
            <Typography  sx={{'@media (max-width:768px)': { display: 'block', textAlign: 'center',marginLeft: '0px'}, fontSize: '14px', marginLeft: '10px' }}>
              Вибрано: <span ref={rowRef}>{countSelected}</span>
             </Typography>
  </Box>
<MyTablePagination length={Number(tableLength)} rowsPerPage={rowsPerPage}  page={page}/>
</Box>
    <ComentModalMenu/>
    </Box>
  );
}
