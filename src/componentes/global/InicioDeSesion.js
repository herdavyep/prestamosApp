import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';


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
        .then(result => 
    
        swal(result.user.email,"Inicio exitoso!",  "success")                 
    )
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
                        <label className="" htmlFor="correo">Correo Electronico</label>
                        <input 
                            id="correo"
                            className="form-control" 
                            type="email" 
                            placeholder="Ingrese el correo" 
                            value={this.state.correo}
                            onChange={this.actualizarCorreo.bind(this)}
                            autoComplete="nombre"/>
                        <small className="form-text text-muted">Nunca compartiremos su correo electrónico con nadie más.</small>
                    </div>
                    <div className="form-group">
                        <label className="" htmlFor="contrasena">Contraseña</label>
                        <input 
                            id="contrasena"
                            className="form-control" 
                            type="password" 
                            placeholder="Ingrese la contraseña"
                            value={this.state.contrasena}
                            onChange={this.actualizarContrasena.bind(this)}
                            autoComplete="nombre"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.login.bind(this)}>Enviar</button>
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
