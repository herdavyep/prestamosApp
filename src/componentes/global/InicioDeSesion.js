import React, { Component } from 'react';
import firebase from 'firebase';

import './css/InicioDeSesion.css';

class InicioDeSesion extends Component {
    constructor(){
        super();
        this.state = {
            correo:'',
            contrasena:''
        };

        this.formularioLogin = this.formularioLogin.bind(this);
    }
   
    actualizarCorreo(e) {
        this.setState({
          correo: e.target.value,
    
        });
      }

      actualizarContrasena(e) {
        this.setState({
          contrasena: e.target.value,
    
        });
      }

    login(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.correo, this.state.contrasena)
        .then(result => console.log(`${result.user.email } ha iniciado sesion`))
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode+'   '+errorMessage)
          });
          this.setState({
              correo:'',
              contrasena:''
          })
    }  

    formularioLogin(){
        return(
            <div className="card col-md-6">
            <h1>Ingreso al sistema</h1>
            <br/>
                <form onSubmit={this.login.bind(this)}>
                    <div className="form-group ">
                        <label className="">Correo Electronico</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            placeholder="Ingrese el correo"
                            value={this.state.correo}
                            onChange={this.actualizarCorreo.bind(this)}
                            autoComplete="nombre"/>
                        <small className="form-text text-muted">Nunca compartiremos su correo electrónico con nadie más.</small>
                    </div>
                    <div className="form-group">
                            <label className="">Contraseña</label>
                        <input 
                            className="form-control" 
                            type="password" 
                            placeholder="Ingrese la contraseña"
                            value={this.state.contrasena}
                            onChange={this.actualizarContrasena.bind(this)}
                            autoComplete="nombre"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login.bind(this)}>Enviar</button>
                </form>
            </div>
        )
    }
           

    render(){
        return (
            <div className="">
                {this.formularioLogin()}
            </div>
        );
    }
}
export default InicioDeSesion;
