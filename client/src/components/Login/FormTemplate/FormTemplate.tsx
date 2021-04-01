import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Login } from '../../../containers';

export default function FormTemplate(props: any): JSX.Element {
  const path: string = useLocation().pathname;
  return (
    <Login>
      <div className="form-template">
        <ul className="form-nav">
          <Link to="/login" className={path === '/login' ? 'active-link' : 'link'}>
            LOG IN
          </Link>
          <Link to="/register" className={path === '/register' ? 'active-link' : 'link'}>
            REGISTER
          </Link>
        </ul>
        {props.children}
      </div>
    </Login>
  );
}
