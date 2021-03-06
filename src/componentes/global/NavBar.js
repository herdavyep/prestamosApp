import React, { Component } from 'react';
import Header from './Header';
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

    _isMounted = false

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
    
      } 

  handleLogout(){
    var r = window.confirm("Esta seguro?");
    if (r === true) {
        firebase.auth().signOut()
         .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    } 
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
   
  closeNav() {
    document.getElementById("mySidenav").style.width="0";

  }

    render() { 

        if(this.state.user.uid==="QwbmsCVm1QZWbhM4RFgs9FHXrIv1"){
            return (
                <div>
                    
                    <Header/>
                    <div id="mySidenav" className="sidenav">
                        <a href="#" className="closebtn " onClick={this.closeNav.bind(this)}><i className="fas fa-times navegacion2"></i></a>
                        <span className="nav-link user">{this.state.user.email}</span>
                        <Link className="nav-link navegacion2"to="/CrearPrestamos" href="#"><span className="navegacion2" >Crear prestamos</span> </Link>
                        <Link className="nav-link navegacion2"to="VerPrestamos" href="#"><span className="navegacion2">Ver prestamos</span></Link>
                        <Link className="nav-link navegacion2"to="Registro" href="#"><span className="navegacion2">Registrar usuarios</span></Link>
                        <a className="nav-link navegacion2" href="#" onClick={this.handleLogout} ><span className="navegacion2">Salir</span>  <span className="sr-only">(current)</span></a>
                    </div>
                    <div className="fondo">
                        <span className="MenuBarras" onClick={this.openNav.bind(this)}><i className="fas fa-bars Icono"></i></span>
                    </div>
                </div>
            );
        }else{
            return(
                <div>
                    
                    <Header/>
                    <div id="mySidenav" className="sidenav">
                        <a href="#" className="closebtn " onClick={this.closeNav.bind(this)}><i className="fas fa-times navegacion2"></i></a>
                        <span className="nav-link user">{this.state.user.email}</span>
                        <Link className="nav-link navegacion2"to="/CrearPrestamos" href="#"><span className="navegacion2" >Crear prestamos</span> </Link>
                        <a className="nav-link navegacion2" href="#" onClick={this.handleLogout} ><span className="navegacion2">Salir</span>  <span className="sr-only">(current)</span></a>
                    </div>
                    <div className="fondo">
                        <span className="MenuBarras" onClick={this.openNav.bind(this)}><i className="fas fa-bars Icono"></i> Menu</span>
                    </div>
                </div>

            );
        }

        
    }
}

/**
 * <Header ValorDelMenuPrincipal={this.contenidoDelNavBar.bind(this)}/>
 {this.state.menuGeneral && this.state.menuGeneral.map((item, key) => <Link to={item.url} className="menuGeneral " key={key} href="#" >{item.title}</Link> )}
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
 * 
 */

export default NavBar;
