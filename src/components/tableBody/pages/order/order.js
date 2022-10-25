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
import { visuallyHidden } from '@mui/utils';
import {HeaderTable} from './tHead';
import {tableParse} from './tableParse';
import {translater} from './translate';
import {ScrollTabsButton} from './tableInBody';
import {SearchInput} from './tableInBody';
import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import {currentThunk} from '../../../../redux/asyncThunc';
import { useDispatch } from 'react-redux';
import {HeaderContainer} from './header';
const tableHead = dataParse.orders_status_count
const tableHeaderWidth = 100;
const rowWidth = 150;
const rowBgColor = "#afffff";
let TableHeadFromResponse = [];





function handleClickOnChip(e) {

  

}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


function EnhancedTableHead({props}) {
  const [tHead, setTHead] = useState([]);
  const [elWidth, setElWidth] = useState(100)

  useEffect(() => {
    refreshTHead( [...tableParse.data] , translater )  
 
  }, []);

 const refreshTHead = (tableData, translater)=>{

 const keysOfData = tableData.reduce((acc, str, ind, arr) =>{   
  return [...Object.keys(str)]
},[]);

let arrayOfdata = [] ;  
keysOfData.reduce((acc, str,ind) => { 
    if (Object.keys(translater).includes(str) && Object.values(translater)[ind] !== null
    && Number.isNaN(Number(Object.values(translater)[ind]))
    ){
      // console.log(str);
      return arrayOfdata.push({id: str, label: Object.values(translater)[ind],
        numeric: false, disablePadding: true })
       }
   }, []); 
   setTHead([...tHead,...arrayOfdata])
   TableHeadFromResponse = [...arrayOfdata];
 }  

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =  props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

const [width, setWidth] = useState(120);
const [objWidts, setObjWidts] = useState([]);


const onDeltaWidth =(e)=>{
    let id = e.target.id;
    let width = e.target.clientWidth;
if (objWidts.find(el=> el.id === e.target.id)) {
const result =  objWidts.map((str, ind) =>{
  // console.log(str.id);
    if (str.id === e.target.id) {
      // console.log(str);
  
  return {id: e.target.id, width: e.target.clientWidth}
    } else return str
  })
  // console.log(result);
 return setObjWidts([...result])
} else{
  // console.log(objWidts, 'objWidts');
  return setObjWidts([...objWidts, {id: e.target.id, width: e.target.clientWidth}])
}
}



 const dividerStyle = {
  padding: '1px',
   height: '60%', 
  position: 'absolute',
  top: '20%',
  right: 0,
   backgroundColor: colorsRef.tableRowSecondColor,
  border: 'none',
  borderRadius: '10px',
    '&:hover':{cursor: "ew-resize"}
  };
  

const tHeadStyle = {
  minWidth: '100px',
   whiteSpace: 'nowrap',
   padding: '0px',
  borderRadius: '15px',
   maxWidth: '400px',
   
 }

  return (    
    <TableHead sx={{backgroundColor: colorsRef.formBgColor,  position: 'fixed', overflow: 'clip'}} >      
      <TableRow>      

        {tHead.map((HeaderTable) => (          
          <TableCell  onMouseUp={onDeltaWidth} colSpan={1}
            key={HeaderTable.id}
            id={HeaderTable.id}
            sx={tHeadStyle} 
            align= "center"        
            >  
            <div  id={HeaderTable.id} style={{resize: 'horizontal', overflow: 'hidden',
             width: '100%', padding: '3px 10px', alignItems: 'center', minWidth: width, position: 'relative',
          }} key={HeaderTable.id}>
            <TableSortLabel            
              active={orderBy === HeaderTable.id}
              direction={orderBy === HeaderTable.id ? order : 'asc'}
              onClick={createSortHandler(HeaderTable.id)}
            >
              {HeaderTable.label}
              {orderBy === HeaderTable.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
             
            </TableSortLabel>
            <Divider  id={HeaderTable.id} sx={dividerStyle} orientation="vertical" flexItem />
            </div>
          </TableCell>  ))}
      </TableRow>

      <TableRow  >
          {tHead.map((call) =>(
          <TableCell
          key={call.id}
          align='center'
          sx={{ whiteSpace: 'nowrap', backgroundColor: tableHead.style, padding: '5px 0px'}}
          >
             <SearchInput props={'wwwwwww'} options={props}/>
             
          </TableCell>
          ))}
      </TableRow>
          </TableHead>
    
  );
}


export  function Order() {
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(currentThunk());
  
  // }, []);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [rowsTable, useRowsTable] = useState([])

    useEffect(() => {
      GetRenderRows(TableHeadFromResponse, tableParse.data)
 
  }, []);

  let arrayRows = []
 const GetRenderRows =(TableHeadFromResponse, tableParse) =>{ 
  // console.log(TableHeadFromResponse);     
     const arrayRow = tableParse.map((str, ind) =>{
      let result = []
       const rowSpan = TableHeadFromResponse.reduce((acc,val, ind) =>{
           return result.push({id:val.id, value: str[val.id]}
              
               )         

        },[])
        arrayRows.push(result)
        return result.push(rowSpan)        
      })    
      // console.log(arrayRows);
      useRowsTable([...rowsTable,...arrayRows ])
    }
   
// console.log(rowsTable);
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rowsTable.map((n) => n.name);
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
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsTable.length) : 0;



    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      backgroundColor: colorsRef.tableRowBgFirstColor,
      '&:nth-of-type(odd)': {
        backgroundColor: colorsRef.tableRowSecondColor,
        
      }

    }));

return (
    <Box 
        sx={{height: '100%', width: '100%', backgroundColor: colorsRef.boxTableColor, paddingBottom: '20px 0px'}}
    >     
   < HeaderContainer>
   sdf
   </HeaderContainer>
      <Paper sx={{position: "relative", width: '98%', marginLeft: 'auto', marginRight: 'auto',overflowY: 'auto',
        boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'
    }}>

      <ScrollTabsButton  item={tableHead } /> 

         <TableContainer 
          sx={{ width: '100%', height: '700px',  backgroundColor: '#fff', paddingBottom: '80px', overflowY: 'scroll',overflowX: 'scroll',
        }} 
           >
                <Table 
            sx={{ minWidth: 550}}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead   props ={rowsTable}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rowsTable.length}/>

        <TableBody sx={{backgroundColor: colorsRef.tabsBgColor}}>
              {stableSort(rowsTable,
               getComparator(order, orderBy)
               )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => {
                  // console.log(rows);
                  const isItemSelected = isSelected(rows.index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow 
                    hover
                    onClick={(event) => handleClick(event, rows.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${rows.id}+${index}`}
                    selected={isItemSelected}
                  >
            {rows.map((row,ind) => (
              
            <TableCell 
                       sx={{ minWidth: '100px', whiteSpace: 'nowrap', padding: '10px 10px', overflow: 'hidden' ,borderRight: '1px solid #fff',
                      maxWidth: '400px',  overflowX: 'hidden',
                      }}
            key={row.id+ind+rows.name} align="center" >{row.value} </TableCell>
            
            ))} 
             </StyledTableRow> );
             
                })}
             </TableBody>

          </Table>

        </TableContainer>
        {/* <Box sx={{backgroundColor: colorsRef.formBgColor, width:'100%'}}> */}
        <TablePagination
         sx={{ maxWidth: '450px'}}
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rowsTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </Box> */}
      </Paper>

    </Box>
  );
}
