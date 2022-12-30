import {useState, Suspense,useEffect, lazy} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {mainNavBarItem} from './navBarItems';
import {useNavigate,Outlet,useLocation} from 'react-router-dom';
import {colorsRef} from '../../../consts/colorConstants';
import { AppBar, Drawer} from './styles';
import { Preloader } from '../../preloader/preloader';
import {useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SimpleCollapse from './listDrawer';
import RemoveIcon from '@mui/icons-material/Remove';

const AppBarComponent = lazy(() => import("./appBar.js"));



export function MiniDrawer() {
  // console.log('MiniDrawer');
  // const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state) => state.function.isLoading);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [colorLink, setColorLink] = useState('')

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

const handleNavigate=(text)=>{
  if (open) {
    setIsOpen(!isOpen);
    setName(text);
  } else navigate(text);

  return text
}

const drawerStyle = {
  direction:'rtl',
  overflowY:'auto', 

    '@media (min-width:768px)': {
    '& ::-webkit-scrollbar': {
      width: '5px',
      color: '#B0C4FF',
      marginTop: '100px'
    },
   ' & ::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #B0C4FF',
      borderRadius: '10px',
      color: '#f4f4f4',
      },
   '& ::-webkit-scrollbar-thumb': {
    background: '#c2c5c8',
    marginTop: '100px',
    '& ::hover':{
      background: '#9fdce8',
      cursor: 'pointer',
    },
      
    },
           },

  '@media (max-width:768px)': {
    display: open?"block":'none',
    maxWidth: '100%',
    position: 'absolute',
           },
}

const addStyleIcon={
  color: colorsRef.drawerTextColor,
   opacity: open ? 1 : 0,
   overflowX: 'hidden',
   width: open ? '10%' : 0,
  

}

const textStyle={
     opacity: open ? 1 : 0,
     width: open ? '100%' : 0,
     marginLeft: '10px',      
     '& .MuiTypography-root':{
    fontSize: '14px', 
    color: colorsRef.drawerTextColor,
    overflowX: 'hidden'
}  
}
const buttonStyle={
padding: '5px 0 5px 5px',
 overflowX: 'hidden',
 minWidth: '100%',
}

const handleItemClick=(route)=>{
  if (route) {
   return navigate(route);
  } else return
  

};

const handleMouse=(id)=>{
  console.log(open);
}
  return (
    <Box sx={{ display: 'flex','& .MuiAppBar-root': {boxShadow: 'none !important'}, height: '100vh' }}>
      <CssBaseline />
      <AppBar sx={{maxHeight: '47px',left:0, '& .MuiToolbar-root':{
      minHeight: '47px', borderBottom: '1px solid #d0d0d0', paddingLeft: '15px', paddingRight: '10px'},   }} position="fixed" open={open}>
        <Toolbar sx={{backgroundColor: '#fff', }} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 1,
                    }}
          >
            <MenuIcon sx={{fill: colorsRef.svgColor}}/>
          </IconButton>
          <Suspense>
          <AppBarComponent/>
          </Suspense>
        </Toolbar>
      </AppBar>

      <Drawer  variant="permanent" open={open} sx={drawerStyle}>

         <List sx={{paddingTop: '50px', overflowX: 'hidden', }} >
          {mainNavBarItem.map((text, index) => (
            <ListItem onClick={() =>{!text.child?handleItemClick(text.route):handleNavigate(text.route)}} key={text.id} disablePadding 
            sx={{ display: 'block  ', overflowX: 'hidden' }}>  

              <ListItemButton sx={buttonStyle}>  
             {text.child ? (name===text.route&&isOpen?<RemoveIcon  sx={addStyleIcon} fontSize='small'/>:<AddIcon sx={addStyleIcon} fontSize='small'/>): null}
              <ListItemText primary={text.label} sx={textStyle} />
                <ListItemIcon sx={{minWidth: '30px',}} onMouseMove={()=>handleMouse(text.id)}  >
                  {text.item}
                </ListItemIcon>
                
              </ListItemButton>
              <SimpleCollapse name={name} id={text.route} isOpen={isOpen} child={text.child} onFunc={handleItemClick} wrawOpen={open}/>
              
              {/* <ListItemButton sx={{padding: '2px 0 2px 5px'}}>
              <ListItemText primary={text.label} sx={{ opacity: open ? 1 : 0, marginLeft: '10px',  }} />
                <ListItemIcon sx={{minWidth: '30px',}}  >
                  {text.item}
                </ListItemIcon>
                
              </ListItemButton> */}
            </ListItem>
          ))}
        </List>

      </Drawer>

      <Suspense fallback={null}>
      {isLoading && <Preloader/>}
        <Outlet/>
      </Suspense>
 
    </Box>
  )
}