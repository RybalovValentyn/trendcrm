import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const dividerStyle = {
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
    
 export const tHeadStyle = {
    minWidth: '100px',
     whiteSpace: 'nowrap',
     padding: '0px',
     maxWidth: '600px', 
     marginTop: '-1px'
     
   }
export const rowPosition={
  position: '-webkit-sticky',
  position: 'sticky',
  top: '-3px', zIndex: 2
   }  
   
export const ColorButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  fontSize: '14px',
  color: colorsRef.typografyColor,
  fontWeight: 700,
  backgroundColor: colorsRef.buttonStatusBgColor,
  textTransform: 'none',
  boxShadow: 'none',
  padding: '0px 20px',
 height: '32px',
  '&:hover': {
    backgroundColor: '#d7d6d8 ',
    boxShadow: 'none',
     },
}));

export const inputGroupStyle = {maxWidth: '100%',
  display: 'flex',
  justifyContent: 'space-between', 
  padding: '2px 10px',
  alignItems: 'center'
}

export const textStyle = {display: 'block', 
fontSize: '14px',
 width: '50%'
};

 export const buttonStyle={
  border: `1px solid ${colorsRef.buttonBorderInModal}`,
  height: '30px',
  color: colorsRef.buttonTextColorInModal,
  borderRadius: '8px',
  padding: '4px 35px'
}

export const clasListContainer ={
  width: '100%',
  position: 'relative',
  backgroundColor: colorsRef.boxTableColor,
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '15px',
  paddingRight: '10px',
  alignItems: 'center',
  color: colorsRef.tabHeaderTextColor
  };

 export const svgStyle = {
    fill: colorsRef.inputTextColor,
  }