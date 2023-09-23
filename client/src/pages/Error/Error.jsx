import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Error.module.css'

function Error() {

  return (
    <div className={classes.error}>
        <h1 className={classes.error__title}>Такой страницы не существует.</h1>
        <Link to='/'><h2 className={classes.error__back}>Вернуться на главную</h2></Link>
    </div>
  );
}

export default Error;
