import React from 'react';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Connexion from './pages/connexion/connexion';
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component{

  unsubscribeFromAuth = null

  componentDidMount(){
    console.log(this.props)
    const {setCurrentUser} = this.props;
    console.log(setCurrentUser)
    this.unsubscribeFromAuth = 
    auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot =>{
          this.props.setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
          });
        })
      }
        setCurrentUser(userAuth)
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />):(<Connexion />)} />
      </Switch>
    </div>
  );
  }
};

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
 