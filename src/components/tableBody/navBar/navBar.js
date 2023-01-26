import {useState, Suspense,useEffect, lazy, useRef} from 'react';
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
const ListItemCategories = lazy(()=> import("./listItem.jsx"));
const CustomizedSnackbars = lazy(()=> import("../../alerts/notification.jsx"));


export function MiniDrawer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state) => state.function.isLoading);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(''); 
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [menuHover, setMenuHover] = useState(null)
  const listUserRouting = useSelector((state) => state.auth.menu_list_access);

useEffect(()=>{
  let current = location.pathname.split('/')
if (current) {
  setCurrentLocation(current[current.length-1])
}
},[location])

const handleDrawerOpen = () => {
    setOpen(!open);
  };

const handleNavigate=(text)=>{
  if (open) {
    setIsOpen(!isOpen);
    setName(text);
  } else if (menuOpen) {
return
  } else return

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
    handleMouseRemove()
   return navigate(route);
   
  } else return 

};

const handleMouse=(e,id)=>{
  if (!open) {  
    setMenuHover(id)
    setMenuOpen(true)

  }
};
const handleMouseRemove=()=>{
  if (!open && menuHover) {
    setMenuOpen(false)
    setMenuHover(null)
  }

}
const handleItemClickMenu=(route)=>{
  if (route) {
    return navigate(route);
   } else return 
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

         <List sx={{marginTop: '50px', overflowX: 'hidden', }}  >
          {mainNavBarItem.map((text, index) => (
            <ListItem onClick={() =>{!text.child?handleItemClick(text.route):handleNavigate(text.route)}} key={text.id} id={text.id} disablePadding 
            sx={{ display: 'block  ', overflowX: 'hidden', position: 'relative' }} onMouseEnter ={(e)=>handleMouse(e,text.id)}
            onMouseLeave ={(e)=>handleMouseRemove(e,text.id)} 
                   >  

              <ListItemButton sx={buttonStyle}>  
             {text.child ? (name===text.route&&isOpen?<RemoveIcon  sx={addStyleIcon} fontSize='small'/>:
             <AddIcon sx={addStyleIcon} fontSize='small'/>): null}
              <ListItemText primary={text.label} sx={textStyle} />
                <ListItemIcon sx={{minWidth: '30px',}}   >
                  {text.item}
                </ListItemIcon>
                
              </ListItemButton>
              {open && <SimpleCollapse name={name} id={text.route} isOpen={isOpen} list={listUserRouting}
              child={text.child} onFunc={handleItemClick} wrawOpen={open} location={currentLocation}/>}

            <Suspense>
            {menuHover===text.id?<ListItemCategories text={text.child?text.child:[{id: text.id, text: text.label, route: text.route, }]}
             open={menuOpen} id={menuHover} onFunc={handleItemClickMenu} location={currentLocation} list={listUserRouting}/>:null}
            </Suspense>

            </ListItem>
          ))}
        </List>

      </Drawer>

      <Suspense fallback={null}>
      {isLoading && <Preloader/>}
        <Outlet/>
      </Suspense>
      
 <Suspense>
  <CustomizedSnackbars/>
 </Suspense>
 {/* <Box id='tost_container' sx={{display: 'block',width: '200px', height: '200px', overflow: 'hidden', 
 position: 'absolute', backgroundColor: 'red', zIndex: 1310, bottom: '20px', right: '20px'}}></Box> */}
    </Box>
  )
}