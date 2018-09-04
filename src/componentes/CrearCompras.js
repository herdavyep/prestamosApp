import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

import './global/css/CrearCompras.css'

class CrearCompras extends Component {
    constructor(){
        super();
        this.state={
            fecha:'',
            nombre:'',
            calidad:'Pergamino',
            peso:'',
            valorUnidad:'',
            total:'',
            user:''

        } 

        this.renderFecha=this.renderFecha.bind(this)
        this.renderFormulario=this.renderFormulario.bind(this)



    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            //if(this._isMounted){
                this.setState({ 
                    user: user 
                });
           // }  
        })
    }

    actualizarNombre(e) {
        this.setState({
          nombre: e.target.value   
        });
      }

    actualizarCalida(e) {
        this.setState({
          calidad: e.target.value  
        });
      }

    actualizarPeso(e) {
        this.setState({
          peso: e.target.value,
        });   
      }

    actualizarValorUnidad(e) {
        this.setState({
          valorUnidad: e.target.value,
        });
      }

    renderFecha(){       
        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth();
        var year = dt.getFullYear();
        var fecha = (dia+" / "+mes+" / "+year);  
        return(
            <h5>{fecha}</h5>
        )   
    }
  
    renderFormulario(){
        return(
            <div className="card CrearCompra col-md-8 container">
                <h1 className="display-4">Crear compra</h1>
                <div className="row">
                    <div className="Bloque col-sm">
                        {this.renderFecha()}
                        <br/><br/><br/>
                        <label>Nombre del cliente</label><br/>
                        <input 
                        type="text"
                        placeholder="Ejemplo: Juan"
                        value={this.state.nombre}
                        onChange={this.actualizarNombre.bind(this)}/>
                        <br/><br/>
                        <label>Calidad</label>
                        <br/>
                        <select 
                        value={this.state.calidad}
                        onChange={this.actualizarCalida.bind(this)}>
                            <option>Pergamino</option>
                            <option>Cafe verde</option>
                            <option>Pasilla</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="Bloque col-sm">
                        <br/><br/><br/><br/><br/>
                        <button  onClick={this.handleDatabase.bind(this)} className="BotonAceptar">Aceptar</button>
                        <h5 className="Total">{"$ "+
                            //console.log(number.toLocaleString('de-DE'))
                            (this.state.peso*this.state.valorUnidad).toLocaleString('es-CO')}
                        </h5>
                    </div>
                    <div className="Bloque col-sm">
                        <br/><br/><br/><br/>
                        <label>Peso @</label><br/>
                        <input 
                        type="number"
                        name="peso"
                        placeholder="Ejemplo: 20.52"
                        value={this.state.peso}
                        onChange={this.actualizarPeso.bind(this)}
                        autoComplete="nombre"
                        />
                        <br/><br/>
                        <label>Valor unidad</label><br/>
                        <input 
                        type="number"
                        name="valorUnidad"
                        placeholder="Ejemplo: 72.000"
                        value={this.state.valorUnidad}
                        onChange={this.actualizarValorUnidad.bind(this)}
                        autoComplete="nombre"/>
                    </div>
                </div>
            </div>
        )
    }

    handleDatabase(event){
        event.preventDefault();

        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth()+1;
        var year = dt.getFullYear();
        var hora = dt.getHours();
        var minutos = dt.getMinutes();
        var fecha = (dia+"/"+mes+"/"+year);
        var horaExacta = (hora+":"+minutos);

       
        const record = { 
            fecha: fecha,
            nombre : this.state.nombre,
            calidad: this.state.calidad,
            peso: this.state.peso*1,
            valorUnidad: this.state.valorUnidad*1,
            total: this.state.valorUnidad*this.state.peso,
            user: this.state.user.email,
            horaExacta: horaExacta
      
        } 
      
        const dbRef = firebase.database().ref('compraDeCafe/compras');
        const newPicture = dbRef.push();
        newPicture.set(record
        ,function(error) {
            if (error) {
                console.log(error.message)
            } else {
                swal("Compra exitosa!", "haz click en el boton!", "success");
            }
          } );
        
        this.setState({
            fecha:'',
            nombre:'',
            calidad:'Pergamino',
            peso:'',
            valorUnidad:'',
            total:''
        
        });  
    }

    prueba(e){
        e.preventDefault();
        console.log(this.state.calidad);
    }

    render(){
        return (      
          <div>
              {this.renderFormulario()}
          </div>
                                     
        );
    }
}
export default CrearCompras;