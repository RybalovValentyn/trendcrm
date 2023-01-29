import { InputBase, TextField} from '@mui/material';
import {styled } from '@mui/material/styles';
import { colorsRef } from '../../../../../consts/colorConstants';

export  const StyledTextField = styled(TextField)(({ theme }) => ({        
    "& .Mui-disabled":{
       backgroundColor: '#EEEEEE',
       cursor: 'not-allowed'
     },
       '& .MuiInputBase-input': {
         boxSizing: 'border-box',
         height: '33px',
         borderRadius: '8px',
         position: 'relative',
         fontSize: '13px',
        //  border: `1px solid ${colorsRef.inputHeadBorderColor}`,
         padding: '5px 12px ',
         color: colorsRef.typografyColor, 
         maxWidth: '250px',

   
       },  
   
     }));

export const textFieldStyle={
    '& .MuiOutlinedInput-root':{
            padding: 0,
            maxHeight: '33px',
            borderRadius: '8px',       
             backgroundColor: colorsRef.formBgColor,
            alignItems: 'center',
                              
    },
    };

    export const textFieldStyleMulti={
      '& .MuiOutlinedInput-root':{
              padding: 0,
              maxHeight: '33px',
              owerflow: 'hidden',
               borderRadius: '8px',       
               backgroundColor: colorsRef.formBgColor,
              alignItems: 'center',
                                
      },
      };
export const typoGrafyStyle = {
  fontSize: '14px',
   margin: '10px 0',
    display: 'block',
      '@media (min-width:599px)':
       {textAlign: 'right'  }
}

export const selectStyle={
  // maxWidth: '81px',   
  minWidth: '60px', 
  // marginLeft: '10px',
  maxWidth: '120px',
  width: '100%',
  maxHeight: '32px',
  '& .MuiOutlinedInput-root':{
      padding: 0,
      maxHeight: '33px',
      borderRadius: '8px',       
      alignItems: 'center',
                        
},
  '& .MuiInputBase-input':{
      padding: '5px',
      borderRadius: '8px'
  }

}