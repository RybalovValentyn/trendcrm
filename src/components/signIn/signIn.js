import imgLogo from '../../images/logo-new.png';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardMedia, Input, FormControlLabel, Checkbox, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import {containerSize, TypographyStyle, logoStyle, inputStyle,
     formStyle, checkBoxStyle, iconHelpStyle, buttonStyle, typographyStyle} from './styles';
import {useRef, useEffect, useState} from 'react';
import {textTooltip, BootstrapTooltip} from '../alerts/alerts';
import {currentThunk} from '../../redux/asyncThunc';
import { useDispatch } from 'react-redux';

export function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [open, setOpen] = useState(false);
    const btnRef = useRef();
    const dispatch = useDispatch();

 
    useEffect(() => {
     btnRef.current.disabled = disabledBtn
}, [disabledBtn]);

function onChecked(e) {
    setChecked(e.target.checked)
    if (login.trim(' ').length > 1 && password.trim(' ').length > 1) {        
        setDisabledBtn(checked)
    }

}
const handlerSubmit = e => {
    e.preventDefault();
    // const user = { email, password };
    dispatch(currentThunk());
    setLogin('');
    setPassword('');
    setDisabledBtn(true);
  };

const inputHandler = ({ target: { name, value } }) => {
    if (login.trim(' ').length >1 && password.trim(' ').length >1 && checked) {
        setDisabledBtn(false)
    } else setDisabledBtn(true)
    switch (name) {
      case 'login':
        return setLogin(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
        setOpen(true);
  };
return(
        <Card sx={containerSize} >
        <CardMedia component="img"image= {imgLogo}  alt="logo"
        sx={logoStyle}
      />
        <Typography component="h2" variant="h2" align="center" sx={TypographyStyle}>
           Вхід
        </Typography>
        <Input value={login}
            required fullWidth id="login"
            onChange={inputHandler}
            placeholder="Логін"
            name="login"
            autoFocus 
            autoComplete="current-login"
            sx={inputStyle} 
            disableUnderline={true}/>

        <Input value={password} 
            onChange={inputHandler}
            required fullWidth 
            name="password"
            placeholder="Пароль" 
            type="password" 
            id="password" 
            autoComplete="current-password"
            sx={inputStyle} 
            disableUnderline={true} />
         <FormControlLabel sx={formStyle} 
            control={<Checkbox 
                onInput ={onChecked} 
                sx={checkBoxStyle} 
                required value="cookie" 
                color="primary" />}
            label={<Typography 
                    component="p" 
                    variant="h5" 
                    align="center" 
                    sx={typographyStyle}>
                Дозволити використовувати Cookie
                <BootstrapTooltip
                 onClose={handleTooltipClose}
                 open={open}
                 onMouseEnter ={handleTooltipOpen}
                onTouchMove ={handleTooltipOpen} 
                onClick = {handleTooltipOpen}
                title={textTooltip}>
                <HelpOutlineIcon 
                sx={iconHelpStyle}/>
                </BootstrapTooltip >
                </Typography>
             }
            />
        <Button  onClick={handlerSubmit} ref={btnRef} sx={buttonStyle} variant="contained" fullWidth={true}>Увійти</Button>
      </Card>
    )
}

