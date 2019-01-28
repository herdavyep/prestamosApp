import React, { Component } from 'react';
import firebase from 'firebase'; 
import swal from 'sweetalert';

import './global/css/CrearPrestamos.css'

class CrearPrestamos extends Component {
    constructor(){
        super();
        this.state={
            fecha:'',
            nombre:'', 
            numCuotas:'',
            monto:'',
            intereses:'',
            valorCuota:12,
            user:'',
            activado:'1'

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

        console.log(e.target.name)
        this.setState({
          nombre: e.target.value   
        });
    }

    actualizarNumCuotas(e) {
        this.setState({
          numCuotas: e.target.value  
        });
    }

    actualizarMonto(e) {
        this.setState({
          monto: e.target.value,
        });   
    }

    actualizarIntereses(e) {
        this.setState({
            intereses: e.target.value
        });
    }

    renderFecha(){       
        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth()+1;
        var year = dt.getFullYear();
        var fecha = (dia+" / "+mes+" / "+year);  
        return(
            <h5>{fecha}</h5>
        )   
    }
  
    renderFormulario(){ 
        return(
            <div className="CrearCompra card col-md-8">
                <h1 className="display-4">Crear prestamo</h1>
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
                        
                        <label htmlFor="NumCuotas">Numero de cuotas</label>
                        <input 
                        type="number"
                        id="NumCuotas"
                        placeholder="Ejemplo: 12, 6, 18"
                        value={this.state.numCuotas}
                        onChange={this.actualizarNumCuotas.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="monto">Valor del prestamo</label>
                        <input 
                        id="monto"
                        type="number"
                        name="monto"
                        placeholder="Ejemplo: 2.000.000"
                        value={this.state.monto}
                        onChange={this.actualizarMonto.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/> <br/>

                        <label htmlFor="intereses">% Intereses</label>
                        <input 
                        id="intereses"
                        type="number" 
                        name="intereses"
                        placeholder="Ejemplo: 3, 5, 10"
                        value={this.state.intereses.toLocaleString('es-CO')}
                        onChange={this.actualizarIntereses.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="form-row">
                    <div className="col">
                    
                        <h4 className="Arrobas">{"Valor de la cuota: $ "+ parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO')}
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
console.log(parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO'));

        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth()+1;
        var year = dt.getFullYear();
        var hora = dt.getHours();
        var minutos = dt.getMinutes();
        var fecha = (dia+"/"+mes+"/"+year);
        var horaExacta = (hora+":"+minutos);

        if(this.state.nombre === ''|| this.state.numCuotas === ''|| this.state.monto === '' || this.state.intereses === ''){
            swal("Campos vacios!", "¡No se puede hacer un prestamo sin datos !", "warning");
        
        }else{
            const record = { 
                fecha: fecha,
                nombre : this.state.nombre,
                numCuotas: this.state.numCuotas*1,
                monto: this.state.monto*1,
                intereses:this.state.intereses*1,
                comision: 0,
                ValorComision:0,
                valorCuota: parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO'),
                user: this.state.user.email,
                horaExacta: horaExacta,
                activado:this.state.activado        
            } 
        
            const dbRef = firebase.database().ref('prestamosJuan/prestamo');
            const newPicture = dbRef.push();
            newPicture.set(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Prestamo exitoso!", "haz click en el boton!", "success");               
                }
            } );
            this.setState({
                nombre:'',
                numCuotas:'',
                monto:'',
                intereses:''
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
export default CrearPrestamos;