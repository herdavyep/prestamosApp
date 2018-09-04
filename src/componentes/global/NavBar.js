import React, { Component } from 'react';
import Header from './Header';
import menuCompras from '../../data/menuCompras';
import menuCuadreDeCaja from '../../data/menuCuadreDeCaja';
import promedios from '../../data/promedios';
import menuVentas from '../../data/menuVentas';
import firebase from 'firebase';

import { Link } from 'react-router-dom';

import './css/NavBar.css';

class NavBar extends Component {
    constructor(){
        super();
        this.state = {
            menuGeneral:[],
            user:''
        };
    
        this.handleLogout = this.handleLogout.bind(this);
    }

    contenidoDelNavBar(item){
        switch (item.title) {
            case "Compras":
                this.setState({
                    menuGeneral:menuCompras
                })
                break;
            case "Ventas":
                this.setState({
                    menuGeneral:menuVentas
                })            
                break;
            case "Promedios":
                this.setState({
                    menuGeneral:promedios
                })
                break;  
            case "Cuadre de caja":
                this.setState({
                    menuGeneral:menuCuadreDeCaja
                })
                break;  
            case "Salir":
                this.handleLogout();
                break;  
            default:
                break;    
        }

    }

  handleLogout(){
    var r = window.confirm("Esta seguro?");
    if (r === true) {
        firebase.auth().signOut()
         .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    } 
  }

    render() {
        return (
            <div>
                <Header ValorDelMenuPrincipal={this.contenidoDelNavBar.bind(this)}/>
                <nav className="NavBar nav">
                    {this.state.menuGeneral && this.state.menuGeneral.map((item, key) => <Link to={item.url} className="menuGeneral " key={key} href="#" >{item.title}</Link> )}
                </nav>
            </div>
        );
    }
}

export default NavBar;
