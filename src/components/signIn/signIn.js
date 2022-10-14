import { Link } from 'react-router-dom';
import s from './signIn.module.scss';
import imgLogo from '../../images/logo-new.png';
import imgLogoMobile from '../../images/logo-mobile.png';
import { useFormik } from 'formik';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {BpCheckbox} from './checkBox';


export function SignIn() {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
      });


function onHoverQuest() {
    console.log('sddddddddddd');
}
function offHoverQuest(params) {
    console.log('1323');
}

    return(

<section className={s.loginForm}>
        <picture>
        <source
          srcSet={imgLogoMobile}
          media="(max-width:768px)"
          type="image/png"
        ></source>
        <source
          srcSet={imgLogo}
          media="(min-width:768px)"
          type="image/png"
        ></source>
        <img src={imgLogo} alt="logoTrendCrm" className={s.imgLogo} />
      </picture>
      <p className={s.signText}>Вхід</p>
      <form className={s.signForm}>
        <label htmlFor="login" className={s.label}>
          <input
            className={s.input}
            id="login"
            name="login"
            type="login"
            // onChange={inputHandler}
            // value={email}
            placeholder="Логін"
            required
          />
        </label>

        <label htmlFor="password" className={s.label}>
          <input
            className={s.input}
            id="password"
            name="password"
            type="password"
            // onChange={inputHandler}
            // value={password}
            placeholder="Пароль"
            required
          />
        </label>
<div className={s.checkBox}>
<BpCheckbox onTouchStart={onHoverQuest}/>
<p>Дозволити використовувати Cookie</p>
<HelpOutlineIcon onMouseEnter={onHoverQuest} onMouseLeave={offHoverQuest} sx={{ fontSize: 17, fontWeight: 900 }}/>
</div>
<button disabled='true' className={s.formButton} type='submit'>Увійти</button>
      </form>   
</section>
    )
}

