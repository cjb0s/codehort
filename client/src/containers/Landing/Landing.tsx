import React from 'react';
import { Link } from 'react-router-dom';
import pong from '../../animations/pong.json';
import { LottieAnimation } from '../../components';

export default function Landing(): JSX.Element {
  return (
    <div className="landing">
      <h1>WELCOME TO CODEHORT!</h1>
      <LottieAnimation lotti={pong} height={300} width={300} />
      <Link to="/login" className="sign-in-up">
        SIGN IN / UP
      </Link>
    </div>
  );
}
