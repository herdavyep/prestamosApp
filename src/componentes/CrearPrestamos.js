import React, { Component } from 'react';
import firebase from 'firebase'; 
import swal from 'sweetalert';
import moment from 'moment';

import './global/css/CrearPrestamos.css'

class CrearPrestamos extends Component {
    constructor(){
        super();
        this.state={
            fecha:'',
            inputFecha:'',
            nombre:'', 
            numCuotas:'',
            monto:'',
            intereses:'',
            valorCuota:12,
            user:'',
            activado:'1',
            apellidos:'',
            numeroCedula:'',
            ciudad:'',
            direccion:'',
            telefono:'',
            nombreEmpresa:'',
            sueldo:'',
            direccionEmpresa:'',
            telefonoEmpresa:'',
            actividadIndependiente:'',
            ciudadActividadIndependiente:'',
            ingresoActiIndep:'',
            NRP1:'',
            DRP1:'',
            telefonoRP1:'',
            NRP2:'',
            DRP2:'',
            telefonoRP2:'',
            NRF1:'',
            PRF1:'',
            DRF1:'',
            telefonoRF1:'',
            NRF2:'',
            PRF2:'',
            DRF2:'',
            telefonoRF2:'',


        } 

        this.renderFecha=this.renderFecha.bind(this);
        this.renderFormularioBasico=this.renderFormularioBasico.bind(this);
        this.renderFormularioExtendido=this.renderFormularioExtendido.bind(this);
        this.validarIngresoTexto=this.validarIngresoTexto.bind(this);
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

    // inicio form basico
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
    actualizarInputFecha(e){
        this.setState({
            inputFecha: e.target.value
        });
    }
    // fin form basico

    // inicio form extend
    actualizarApellidos(e){
        this.setState({
            apellidos: e.target.value
        });
    }

    actualizarNumeroCedula(e){
        this.setState({
            numeroCedula: e.target.value
        });
    }

    actualizarCiudad(e){
        this.setState({
            ciudad: e.target.value
        });
    }

    actualizarDireccion(e){
        this.setState({
            direccion: e.target.value
        });
    }

    actualizarTelefono(e){
        this.setState({
            telefono: e.target.value
        });
    }

    actualizarNombreEmpresa(e){
        this.setState({
            nombreEmpresa: e.target.value
        });
    }

    actualizarSueldo(e){
        this.setState({
            sueldo: e.target.value
        });
    }

    actualizarDireccionEmpresa(e){
        this.setState({
            direccionEmpresa: e.target.value
        });
    }

    actualizarTelefonoEmpresa(e){
        this.setState({
            telefonoEmpresa: e.target.value
        });
    }

    actualizarActividadIndependiente(e){
        this.setState({
            actividadIndependiente: e.target.value
        });
    }

    actualizarIngresoActividadIndependiente(e){
        this.setState({
            ingresoActiIndep: e.target.value
        });
    }

    actualizarCiudadActividadIndependiente(e){
        this.setState({
            ciudadActividadIndependiente: e.target.value
        });
    }

    actualizarNRP1(e){
        this.setState({
            NRP1: e.target.value
        });
    }

    actualizarDRP1(e){
        this.setState({
            DRP1: e.target.value
        });
    }

    actualizarTelefonoRP1(e){
        this.setState({
            telefonoRP1: e.target.value
        });
    }

    actualizarNRP2(e){
        this.setState({
            NRP2: e.target.value
        });
    }

    actualizarDRP2(e){
        this.setState({
            DRP2: e.target.value
        });
    }

    actualizarTelefonoRP2(e){
        this.setState({
            telefonoRP2: e.target.value
        });
    }

    actualizarNRF1(e){
        this.setState({
            NRF1: e.target.value
        });
    }

    actualizarDRF1(e){
        this.setState({
            DRF1: e.target.value
        });
    }

    actualizarParentesoRF1(e){
        this.setState({
            PRF1: e.target.value
        });
    }

    actualizarTelefonoRF1(e){
        this.setState({
            telefonoRF1: e.target.value
        });
    }

    actualizarNRF2(e){
        this.setState({
            NRF2: e.target.value
        });
    }

    actualizarDRF2(e){
        this.setState({
            DRF2: e.target.value
        });
    }

    actualizarParentesoRF2(e){
        this.setState({
            PRF2: e.target.value
        });
    }

    actualizarTelefonoRF2(e){
        this.setState({
            telefonoRF2: e.target.value
        });
    }

    // fin form extend

    renderFecha(){       
        
        return(
            <div>
                <label htmlFor="inputFecha">Fecha prestamo *</label>
                <input className="form-control inputFecha" type="date" name="inputFecha" id="inputFecha" onChange={this.actualizarInputFecha.bind(this)} value={this.state.inputFecha}/>
            </div>

        )   
    }
  
    renderFormularioBasico(){ 
        return(
            <div className="CrearCompra card col-md-8">
            <div className="Closh4">
                <h1 className="display-5 losh4">Datos de prestamo</h1></div><br/>
                <span className="spanObligatorios">Los campos con * son obligatorios</span><br/>
                {this.renderFecha()}
                <br/>
                <div className="form-row ">
                    <div className="form-group col-md-7">

                        <label htmlFor="nombreCliente">Nombre del cliente *</label>
                        <input 
                        type="text"
                        id="nombreCliente"
                        placeholder="Ejemplo: Juan"
                        value={this.state.nombre}
                        onChange={this.actualizarNombre.bind(this)} className="form-control"/> <br/>
                        
                        <label htmlFor="NumCuotas">Numero de cuotas *</label>
                        <input 
                        type="number"
                        id="NumCuotas"
                        placeholder="Ejemplo: 12, 6, 18"
                        value={this.state.numCuotas}
                        onChange={this.actualizarNumCuotas.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="monto">Valor del prestamo *</label>
                        <input 
                        id="monto"
                        type="number"
                        name="monto"
                        placeholder="Ejemplo: 2.000.000"
                        value={this.state.monto}
                        onChange={this.actualizarMonto.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/> <br/>

                        <label htmlFor="intereses">% Intereses *</label>
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

    renderFormularioExtendido(){

        return(
            <div className="CrearCompra card col-md-8">
                <div className="Closh4">  
                <h1 className="display-6 losh4">Datos personales</h1></div>
                <br/>
                <div className="form-row ">
                    <div className="form-group col-md-4">
                        <label htmlFor="Apellidos">Apellidos</label>
                        <input 
                        type="text"
                        id="Apellidos"
                        placeholder="Ejemplo: Gallego"
                        value={this.state.apellidos}
                        onChange={this.actualizarApellidos.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="cedula">Numero de cedula</label>
                        <input 
                        type="text"
                        id="cedula"
                        placeholder="Ejemplo: 31234765"
                        value={this.state.numeroCedula}
                        onChange={this.actualizarNumeroCedula.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Ciudad">Ciudad</label>
                        <input 
                        id="Ciudad"
                        type="text"
                        placeholder="Ejemplo: Pereira"
                        value={this.state.ciudad}
                        onChange={this.actualizarCiudad.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/> 
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Direccion">Direccion</label>
                        <input 
                        id="Direccion"
                        type="text" 
                        placeholder="Ejemplo: cra 5 # 23-98"
                        value={this.state.direccion}
                        onChange={this.actualizarDireccion.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Telefono">Telefono</label>
                        <input 
                        id="Telefono"
                        type="text" 
                        placeholder="Ejemplo: 3103456565"
                        value={this.state.telefono}
                        onChange={this.actualizarTelefono.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="Closh4">  
                <h1 className="display-6 losh4">Datos laborales</h1></div>
                <div className="form-row ">
                    <div className="form-group col-md-6">

                        <label htmlFor="NombreEmpresa">Nombre empresa</label>
                        <input 
                        type="text"
                        id="NombreEmpresa"
                        placeholder="Ejemplo: Ecopetrol"
                        value={this.state.nombreEmpresa}
                        onChange={this.actualizarNombreEmpresa.bind(this)} className="form-control"/> <br/>
                        
                        <label htmlFor="Sueldo">Sueldo</label>
                        <input 
                        type="text"
                        id="Sueldo"
                        placeholder="Ejemplo: 900.000"
                        value={this.state.sueldo}
                        onChange={this.actualizarSueldo.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">

                        <label htmlFor="DireccionEmpresa">Direccion Empresa</label>
                        <input 
                        id="DireccionEmpresa"
                        type="text" 
                        placeholder="Ejemplo: cra 5 # 23-98"
                        value={this.state.direccionEmpresa}
                        onChange={this.actualizarDireccionEmpresa.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/> <br/>

                        <label htmlFor="TelefonoEmpresa">Telefono Empresa</label>
                        <input 
                        id="TelefonoEmpresa"
                        type="text" 
                        placeholder="Ejemplo: 3103456565"
                        value={this.state.telefonoEmpresa}
                        onChange={this.actualizarTelefonoEmpresa.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="Closh4">  
                <h1 className="display-6 losh4">Datos actividad economica independiente</h1></div>
                <div className="form-row ">
                    <div className="form-group col-md-4">

                        <label htmlFor="ActividadEconomica">Actividad economica</label>
                        <input 
                        type="text"
                        id="ActividadEconomica"
                        placeholder="Ejemplo: Comerciante"
                        value={this.state.actividadIndependiente}
                        onChange={this.actualizarActividadIndependiente.bind(this)}                         
                        autoComplete="nombre"
                        className="form-control"/> <br/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="ingresoAct">Ingreso actividad independiente</label>
                        <input 
                        type="text"
                        id="ingresoAct"
                        placeholder="Ejemplo: 900.000"
                        value={this.state.ingresoActiIndep}
                        onChange={this.actualizarIngresoActividadIndependiente.bind(this)}                         
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">

                        <label htmlFor="CiudadActv">Ciudad</label>
                        <input 
                        id="CiudadActv"
                        type="text" 
                        placeholder="Ejemplo: Armenia"
                        value={this.state.ciudadActividadIndependiente}
                        onChange={this.actualizarCiudadActividadIndependiente.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="Closh4">  
                <h1 className="display-6 losh4">Referencias personales</h1></div>
                <div className="form-row ">
                    <div className="form-group col-md-4">

                        <label htmlFor="NombreCompletoRP1">Nombre completo</label>
                        <input 
                        type="text"
                        id="NombreCompletoRP1"
                        placeholder="Ejemplo: Arbey castaño"
                        value={this.state.NRP1}
                        onChange={this.actualizarNRP1.bind(this)} className="form-control"/> <br/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="DireccionRP1">Direccion</label>
                        <input 
                        type="text"
                        id="DireccionRP1"
                        placeholder="Ejemplo: Cra 4 # 4-9"
                        value={this.state.DRP1}
                        onChange={this.actualizarDRP1.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">

                        <label htmlFor="TelefonoRP1">Telefono</label>
                        <input 
                        id="TelefonoRP1"
                        type="text" 
                        placeholder="Ejemplo: 3120009987"
                        value={this.state.telefonoRP1}
                        onChange={this.actualizarTelefonoRP1.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="form-row ">
                    <div className="form-group col-md-4">

                        <label htmlFor="NombreCompletoRP2">Nombre completo</label>
                        <input 
                        type="text"
                        id="NombreCompletoRP2"
                        placeholder="Ejemplo: Arbey castaño"
                        value={this.state.NRP2}
                        onChange={this.actualizarNRP2.bind(this)} className="form-control"/> <br/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="DireccionRP2">Direccion</label>
                        <input 
                        type="text"
                        id="DireccionRP2"
                        placeholder="Ejemplo: Cra 4 # 4-9"
                        value={this.state.DRP2}
                        onChange={this.actualizarDRP2.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">

                        <label htmlFor="TelefonoRP2">Telefono</label>
                        <input 
                        id="TelefonoRP2"
                        type="text" 
                        placeholder="Ejemplo: 3120009987"
                        value={this.state.telefonoRP2}
                        onChange={this.actualizarTelefonoRP2.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>
                <div className="Closh4">  
                <h1 className="display-6 losh4">Referencias Familiares</h1></div>
                <div className="form-row ">
                    <div className="form-group col-md-3">

                        <label htmlFor="NombreCompletoRf1">Nombre completo</label>
                        <input 
                        type="text"
                        id="NombreCompletoRf1"
                        placeholder="Ejemplo: Arbey castaño"
                        value={this.state.NRF1}
                        onChange={this.actualizarNRF1.bind(this)} className="form-control"/> <br/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="Parentesco1">Parentesco</label>
                        <input 
                        type="text"
                        id="Parentesco1"
                        placeholder="Ejemplo: primo"
                        value={this.state.PRF1}
                        onChange={this.actualizarParentesoRF1.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="DireccionRf1">Direccion</label>
                        <input 
                        type="text"
                        id="DireccionRf1"
                        placeholder="Ejemplo: Cra 4 # 4-9"
                        value={this.state.DRF1}
                        onChange={this.actualizarDRF1.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">

                        <label htmlFor="TelefonoRf1">Telefono</label>
                        <input 
                        id="TelefonoRf1"
                        type="text" 
                        placeholder="Ejemplo: 3120009987"
                        value={this.state.telefonoRF1}
                        onChange={this.actualizarTelefonoRF1.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
                    </div>
            
                </div>

                <div className="form-row ">
                    <div className="form-group col-md-3">

                        <label htmlFor="NombreCompletoRf2">Nombre completo</label>
                        <input 
                        type="text"
                        id="NombreCompletoRf2"
                        placeholder="Ejemplo: Arbey castaño"
                        value={this.state.NRF2}
                        onChange={this.actualizarNRF2.bind(this)} className="form-control"/> <br/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="Parentesco2">Parentesco</label>
                        <input 
                        type="text"
                        id="Parentesco2"
                        placeholder="Ejemplo: primo"
                        value={this.state.PRF2}
                        onChange={this.actualizarParentesoRF2.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="DireccionRf2">Direccion</label>
                        <input 
                        type="text"
                        id="DireccionRf2"
                        placeholder="Ejemplo: Cra 4 # 4-9"
                        value={this.state.DRF2}
                        onChange={this.actualizarDRF2.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">

                        <label htmlFor="TelefonoRf2">Telefono</label>
                        <input 
                        id="TelefonoRf2"
                        type="text" 
                        placeholder="Ejemplo: 3120009987"
                        value={this.state.telefonoRF2}
                        onChange={this.actualizarTelefonoRF2.bind(this)}
                        autoComplete="nombre"
                        className="form-control"/>
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
    validarIngresoTexto(v){
        var x=""
        if(v === ''){

            x = ""
        }else{
            
            x = v
        }
        return x;
    }

    handleDatabase(event){
        event.preventDefault();

        var apellidos=this.validarIngresoTexto(this.state.apellidos);
        var numeroCedula=this.validarIngresoTexto(this.state.numeroCedula);
        var ciudad=this.validarIngresoTexto(this.state.ciudad);
        var direccion=this.validarIngresoTexto(this.state.direccion);
        var telefono=this.validarIngresoTexto(this.state.telefono);
        var nombreEmpresa=this.validarIngresoTexto(this.state.nombreEmpresa);
        var sueldo=this.validarIngresoTexto(this.state.sueldo);
        var direccionEmpresa=this.validarIngresoTexto(this.state.direccionEmpresa);
        var telefonoEmpresa=this.validarIngresoTexto(this.state.telefonoEmpresa);
        var actividadIndependiente=this.validarIngresoTexto(this.state.actividadIndependiente);
        var ciudadActividadIndependiente=this.validarIngresoTexto(this.state.ciudadActividadIndependiente);
        var ingresoActiIndep=this.validarIngresoTexto(this.state.ingresoActiIndep);
        var NRP1=this.validarIngresoTexto(this.state.NRP1);
        var DRP1=this.validarIngresoTexto(this.state.DRP1);
        var telefonoRP1=this.validarIngresoTexto(this.state.telefonoRP1);
        var NRP2=this.validarIngresoTexto(this.state.NRP2);
        var DRP2=this.validarIngresoTexto(this.state.DRP2);
        var telefonoRP2=this.validarIngresoTexto(this.state.telefonoRP2);
        var NRF1=this.validarIngresoTexto(this.state.NRF1);
        var PRF1=this.validarIngresoTexto(this.state.PRF1);
        var DRF1=this.validarIngresoTexto(this.state.DRF1);
        var telefonoRF1=this.validarIngresoTexto(this.state.telefonoRF1);
        var NRF2=this.validarIngresoTexto(this.state.NRF2);
        var PRF2=this.validarIngresoTexto(this.state.PRF2);
        var DRF2=this.validarIngresoTexto(this.state.DRF2);
        var telefonoRF2=this.validarIngresoTexto(this.state.telefonoRF2);

        var dt = new Date();
        var hora = dt.getHours();
        var minutos = dt.getMinutes();
        var horaExacta = (hora+":"+minutos);

        if(this.state.nombre === ''|| this.state.numCuotas === ''|| this.state.monto === '' || this.state.intereses === ''){
            swal("Campos vacios!", "¡No se puede hacer un prestamo sin datos !", "warning");
        
        }else{
            const record = { 
                fecha: this.state.inputFecha,
                nombre : this.state.nombre,
                numCuotas: this.state.numCuotas*1,
                cuotasPagas: 0,
                monto: this.state.monto*1,
                intereses:this.state.intereses*1,
                comision: 0,
                ValorComision:0,
                valorCuota: parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas),
                user: this.state.user.email,
                userUid:this.state.user.uid,
                horaExacta: horaExacta,
                activado:this.state.activado,
                nombre_activado: this.state.nombre+"_"+this.state.activado ,   
                apellidos:apellidos,
                nombreEmpresa:nombreEmpresa,
                numeroCedula:numeroCedula,
                ciudad:ciudad,
                direccion:direccion,
                telefono:telefono,
                sueldo:sueldo,
                direccionEmpresa:direccionEmpresa,
                telefonoEmpresa:telefonoEmpresa,
                actividadIndependiente:actividadIndependiente,
                ciudadActividadIndependiente:ciudadActividadIndependiente,
                ingresoActiIndep:ingresoActiIndep,
                NRP1:NRP1,
                DRP1:DRP1,
                telefonoRP1:telefonoRP1,
                NRP2:NRP2,
                DRP2:DRP2,
                telefonoRP2:telefonoRP2,
                NRF1:NRF1,
                PRF1:PRF1,
                DRF1:DRF1,
                telefonoRF1:telefonoRF1,
                NRF2:NRF2,
                PRF2:PRF2,
                DRF2:DRF2,
                telefonoRF2:telefonoRF2
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
                {this.renderFormularioBasico()}
                {this.renderFormularioExtendido()}
          </div>
                                     
        );
    }
}
export default CrearPrestamos;