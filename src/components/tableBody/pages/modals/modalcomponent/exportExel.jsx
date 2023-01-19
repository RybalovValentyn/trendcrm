import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, alertMessageUpdate, autoUpdate } from '../../../../../redux/ordersReduser';
import { InputFile } from '../../../../inputs/fileInput/fileInput';
import { MenuItem, Select, Box, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { selectStyles } from '../../order/createHead/input';
import { ModalComponent } from '../modalComponent';
import file from '../../../../../tpl/Import template.xlsx';
import { setFileExcelSend, getFilteredOrders,getAllOrders  } from '../../../../../redux/asyncThunc';


const ExportExcelComponent=()=>{
    const dispatch = useDispatch();
    const open = useSelector((state) => state.ordersAll.modalControl.open_modal_component);
    const [url, setUrl] = useState(null)
    const message = useSelector((state) =>state.ordersAll.messageSendFile)
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);

  const handleClouse =(e)=>{
        dispatch(getOpenTableCreate({id: 'open_modal_component', str: false}));
        dispatch(autoUpdate({id: 'messageSendFile', str: ''}));
        if (message === 'Заказы импортированы') {
          getUpdate()
        }
        
      }

  const handleSendFile=()=>{
const element = document.getElementById('uploads');
const selectedFile = element.files[0]
if (selectedFile) {
  dispatch(setFileExcelSend(selectedFile)) 
} else dispatch(alertMessageUpdate({message: 'idSelectedFile', type: 'warn'}))
      
    }
 const getUpdate = ()=>{  
      if (filteredRows?.length > 0) {
        dispatch(getFilteredOrders())
      } else dispatch(getAllOrders())
    }
const Component =()=>(
   
        <DialogContent>
        
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Typography >{'Дія:'}</Typography>
        </Box >
        <InputFile/>

        <Typography >{'Приклад заповнення тіблиці:'}</Typography>
        <ol start='1' style={{margin: '10px', listStyle: '-moz-initial'}} >
          <li style={{margin: '10px'}}>
            <a style={{color: '#1E88E5'}} href='https://docs.google.com/spreadsheets/d/1zhkvEJqd4t3Dy2OWgoucgpxZp0W01Roy/edit#gid=2068782396' target='_blank' rel="noreferrer"> Google таблиця</a>
          </li>
          <li style={{margin: '10px'}}>
            <a style={{color: '#1E88E5'}} href={file} download='Import template.xlsx' > Завантажити приклад (.xlsx)</a>
          </li>
        </ol>
        <Typography  sx={{color: 'red'}}>* - обовязкове поле.</Typography>
        <ul style={{margin: '10px 0px'}}>
          <li>
          <Typography sx={{fontSize: '13px'}}>За замовчуванням:</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>"Статус" - Новий</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>"Відповідальний" - Admin</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>"Контрагент НП" - вибранний в системі.</Typography>
          </li>
        </ul>
        <ul style={{margin: '10px 0px'}}>
          <li>
          <Typography  sx={{fontSize: '13px'}}>Стандартні значення:</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>"Пошта" - 'УкрПошта', 'Нова Пошта'</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>"Спосіб оплати" - 'Наложенний', 'Предплата', 'Оплачено'</Typography>
          </li>
          <li>
          <Typography  sx={{fontSize: '13px'}}>Формат дати - '2021-12-30 24:59:59'</Typography>
          </li>
        </ul>

        <Typography  sx={{fontSize: '13px'}}>Если в системе нет пользователя с именем указаным в поле "Ответственный", 
          создается новый пользователь с логином указаным в поле "Ответственный" и 
          паролем указаным в поле "Ответственный", группой пользователей "Менеджер КЦ".
          Если имя пользователя указано в кирилеце логин будет "user", пароль "name".
        </Typography>
        <Typography  sx={{fontSize: '13px', margin: '10px 0px'}}>"Контрагент НП" учитывается только при заполненном поле "ТТН" и должен быть создан в системе заранее.</Typography>
        <Typography  sx={{fontSize: '13px'}}>Структура поля "Товары*":</Typography>
        <Typography  sx={{fontSize: '13px'}}>Название товара 1 - количество товара 1;</Typography>
        <Typography  sx={{fontSize: '13px'}}>або</Typography>
        <Typography  sx={{fontSize: '13px'}}>&#123; id товара в CRM &#125; - количество товара;</Typography>
        <Typography  sx={{fontSize: '13px',display: 'block', margin: '10px 0px'}}>При импорте страница будет заблокирована до конца импорта.</Typography>
          {message?<Typography  sx={{fontSize: '16px', color: 'red'}}>{message}</Typography>:null}
        </DialogContent> 
    )


    return(

        <ModalComponent Component={Component} funcOnClouse={handleClouse} open={open} closeButtonText={'Закрити'} sendButtonText={'Завантаити'} titleText={"Імпорт замовлень з Excel"}
         funcOnSend={handleSendFile} borderHeader={true} borderAction={false} alignAction={false} isAutoclouse={true} />
       )
};
export default ExportExcelComponent