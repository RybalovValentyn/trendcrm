import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import IconButton from '@mui/material/IconButton';
import { colorsRef } from '../../consts/colorConstants';
import { useDispatch, useSelector,  } from 'react-redux';
import { postRowsFromForm, getRowsAfterAdd, getAllOrders } from '../../redux/asyncThunc';
import { useEffect } from 'react';
import { getClouseTableCreate, getOpenTableCreate } from '../../redux/ordersReduser';

export const SaveButton = () =>{
    const dispatch = useDispatch();
    const id = useSelector((state) => state.ordersAll.createRows.id);

    useEffect(() => {
     if (id !== '') {
        console.log(id);
        // dispatch(getRowsAfterAdd())
        dispatch(getAllOrders());
        dispatch(getClouseTableCreate());
        dispatch(getOpenTableCreate(false));
     }
   }, [id]);


    const btnChangeSave =()=>{
        dispatch(postRowsFromForm())
        console.log('hi');
    }

const icoBtnStyle = {
    color: colorsRef.inputTextColor,
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'block',
    position: 'fixed',
    boxShadow:' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    bottom: '50px',
    right: '66px'
}
    return(

        <IconButton sx={icoBtnStyle} onClick={btnChangeSave} color="primary" aria-label="upload picture" component="label">
        <SaveAsOutlinedIcon />
      </IconButton>
    )
}

