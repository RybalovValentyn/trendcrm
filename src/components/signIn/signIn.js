import imgLogo from '../../images/logo-new.png';
import imgLogoMobile from '../../images/logo-mobile.png';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardMedia, Input, FormControlLabel, Checkbox, Button, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import {containerSize, TypographyStyle, logoStyle, inputStyle,
     formStyle, checkBoxStyle, iconHelpStyle, buttonStyle} from './styles';
import {useRef, useEffect, useState} from 'react';
import {textTooltip, BootstrapTooltip} from '../alerts/alerts';

export function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const btnRef = useRef();
 
    useEffect(() => {
     btnRef.current.disabled = true
}, []);

function onChecked(e) {
    setChecked(e.target.checked)
    if (login.trim(' ') !== '' && password.trim(' ') !== '') {        
        btnRef.current.disabled = checked
    }

}
const handlerSubmit = e => {
    e.preventDefault();
    if (login.trim(' ') !== '' && password.trim(' ') !== '' && checked) {

    }

  };

const inputHandler = ({ target: { name, value } }) => {
    switch (name) {
      case 'login':
        return setLogin(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
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
                    sx={{fontSize: '13px'}}>
                Дозволити використовувати Cookie
                <BootstrapTooltip title={textTooltip}>
                <HelpOutlineIcon 
                    // onMouseEnter={onHoverQuest} 
                    // onMouseLeave={offHoverQuest} 
                sx={iconHelpStyle}/>
                </BootstrapTooltip>
                </Typography>
             }
            />
        <Button onClick={handlerSubmit} ref={btnRef} sx={buttonStyle} variant="contained" fullWidth={true}>Увійти</Button>
      </Card>
    )
}

