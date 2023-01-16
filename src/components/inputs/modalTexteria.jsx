import { colorsRef } from '../../consts/colorConstants';
import { useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { autoUpdate } from '../../redux/ordersReduser';


export const ModalTexteria=()=>{
    const dispatch = useDispatch();
    const updatedComment = useSelector((state) => state.ordersAll.updatedComment);

    const handleChange = (e)=>{
         dispatch(autoUpdate({id: 'updatedComment', str: e.target.value}));
    }
    return(
        <textarea
        placeholder='Додайте свій коментар'
        style={{maxWidth: '350px',
        border: `1px solid ${colorsRef.modalInputBorderColor}`,
        borderRadius: '8px',
        width: '350px',
        resize: 'vertical',
        outline: 'none',
        height: '100px'

        }}
        value={updatedComment}
        onChange={handleChange}
        ></textarea>  
    )
}