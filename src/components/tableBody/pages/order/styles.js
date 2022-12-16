import { colorsRef } from '../../../../consts/colorConstants';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// ordersordersordersordersordersordersordersordersordersordersordersordersordersorders
export const tableBoxStyle= {flexGrow: 1, 
  paddingTop: '47px', 
  maxWidth: '100%',
  overflowX: 'hidden',
   overflowY: 'hidden',
maxHeight: '100%',
 height: '100%',
backgroundColor: colorsRef.boxTableColor,
 paddingBottom: '10px'}


export const tableContainerStyle ={ width: '100%', 
maxHeight: 'calc(95% - 70px)', 
 backgroundColor: '#fff',
  minHeight: '100px',
  paddingBottom: '10px',
   overflowY: 'scroll',
   overflowX: 'scroll', 
  }

export const paperTableStyle = {position: "relative",
width: '98%', 
'@media (max-width:768px)': {
  height: 'calc(90% - 60px)',
},
height: 'calc(90% - 20px)',
 marginLeft: 'auto', 
 marginRight: 'auto',
 overflowY: 'hidden',
 boxShadow: '0px -2px 20px -10px rgb(0 0 0 / 50%)'
}


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

export const dividerSecondStyle = {
      padding: '0.5px',
       width: '100%', 
      position: 'absolute',
       backgroundColor: colorsRef.tableRowSecondColor,
      border: 'none',
  
      };
 export const tHeadStyle = {
    minWidth: '100px',
     whiteSpace: 'nowrap',
     padding: '0px',
     maxWidth: '600px', 
     marginTop: '-1px',
     position: 'relative',
     
   }
export const rowPosition={
  position: '-webkit-sticky',
  position: 'sticky',
  zIndex: 2,
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
// headerheaderheaderheaderheaderheaderheaderheaderheaderheader

export const clasListContainer ={
  width: '100%',
  position: 'relative',
  backgroundColor: colorsRef.boxTableColor,
  '@media (max-width:768px)': {
    display: 'block',
    borderButtom: '1px solid #d0d0d0'
  },
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  paddingLeft: '15px',
  paddingRight: '10px',
  alignItems: 'center',
  color: colorsRef.tabHeaderTextColor
  };

  export const buttonBoxStyle={
    padding: '0px',
    display: 'flex',
    '@media (max-width:768px)': {
      padding: '10px',
      borderBottom: '1px solid #d0d0d0'
    },
    
  }
export const listStyle={
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  '@media (max-width:768px)': {
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'wrap',
  },

}
 export const svgStyle = {
    fill:  colorsRef.inputTextColor,
    marginRight: '-10px',
    


  }

  export const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));