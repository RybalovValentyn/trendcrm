import { Card, CardMedia, Input, FormControlLabel, Checkbox, Button, createTheme, ThemeProvider, Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import s from './header.module.scss';
import { styled } from '@mui/material/styles';
import {sizeConsts} from '../../consts/sizeConst';
import imgLogo from '../../images/logo-hp.svg';

export function BodyContainer({children}) {
    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 545,
            md: 768,
            lg: 1200,
            xl: 1365,
          },
        },
      });

      const Root = styled('div')(({ theme }) => ({
        padding: theme.spacing(1),
        height: '100vh',
        width: '1200px',
        paddingTop: '0px',
        paddinRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        // overflowX: 'skrolx',
        [theme.breakpoints.down('sm')]: {
            maxWidth: sizeConsts.containerWidthBigMobile,
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: sizeConsts.containerSmallTablet,
            backgroundColor: 'transparent',
          },
        [theme.breakpoints.up('md')]: {
         backgroundColor: 'transparent',
          maxWidth: sizeConsts.containerTablet,
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: 'transparent',
          maxWidth: sizeConsts.containerDesktop,
        },
        [theme.breakpoints.up('xl')]: {
            backgroundColor: 'transparent',
            maxWidth: sizeConsts.containerBigDesktop,
          },
      }));

      
    return(
        <header className={s.container}>
        <ThemeProvider theme={theme}>
        <Root>
      <Container  maxWidth="xl" fixed>


{children}

      </Container>
      </Root>
      </ThemeProvider>
        </header>

    )
}