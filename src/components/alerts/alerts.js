import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {colorsRef} from '../../consts/colorConstants';
import {useState} from 'react';

export const textTooltip =  `Наш сайт використовує файли cookies,
 щоб покращити роботу та підвищити ефективність сайту.
  У cookie зберігаються дані та налаштування Вашого облікового запису.
   Вимкнення файлів cookie може призвести до неполадок під час роботи з сайтом.`;

   export const BootstrapTooltip = styled(({ className, ...props }) => (

    <Tooltip  disableFocusListener  {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colorsRef.alertBgColor,
      fontSize: '14px',
      '@media (max-width:600px)': {
        fontSize: '10px',
        maxWidth: '150px'
      },
    },
  }));

  export default function TriggersTooltips() {
    const [open, setOpen] = useState(false);
  
    const handleTooltipClose = () => {
      console.log('sdssssssssss');
      setOpen(false);
    };
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };}