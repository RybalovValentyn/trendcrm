import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {colorsRef} from '../../consts/colorConstants';
export const textTooltip =  `Наш сайт використовує файли cookies,
 щоб покращити роботу та підвищити ефективність сайту.
  У cookie зберігаються дані та налаштування Вашого облікового запису.
   Вимкнення файлів cookie може призвести до неполадок під час роботи з сайтом.`;

   export const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colorsRef.alertBgColor,
      fontSize: '14px'
    },
  }));
