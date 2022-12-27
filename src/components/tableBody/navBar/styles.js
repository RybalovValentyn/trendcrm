import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { colorsRef } from "../../../consts/colorConstants";

const drawerWidth = 200;
export const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',   
    direction:'rtl',
    overflowY:'auto', 
    '@media (max-width:768px)': {
       width: '100%',
     },
  });
  
  export const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    direction:'rtl',
    overflowY:'auto',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  
  export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,

      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export const selectStyles ={
  '& .MuiInputBase-input': {
    // maxHeight: '32px',
    lineHeight: 1.5,
  borderRadius: '8px',
  color: colorsRef.inputTextColor,
  position: 'relative',
  fontSize: 13,
  padding: '5px 0px',

},
'& .MuiOutlinedInput-root':{
  padding: '0px !important',
  paddingLeft: '14px',
  color: '#fff'
},


};

export const logoStyle = {
  width: '167px',
  height: '40px',
  cursor: 'pointer',
  '@media (max-width:768px)': {
      height: '30px',
      width: '180px',
    },
  marginLeft: '10px',
  objectFit: 'contain'
};

export const mediaUserList ={
  maxWidth: '130px',
  height: '45px',
  '@media (max-width:768px)': {    
    padding: '7px 30px 7px 15px',
     maxHeigth: '45px',
     marginLeft: 'auto', 
     marginRight: 'auto',
           },
  
  padding: '8px 30px 8px 15px', 
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  


};

export  const boxListStyle={
      position: 'absolute',
      top: '103%', 
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
justifyContent: 'space-between',
paddingBottom: '10px',
      '@media (min-width:768px)': {
          display: 'none'
                 },
      
  }

  export const mediaUserBoxStyle={
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '130px',
      height: '45px',
      padding: '7px 30px 7px 15px',
      
      color: "#eeeeee",
  };

  export const  mediaUserListStyle = {
  padding: '0px',
  "& li":{backgroundColor: '#fff',},
"& :hover":{cursor: 'pointer', backgroundColor: '#fff'},

  }

  // AppAppAppAppAppAppAppAppAppAppAppAppAppAppAppAppAppAppApp

 export const navlogoStyle ={
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '@media (max-width:768px)': {
        display: 'none',
        width: 0,
        height: 0
      },
}

export const navListStyle={
    display: 'flex',
     justifyContent: 'space-between',
     '@media (max-width:768px)': {
marginLeft: 'auto'
      },
};
export const mediaIconLogoList ={
        display: 'none',
        cursor: 'pointer',
     '@media (max-width:768px)': {
       display: 'block',
       heigth: '100%',
       width: '54px',
        padding: '5px 15px',
              },
};
