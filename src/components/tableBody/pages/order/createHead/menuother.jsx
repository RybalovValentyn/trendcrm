import { Select, MenuItem, ListItemText, InputBase, InputAdornment, Popper, Paper, MenuList} from '@mui/material';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef, useRef } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { selectStyles, svgStyle, listStyle } from './style';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import * as fileSaver from 'file-saver';
import *as XLSX from 'sheetjs-style';
import { getRowsAfterAdd } from '../../../../../redux/asyncThunc';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {    
    maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
    width: 200,
    boxShadow: 'none',
    border: '1px solid #d0d0d0',
   },
  },
};



export const OtherMenuComponent=()=>{

  const columns = useSelector((state) => state.ordersAll.columns);
  const dataForHeader = useSelector((state) => state.ordersAll.tHeadColumn);
const navigate = useNavigate();
const dispatch = useDispatch();
const [open, setOpen] = useState(false);
const [openJustin, setOpenjustin] = useState(false);
const justinRef = useRef(null);
const [openNp, setOpenNp] = useState(false);
const newPostRef = useRef(null);
const [openPrint, setOpenPrint]= useState(false);
const printRef = useRef(null);
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';
let selected =  [];
if (sessionStorage.getItem("selected")) {
    selected =  sessionStorage.getItem("selected")?.split(',');
}

const handleClickOpen = () => {
if (!open) {
  setOpen(true);
} 
};
const handleHover =()=>{
  setOpenjustin(false);
  setOpenNp(false)
  setOpenPrint(false)
}

const handleClicSms = ()=>{    
  setOpen(false);
  dispatch(getOpenTableCreate({id: 'send_sms', str: true}));
 
};

const handleMouseEnter=(e)=>{
  if (open) {
    setOpenNp(false)
    setOpenjustin(true)
    setOpenPrint(false)
  }

}

const handleClickJustinItem=()=>{
  setOpen(false);
  setOpenjustin(false);
  setOpenNp(false)
  setOpenPrint(false)
}
const handleClickJustinItemCreate=()=>{
  handleClickJustinItem();
  dispatch(getOpenTableCreate({id: 'justin_create', str: true}));
}
const handleMouseEnterNewPost=()=>{
  if (open) {   
    setOpenjustin(false)
    setOpenNp(true)
    setOpenPrint(false)
  }
}

const handlePrintTTN=()=>{

}
const handlePrepayStatus=()=>{
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'prepay_update', str: true}));

}
const handleUpdateOrders=()=>{
  handleClickJustinItem()
  if (selected.length === 0 || !selected) {
    return dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'error'}))
  }
  if (selected.length === 1 && selected[0]) {
    let id = selected[0]
    dispatch(getRowsAfterAdd(id));  
    navigate(`/trendcrm/order/:${selected[0]}`); 
    return  
  }
  if (selected.length > 1) {
    dispatch(alertMessageUpdate({message: 'idSelectedOne', type: 'warn'}))
    let id = selected[0]
    dispatch(getRowsAfterAdd(id));  
    navigate(`/trendcrm/order/:${selected[0]}`);   
    return
  } else dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'error'}))
}

const handleStatusUpdate=()=>{  
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'status_update', str: true})); 
}

const handleDateSendUpdate =()=>{
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'date_send_update', str: true}));  
}

const isFirstElement = (row)=>{
  if (row.length === 2 &&row[1] === '1' && !row[2]) {
    return true
  } else if (row.length === 3&&row[2] === '1' && !Number(row[1]) ) {
    return true
  } else return false
}

const handleExportExcel=()=>{
  let selected =  sessionStorage.getItem("selected").split(',').filter(
    (id, index, array) => array.indexOf(id) === index);
  let column = [];
  if (selected[0]) {
 column = selected.map((id, ind)=>{ 
if (Number(id)) {
  let col = columns.find(n=>n.id === id)
  let dataForFile = dataForHeader.map(str=>{
    return[ str.str, col[str.id]]
      })
   return Object.fromEntries(dataForFile)
}
 })
  }
      const ws = XLSX.utils.json_to_sheet(column);
      let width = []
      for (const key in ws) {       
        if (isFirstElement(key.split(''))) {
          ws[key].s = {font: {name: '*', sz: 12, bold: true, color: { rgb: "333" }},
          border: {top:{style:'medium'},bottom:{style:'medium'},left:{style:'medium'},right:{style:'medium'}},
          alignment:{wrapText:false}         
        }  
        const max_width = ws[key].v?.length+6 
       width.push({ wch: max_width })
        }        
      }
      ws["!cols"] = width;
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      fileSaver.saveAs(data, 'export' + fileExtension);

}

const successAlert = () => {
  handleClickJustinItem()
  if (selected.length === 0 || !selected) {
    return dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
  }

  withReactContent(Swal).fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете експортувати в Exсel?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так експортувати',
      }).then((result) => {        
        if (result.isConfirmed) {
            handleExportExcel()
          // Swal.fire(
          //   'Створено!',
          //   'ЕН Justin успішно створена',
          //   'success'
          // )
        }
      }); 
}

const handleImportExcel=()=>{
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'open_modal_component', str: true})); 
}

return(

    <Select 
    id="other_menu"
    value={''}
    open={open}
    onClose={()=>openJustin || openNp ?null:setOpen(false)}
    input={<InputBase onClick={handleClickOpen} startAdornment={
   <InputAdornment   position="start">
       <SettingsIcon  sx={svgStyle}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      <MenuItem value={'sms'} sx={listStyle} onMouseEnter={handleHover}>
        <ListItemText onClick={handleClicSms}  primary={'Відправити SMS'} />      
      </MenuItem>

      <MenuItem ref={justinRef} onMouseEnter={handleMouseEnter} value={'ukr_poshta'} sx={listStyle} id={'УкрПошта'} key={'УкрПошта'} >
        <ListItemText  primary={'УкрПошта'} />
        <KeyboardArrowRightOutlinedIcon fontSize='small' sx={{color: '#a0a0a0'}} />
        {open? <Popper
          open={openJustin}
          anchorEl={justinRef.current}
          role={undefined}
          placement="left-start"
          sx={{zIndex: 1301}}
          onMouseLeave={()=>setOpenjustin(false)}
        >   

              <Paper id={'justin_paper'}>
                  <MenuList
                    id="justin_menu"
                    aria-labelledby="composition-button"
                    // onKeyDown={handleListKeyDown}
                    
                  >
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItemCreate}>Створити ЕН</MenuItem>
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>Роздрукувати ЕН</MenuItem>
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>Видалити ЕН</MenuItem>
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>Повернення ЕН</MenuItem>
                  </MenuList>
             
              </Paper>
           </Popper>:null}
      </MenuItem>
      <MenuItem ref={newPostRef} value={'newPost'} onMouseEnter={handleMouseEnterNewPost}  sx={listStyle}>
        <ListItemText   primary={'Нова Пошта'} />
        <KeyboardArrowRightOutlinedIcon fontSize='small' sx={{color: '#a0a0a0'}} />
        { open? <Popper
          open={openNp}
          anchorEl={newPostRef.current}
          role={undefined}
          placement="left-start"
          sx={{zIndex: 1301}}
          onMouseLeave={()=>setOpenNp(false)}
        >  
              <Paper id={'newpost_paper'}>
                  <MenuList
                    id="newpost_menu"
                    aria-labelledby="composition-button"
                                       
                  >
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem} onMouseEnter={()=>setOpenPrint(false)}>Створити ТТН</MenuItem>
                    <MenuItem   ref={printRef}  sx={{fontSize: '14px', alignItems: 'center'}} onClick={handleClickJustinItem} onMouseEnter={()=>setOpenPrint(true)}>Роздрукувати ТТН
                    <KeyboardArrowRightOutlinedIcon fontSize='small' sx={{color: '#a0a0a0', marginLeft: '15px'}} />
                    { open? <Popper
                          open={openPrint}
                          anchorEl={printRef.current}
                          role={undefined}
                          placement="left-start"
                          sx={{zIndex: 1301}}
                          onMouseLeave={()=>setOpenPrint(false)}
                        >   

                          <Paper id={'print_paper'}>
                              <MenuList
                                id="print_menu"
                                aria-labelledby="composition-button"                                    
                           >
                                      <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>pdf</MenuItem>
                                      <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>pdf (зебра)</MenuItem>
                                    </MenuList>
                              
                                </Paper>
                            </Popper>:null}
                    </MenuItem>
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem} onMouseEnter={()=>setOpenPrint(false)}>Видалити ТТН</MenuItem>
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItem}>Повернення ТТН</MenuItem>
                  </MenuList>
             
              </Paper>
           </Popper>:null}
      </MenuItem>
      <MenuItem onMouseEnter={handleHover} onClick={handleUpdateOrders} value={'fixed'} sx={listStyle}  >
        <ListItemText  primary={'Редагувати'} />
      </MenuItem>
      <MenuItem value={'prepay'} onClick={handlePrepayStatus} onMouseEnter={handleHover} sx={listStyle}>
        <ListItemText  primary={'Передплата'} />
      </MenuItem>
       <MenuItem value={'chnge_ststus'} onClick = {handleStatusUpdate} onMouseEnter={handleHover} sx={listStyle} >
        <ListItemText  primary={'Змінити статуси'} />
      </MenuItem>
      <MenuItem value={'schange_date'} onClick={handleDateSendUpdate} onMouseEnter={handleHover} sx={listStyle} >
        <ListItemText  primary={'Змінити дату відправлення'} />
      </MenuItem>
      <MenuItem value={'export_exel'} onClick={successAlert} onMouseEnter={handleHover} sx={listStyle}>
        <ListItemText  primary={'Експотр Exel'} />
      </MenuItem>
      <MenuItem value={'import_exel'} onClick={handleImportExcel}  sx={listStyle} onMouseEnter={handleHover} >
        <ListItemText  primary={'Імпорт Exel'} />
      </MenuItem>
      <MenuItem value={'delete'} sx={listStyle} onMouseEnter={handleHover}>
        <ListItemText  primary={'Видалити'} />
      </MenuItem>

  </Select>

)
}