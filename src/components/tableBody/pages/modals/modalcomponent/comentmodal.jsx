import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector,  } from 'react-redux';
// import { forwardRef, useRef } from 'react';
import { getOpenTableCreate } from '../../../../../redux/ordersReduser';

import { useState } from 'react';
import { useEffect } from 'react';
import { autoUpdate} from '../../../../../redux/ordersReduser';
import { setCommentAdd,getFilteredOrders,getAllOrders   } from '../../../../../redux/asyncThunc';
import { ModalComponent } from '../modalComponent';
import { ModalTexteria } from '../../../../inputs/modalTexteria';

 const ComentModalMenu = () =>{
    const dispatch = useDispatch();
    const openDownComent = useSelector((state) => state.ordersAll.modalControl.comentSettings);
    const rowsToUpdate = useSelector((state) => state.ordersAll.rowsToUpdate);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    // const updatedComment = useSelector((state) => state.ordersAll.updatedComment);

const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'comentSettings', str: false}));
  dispatch(autoUpdate({id: 'rowsToUpdate', str:[]}));
}

useEffect(()=>{
  dispatch(autoUpdate({id: 'updatedComment', str: rowsToUpdate?.comment}));
},[openDownComent])


const setHandleupdateInfo =()=>{
  dispatch(setCommentAdd({idComent: rowsToUpdate?.id}));
   dispatch(getOpenTableCreate({id: 'comentSettings', str: false}));
   getUpdate()
};
const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}

const Component = ()=>(
  <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>        
<ModalTexteria />
  </DialogContent>
)
    return(
      <ModalComponent Component={Component} open={openDownComent} sendButtonText={'Зберегти'} titleText={`Kоментарій: ${rowsToUpdate?.id?rowsToUpdate?.id:''}`}
      funcOnSend={setHandleupdateInfo} funcOnClouse={handleClouse} borderHeader={false} borderAction={false} alignAction={true} />
    )
};

export default ComentModalMenu