import { Select, MenuItem, ListItemText, InputBase, InputAdornment, Popper, Paper, MenuList} from '@mui/material';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef, useRef } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { selectStyles, svgStyle, listStyle } from './style';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { getOpenTableCreate } from '../../../../../redux/ordersReduser';
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

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
const navigate = useNavigate();
const dispatch = useDispatch();
const [open, setOpen] = useState(false);
const [openJustin, setOpenjustin] = useState(false);
const justinRef = useRef(null);
const [openNp, setOpenNp] = useState(false);
const newPostRef = useRef(null);
const [openPrint, setOpenPrint]= useState(false);
const printRef = useRef(null);

const handleClickOpen = () => {
if (!open) {
  setOpen(true);
} 
};

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
const handleJustinClosed=()=>{
  if (open) {
    setOpenjustin(false)
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
  handleJustinClosed()
  if (open) {   
    setOpenNp(true)
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
  let selected =  sessionStorage.getItem("selected").split(',');
  if (selected[0]) {
    navigate(`/trendcrm/order/:${selected[0]}`);   
  }
}

const handleStatusUpdate=()=>{  
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'status_update', str: true})); 
}

const handleDateSendUpdate =()=>{
  handleClickJustinItem()
  dispatch(getOpenTableCreate({id: 'date_send_update', str: true}));  
}

const handleExportExcel=()=>{
  console.log('handleExportExcel');
}

const successAlert = () => {
  handleClickJustinItem()
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

return(

    <Select 
    id="other_menu"
    value={''}
    open={open}
    onClose={()=>openJustin?null:setOpen(false)}
    input={<InputBase onClick={handleClickOpen} startAdornment={
   <InputAdornment   position="start">
       <SettingsIcon  sx={svgStyle}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      <MenuItem value={'sms'} sx={listStyle} onMouseEnter={handleJustinClosed} >
        <ListItemText onClick={handleClicSms}  primary={'Відправити SMS'} />      
      </MenuItem>

      <MenuItem ref={justinRef} onMouseEnter={handleMouseEnter} value={'justin'} sx={listStyle} id={'justin'} key={'justin'} >
        <ListItemText  primary={'Justin'} />
        <KeyboardArrowRightOutlinedIcon fontSize='small' sx={{color: '#a0a0a0'}} />
{ open? <Popper
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
      <MenuItem ref={newPostRef} value={'newPost'} onMouseEnter={handleMouseEnterNewPost} sx={listStyle}>
        <ListItemText  primary={'Нова Пошта'} />
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
                    <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItemCreate} onMouseEnter={()=>setOpenPrint(false)}>Створити ТТН</MenuItem>
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
                                      <MenuItem sx={{fontSize: '14px'}} onClick={handleClickJustinItemCreate}>pdf</MenuItem>
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
      <MenuItem onMouseEnter={()=>setOpenNp(false)} onClick={handleUpdateOrders} value={'fixed'} sx={listStyle}  >
        <ListItemText  primary={'Редагувати'} />
      </MenuItem>
      <MenuItem value={'prepay'} onClick={handlePrepayStatus} sx={listStyle}>
        <ListItemText  primary={'Передплата'} />
      </MenuItem>
       <MenuItem value={'chnge_ststus'} onClick = {handleStatusUpdate} sx={listStyle} >
        <ListItemText  primary={'Змінити статуси'} />
      </MenuItem>
      <MenuItem value={'schange_date'} onClick={handleDateSendUpdate} sx={listStyle} >
        <ListItemText  primary={'Змінити дату відправлення'} />
      </MenuItem>
      <MenuItem value={'export_exel'} onClick={successAlert} sx={listStyle}>
        <ListItemText  primary={'Експотр Exel'} />
      </MenuItem>
      <MenuItem value={'import_exel'} sx={listStyle} >
        <ListItemText  primary={'Імпорт Exel'} />
      </MenuItem>
      <MenuItem value={'delete'} sx={listStyle} >
        <ListItemText  primary={'Видалити'} />
      </MenuItem>

  </Select>

)
}