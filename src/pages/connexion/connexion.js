import React, { PureComponent } from 'react'
import './connexion.scss';
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

const Connexion = () => (
  <div className='connexion'>
    <SignIn />
    <SignUp />
  </div>
);
 
export default Connexion;