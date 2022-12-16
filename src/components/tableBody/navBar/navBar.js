import {Children, useState, useEffect, Suspense} from 'react';
// import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {mainNavBarItem} from './navBarItems';
import {useNavigate, useParams, Outlet} from 'react-router-dom';
import {colorsRef} from '../../../consts/colorConstants';
import { AppBarComponent } from './appBar';
import {openedMixin, closedMixin, AppBar, Drawer} from './styles';
import { Preloader } from '../../preloader/preloader';




export function MiniDrawer() {
  const idRows = useSelector((state) => state?.ordersAll?.createRows?.id);
  const isUpdateRows = useSelector((state) => state.ordersAll.isUpdateRows);
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };


  useEffect(() => {
    if (!Number(idRows)) {
      navigate('/trendcrm/orders')
    } else if(Number(idRows) && isUpdateRows){
      navigate(`/trendcrm/order/${idRows}`)
    }
      
}, [idRows]);

const handleNavigate=(text)=>{
  navigate(text);
  setOpen(false);
}

const drawerStyle = {
  '@media (max-width:768px)': {
    display: open?"block":'none',
    maxWidth: '100%',
    position: 'absolute'
           },
}
  return (
    <Box sx={{ display: 'flex','& .MuiAppBar-root': {boxShadow: 'none !important'}, height: '100vh' }}>
      <CssBaseline />
      <AppBar sx={{maxHeight: '47px',left:0, '& .MuiToolbar-root':{
      minHeight: '47px', borderBottom: '1px solid #d0d0d0'} }} position="fixed" open={open}>
        <Toolbar sx={{backgroundColor: '#fff', }} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 1,
                    }}
          >
            <MenuIcon sx={{fill: '#555555'}}/>
          </IconButton>

          <AppBarComponent/>
        </Toolbar>


      </AppBar>

      <Drawer  variant="permanent" open={open} sx={drawerStyle}>

         <List sx={{paddingTop: '50px'}} >
          {mainNavBarItem.map((text, index) => (
            <ListItem onClick={() =>handleNavigate(text.route)} key={text.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton >
                <ListItemIcon  >
                  {text.item}
                </ListItemIcon>
                <ListItemText primary={text.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>

      {/* <Suspense fallback={<Preloader/>}> */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
 
    </Box>
  )
}