import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

import './global/css/CrearVentas.css'

class CrearVentas extends Component {
    constructor(){
        super();
        this.state={
            fecha:'',
            nombre:'',
            calidad:'Pergamino',
            pesoKilos:'',
            pesoArrobas:'',
            valorUnidad:'',
            total:'',
            user:''

        } 

        this.renderFecha=this.renderFecha.bind(this)
        this.renderFormulario=this.renderFormulario.bind(this)

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

    componentDidMount(e){
        this._isMounted = true
        console.log("cdm")
    }

   componentWillUnmount(){
        console.log("cwu");
        this._isMounted = false
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
          pesoKilos: e.target.value,
        });   
      }

    actualizarValorUnidad(e) {
        this.setState({
          valorUnidad: e.target.value
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
            <div className="CrearVenta card col-md-8">
                <h1 className="display-4">Crear venta</h1>
                {this.renderFecha()}
                <br/>
                <div className="form-row ">
                    <div className="form-group col-md-7">
                        <label htmlFor="nombreCliente">Nombre del cliente</label>
                        <input 
                        type="text"
                        id="nombreCliente"
                        placeholder="Ejemplo: Juan"
                        value={this.state.nombre}
                        onChange={this.actualizarNombre.bind(this)} className="form-control"/> <br/>
                        <label htmlFor="calidad">Calidad</label>
                        <select 
                        id="calidad"
                        value={this.state.calidad}
                        onChange={this.actualizarCalida.bind(this)} className="form-control">
                            <option>Pergamino</option>
                            <option>Cafe verde</option>
                            <option>Pasilla</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="pesoCompra">Peso en kilos</label>
                        <input 
                        id="pesoCompra"
                        type="number"
                        name="peso"
                        placeholder="Ejemplo: 200 o 34.5"
                        value={this.state.pesoKilos}
                        onChange={this.actualizarPeso.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/> <br/>
                        <label htmlFor="valorCompra">Valor unidad</label>
                        <input 
                        id="valorCompra"
                        type="text"
                        name="valorUnidad"
                        placeholder="Ejemplo: 72.000"
                        value={this.state.valorUnidad.toLocaleString('es-CO')}
                        onChange={this.actualizarValorUnidad.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="form-row">
                    <div className="col">
                    
                        <h4 className="Arrobas">{"@ "+
                            //console.log(number.toLocaleString('de-DE'))
                            (this.state.pesoKilos/12.5)}
                        </h4>
                    </div>
                    <div className="col">
                    <h4 className="Total">{"$ "+
                            //console.log(number.toLocaleString('de-DE'))
                            ((this.state.pesoKilos*this.state.valorUnidad)/12.5).toLocaleString('es-CO')}
                        </h4>
                    </div>
                </div>
                <div className="form-row">
                    <div className="BloqueBoton col-md-12 form-group">
                        <button  onClick={this.handleDatabase.bind(this)} className="BotonAceptar btn btn-primary  btn-lg btn-block"><i className="far fa-hand-point-up Icono"></i></button>
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

        if(this.state.pesoKilos === ''|| this.state.valorUnidad === '' ){
            swal("Campos vacios!", "¡No se puede hacer una venta sin datos !", "warning");
        
        }else if(this.state.nombre===''){
            const nombre = 'clientes varios'
            const record = { 
                fecha: fecha,
                nombre : nombre,
                calidad: this.state.calidad,
                pesoKilos: this.state.pesoKilos*1,
                pesoArrobas:this.state.pesoKilos/12.5,
                valorUnidad: this.state.valorUnidad*1,
                total: (this.state.valorUnidad*this.state.pesoKilos)/12.5,
                user: this.state.user.email,
                horaExacta: horaExacta
        
            }

            const dbRef = firebase.database().ref('compraDeCafe/ventas');
            const newPicture = dbRef.push();
            newPicture.set(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Venta exitosa!", "haz click en el boton!", "success");                  
                }
            } );

            this.setState({
                nombre:'',
                pesoKilos:'',
                valorUnidad:'',
                total:''
            })

        } else{
            const record = { 
                fecha: fecha,
                nombre : this.state.nombre,
                calidad: this.state.calidad,
                pesoKilos: this.state.pesoKilos*1,
                pesoArrobas:this.state.pesoKilos/12.5,
                valorUnidad: this.state.valorUnidad*1,
                total: (this.state.valorUnidad*this.state.pesoKilos)/12.5,
                user: this.state.user.email,
                horaExacta: horaExacta
        
            } 
        
            const dbRef = firebase.database().ref('compraDeCafe/ventas');
            const newPicture = dbRef.push();
            newPicture.set(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Venta exitosa!", "haz click en el boton!", "success");               
                }
            } );
            this.setState({
                nombre:'',
                pesoKilos:'',
                valorUnidad:'',
                total:''
            })
       }            
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
export default CrearVentas;