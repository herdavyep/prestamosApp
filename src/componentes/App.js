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

  is_mouted=false

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        user: user 
      });
    })
    this.is_mouted=true
  }
  componentDidMount(){
    
  }

  componentWillUnmount(){
    this.is_mouted=false
  }

  render() {
    const{ children } = this.props;
    if(this.state.user && this.is_mouted){
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
