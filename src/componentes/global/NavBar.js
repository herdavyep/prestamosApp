import React, { Component } from 'react';
import Header from './Header';
import menuCompras from '../../data/menuCompras';
import menuCuadreDeCaja from '../../data/menuCuadreDeCaja';
import promedios from '../../data/promedios';
import menuVentas from '../../data/menuVentas';
import firebase from 'firebase';
import logo from './images/grano-cafe.png';

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

    render() {
        return (
            <div>
                <Header/>
                <nav className="Nav navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                        {this.state.user.email}
                    </a>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Compras
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item"to="/CrearCompras" href="#">Crear compras</Link>
                                <Link className="dropdown-item"to="VerCompras" href="#">Ver compras</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ventas
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/CrearVentas" href="#">Crear Ventas</Link>
                                <Link className="dropdown-item" to="/VerVentas" href="#">Ver Ventas</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Promedios
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/Promedios" href="#">Promedios</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Cuadre de caja
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/Gastos"href="#">Gastos</Link>
                                <Link className="dropdown-item" to="/Ingresos"href="#">Ingresos</Link>
                                <Link className="dropdown-item" to="/CerrarDia"href="#">Cerrar dia</Link>
                                <Link className="dropdown-item" to="/HistorialDeCierres"href="#">Historial de cierres</Link>
                                </div>
                            </li>
                            </ul>
                            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                                <li className="nav-item active "id="Salir">
                                    <a className="nav-link" href="#" onClick={this.handleLogout} >Salir <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                            
                        
                    </div>
                </nav>
            </div>
        );
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
