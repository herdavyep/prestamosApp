import React, { Component } from 'react';
import './css/Header.css';
import logo from './images/grano-cafe.png';

class Header extends Component {

  constructor(){
    super();
    this.state = {
      user:''
    }
  }
  _isMounted = false

  /*valor(item,e){
    e.preventDefault();
    this.props.ValorDelMenuPrincipal(item);     
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(this._isMounted){
        this.setState({ 
          user: user 
        });
      }  
    })
  }
  componentWillUnmount(){
    this._isMounted = false

  }
  componentDidMount(){
    this._isMounted = true

  }*/

  render() {
    return (
      <div className="Header">
        <h1 className="Titulo display-4">CoffeeApp</h1>
        <img width="50px" className="Imagen" src={logo} alt="cafe"/>
      </div>
    );
  }
}
/**
 * 
 * <ul className="Menu ">
        <h5 className="User">{this.state.user.email}</h5>
          {items && items.map((item, key) => <li key={key}><a className="navbar-brand" href="#" onClick={this.valor.bind(this,item)}>{item.title}</a></li> )}
        </ul>
 */
export default Header;