import React, { Component } from 'react';
import InicioDeSesion from './global/InicioDeSesion'
import PropTypes from 'prop-types';
import Content from './global/Content';
import NavBar from './global/NavBar';
import firebase from 'firebase';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user:null, 
    };
  }

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        user: user 
      });
    })
  }
  render() {
    const{ children } = this.props;
    if(this.state.user){
        return (
          <div className="App">
            <NavBar/>
            <Content body={children}/>
          </div>
        );           
    }else{
      return(
        <InicioDeSesion/>
      )
    }
  }   
}

export default App;
