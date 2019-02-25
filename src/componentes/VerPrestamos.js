import React, { Component } from 'react';
import firebase from 'firebase';
import './global/css/VerPrestamos.css';
import swal from 'sweetalert';
//import { Link } from 'react-router-dom';
import logo from './global/images/Danger.png';
import moment from 'moment';

class VerPrestamos extends Component { 
    constructor(){
        super();
        this.state = {
            prestamos:[],
            cuotas:[],
            nombre:'',
            fechaPrestamo:'',
            fechaPago:'',
            inputFecha:'',
            hoy:'',
            diasMora:'',
            numCuotas:0,
            cuotasPagas:0,
            cuotasXpagar:'',
            monto:'',
            intereses:'',
            inputInteresesMora:'',
            comision: 0,
            ValorComision:0,
            valorCuota:'',
            user:'',
            userLogueado:'',
            activado:'',
            keyID:'',
            idArray:'',
            usuarioParaBuscar:'',
            nombreBuscar:'',
            totalMonto:'',
            totalInteresesCapital:'',
            totalUtilidad:'',
            totalUtilidadMensual:'',
            totalComisionMensual:'',
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
            pagos:[],
            pagosLeer:[],
            pagosLeer2:[],
            verNumeroCuotasPagas:'',
            verFechaCuotasPagas:'',
            verClaveID:'',
            antesDePago:[]
              
        };
        this.handleDatabase = this.handleDatabase.bind(this);
        this.renderTabla=this.renderTabla.bind(this);
        this.renderTotales=this.renderTotales.bind(this);
        this.renderBuscarCliente=this.renderBuscarCliente.bind(this);
        this.roundNumber=this.roundNumber.bind(this); 

    }

    /** VARIABLES GLOBALES */
    _isMounted = false

     totalMonto=0;
     totalInteresesCapital=0;
     totalUtilidad=0;
     totalUtilidadMensual=0;
     totalComisionMensual=0;

/** FUNCIONES PARA MONTAR Y DESMONTAR COMPONENTE INICIO */

    componentWillMount(){  
        
        firebase.auth().onAuthStateChanged(user => {
           if(this._isMounted){
                this.setState({ 
                    userLogueado:user
                });
            }  
        })

        firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
            const { prestamos} = this.state; 
            var a = moment(snap.val().fecha,["YYYY-MM-DD"]);
            var b = a.clone().add(snap.val().cuotasPagas+1, 'month')
            var fecha1 = moment();
            var fecha2 = moment(b);
            var antesDePago=fecha1.diff(fecha2,'days')
            var idColor=""
            if(antesDePago<0){
                idColor="verde"
            }else{
                idColor="rojo"
            }
            console.log(idColor)

            prestamos.push({
                keyID: snap.key,
                idColor:idColor,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                numCuotas: snap.val().numCuotas,
                cuotasPagas:snap.val().cuotasPagas,
                monto:snap.val().monto,
                intereses: snap.val().intereses,
                comision:snap.val().comision,
                ValorComision:snap.val().ValorComision,
                user: snap.val().user,
                valorCuota:snap.val().valorCuota,
                activado: snap.val().activado, 
                
                apellidos:snap.val().apellidos,
                numeroCedula:snap.val().numeroCedula,
                ciudad:snap.val().ciudad,
                direccion:snap.val().direccion,
                telefono:snap.val().telefono,
                nombreEmpresa:snap.val().nombreEmpresa,
                sueldo:snap.val().sueldo,
                direccionEmpresa:snap.val().direccionEmpresa,
                telefonoEmpresa:snap.val().telefonoEmpresa,
                actividadIndependiente:snap.val().actividadIndependiente,
                ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
                ingresoActiIndep:snap.val().ingresoActiIndep,
                NRP1:snap.val().NRP1,
                DRP1:snap.val().DRP1,
                telefonoRP1:snap.val().telefonoRP1,
                NRP2:snap.val().NRP2,
                DRP2:snap.val().DRP2,
                telefonoRP2:snap.val().telefonoRP2,
                NRF1:snap.val().NRF1,
                PRF1:snap.val().PRF1,
                DRF1:snap.val().DRF1,
                telefonoRF1:snap.val().telefonoRF1,
                NRF2:snap.val().NRF2,
                PRF2:snap.val().PRF2,
                DRF2:snap.val().DRF2,
                telefonoRF2:snap.val().telefonoRF2,  
            });
            this.totalMonto=this.totalMonto+snap.val().monto;
            this.totalUtilidad=this.totalUtilidad+((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)
            this.totalInteresesCapital=this.totalInteresesCapital+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)+snap.val().monto)
            this.totalUtilidadMensual=this.totalUtilidadMensual+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)/snap.val().numCuotas)
            this.totalComisionMensual=parseInt( this.totalComisionMensual)+snap.val().ValorComision
            if(this._isMounted){        
                this.setState({prestamos});
            }
      
        }); 

        firebase.database().ref('prestamosJuan/pagos').on('child_added', snap => {
            const { pagos} = this.state; 

            pagos.push({
                verNumeroCuotasPagas:snap.val().cuotaNum,
                verFechaCuotasPagas:snap.val().fechaPago,
                verClaveID:snap.val().claveID
            })
            this.setState({pagos});
        });
        console.log("cwm")

    }

    componentDidMount(){
        this._isMounted = true     
        console.log("cdm")
    }

   componentWillUnmount(){
        console.log("cwu");
        this._isMounted = false
    }

     /** FUNCIONES PARA MONTAR Y DESMONTAR COMPONENTE FIN */

    /** FUNCIONES BUSCAR Y ELIMINAR INICIO */

    EliminarPrestamo(id,e){
        e.preventDefault();

        this.totalMonto=0;
        this.totalInteresesCapital=0;
        this.totalUtilidad=0;
        this.totalUtilidadMensual=0;
        this.totalComisionMensual=0; 

        var r = window.confirm("Esta seguro de eliminar este prestamo?");
        if (r === true) {
            const { cuotas } = this.state;
            for(let i = 0; i < cuotas.length; i++) {
                if(cuotas[i].keyID === id) {
                    
                    var nombre=cuotas[i].nombre
                }
            } 

            const record = { 
                activado : "0",
                nombre_activado:nombre+"_0"       
            } 
        
            const dbRef = firebase.database().ref('prestamosJuan/prestamo');
            dbRef.child(id).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Prestamo eliminado!", "haz click en el boton!", "success");               
                }
            } );
        } else {
        }  
        this.setState({prestamos:[]});
        var {prestamos} = this.state; 
        prestamos=[]; 
        firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
        //const { compras } = this.state;            
        prestamos.push({
            keyID: snap.key,
            fecha: snap.val().fecha,
            horaExacta: snap.val().horaExacta,
            nombre: snap.val().nombre,
            numCuotas: snap.val().numCuotas,
            monto:snap.val().monto,
            intereses: snap.val().intereses,
            comision:snap.val().comision,
            ValorComision:snap.val().ValorComision,
            user: snap.val().user,
            valorCuota:snap.val().valorCuota,
            activado: snap.val().activado,
            nombre_activado: snap.val().nombre_activado,
            
            apellidos:snap.val().apellidos,
            numeroCedula:snap.val().numeroCedula,
            ciudad:snap.val().ciudad,
            direccion:snap.val().direccion,
            telefono:snap.val().telefono,
            nombreEmpresa:snap.val().nombreEmpresa,
            sueldo:snap.val().sueldo,
            direccionEmpresa:snap.val().direccionEmpresa,
            telefonoEmpresa:snap.val().telefonoEmpresa,
            actividadIndependiente:snap.val().actividadIndependiente,
            ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
            ingresoActiIndep:snap.val().ingresoActiIndep,
            NRP1:snap.val().NRP1,
            DRP1:snap.val().DRP1,
            telefonoRP1:snap.val().telefonoRP1,
            NRP2:snap.val().NRP2,
            DRP2:snap.val().DRP2,
            telefonoRP2:snap.val().telefonoRP2,
            NRF1:snap.val().NRF1,
            PRF1:snap.val().PRF1,
            DRF1:snap.val().DRF1,
            telefonoRF1:snap.val().telefonoRF1,
            NRF2:snap.val().NRF2,
            PRF2:snap.val().PRF2,
            DRF2:snap.val().DRF2,
            telefonoRF2:snap.val().telefonoRF2,  
        });

        this.totalMonto=this.totalMonto+snap.val().monto;
        this.totalUtilidad=this.totalUtilidad+((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)
        this.totalInteresesCapital=this.totalInteresesCapital+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)+snap.val().monto)
        this.totalUtilidadMensual=this.totalUtilidadMensual+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)/snap.val().numCuotas)
        this.totalComisionMensual=parseInt( this.totalComisionMensual)+snap.val().ValorComision
            
        //compras.splice(this.id,1);
        //if(this._isMounted){        
        this.setState({prestamos});
        //}
        }); 

    }

    actualizarTabla(e){
        e.preventDefault();
        console.log(this.state.nombreBuscar)
        if(this.state.nombreBuscar ===""){

            this.setState({prestamos:[]});
            var {prestamos} = this.state; 
            prestamos=[]; 
            firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
            //const { compras } = this.state;            
            prestamos.push({
                keyID: snap.key,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                numCuotas: snap.val().numCuotas,
                cuotasPagas: snap.val().cuotasPagas,
                monto:snap.val().monto,
                intereses: snap.val().intereses,
                comision:snap.val().comision,
                ValorComision:snap.val().ValorComision,
                user: snap.val().user,
                valorCuota:snap.val().valorCuota,
                activado: snap.val().activado, 

                apellidos:snap.val().apellidos,
                numeroCedula:snap.val().numeroCedula,
                ciudad:snap.val().ciudad,
                direccion:snap.val().direccion,
                telefono:snap.val().telefono,
                nombreEmpresa:snap.val().nombreEmpresa,
                sueldo:snap.val().sueldo,
                direccionEmpresa:snap.val().direccionEmpresa,
                telefonoEmpresa:snap.val().telefonoEmpresa,
                actividadIndependiente:snap.val().actividadIndependiente,
                ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
                ingresoActiIndep:snap.val().ingresoActiIndep,
                NRP1:snap.val().NRP1,
                DRP1:snap.val().DRP1,
                telefonoRP1:snap.val().telefonoRP1,
                NRP2:snap.val().NRP2,
                DRP2:snap.val().DRP2,
                telefonoRP2:snap.val().telefonoRP2,
                NRF1:snap.val().NRF1,
                PRF1:snap.val().PRF1,
                DRF1:snap.val().DRF1,
                telefonoRF1:snap.val().telefonoRF1,
                NRF2:snap.val().NRF2,
                PRF2:snap.val().PRF2,
                DRF2:snap.val().DRF2,
                telefonoRF2:snap.val().telefonoRF2,  
            });
            //compras.splice(this.id,1);
            //if(this._isMounted){        
            this.setState({prestamos});
            //}
            });
        }else{
            this.setState({prestamos:[]});
            let {prestamos} = this.state; 
            prestamos=[];  
            firebase.database().ref('prestamosJuan/prestamo')
            .orderByChild("nombre_activado").equalTo(this.state.nombreBuscar+"_1")
            .on('child_added', snap => {  
                prestamos.push({
                    keyID: snap.key,
                    fecha: snap.val().fecha,
                    horaExacta: snap.val().horaExacta,
                    nombre: snap.val().nombre,
                    numCuotas: snap.val().numCuotas,
                    cuotasPagas: snap.val().cuotasPagas,
                    monto:snap.val().monto,
                    intereses: snap.val().intereses,
                    comision:snap.val().comision,
                    ValorComision:snap.val().ValorComision,
                    user: snap.val().user,
                    valorCuota:snap.val().valorCuota,
                    activado: snap.val().activado,

                    apellidos:snap.val().apellidos,
                    numeroCedula:snap.val().numeroCedula,
                    ciudad:snap.val().ciudad,
                    direccion:snap.val().direccion,
                    telefono:snap.val().telefono,
                    nombreEmpresa:snap.val().nombreEmpresa,
                    sueldo:snap.val().sueldo,
                    direccionEmpresa:snap.val().direccionEmpresa,
                    telefonoEmpresa:snap.val().telefonoEmpresa,
                    actividadIndependiente:snap.val().actividadIndependiente,
                    ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
                    ingresoActiIndep:snap.val().ingresoActiIndep,
                    NRP1:snap.val().NRP1,
                    DRP1:snap.val().DRP1,
                    telefonoRP1:snap.val().telefonoRP1,
                    NRP2:snap.val().NRP2,
                    DRP2:snap.val().DRP2,
                    telefonoRP2:snap.val().telefonoRP2,
                    NRF1:snap.val().NRF1,
                    PRF1:snap.val().PRF1,
                    DRF1:snap.val().DRF1,
                    telefonoRF1:snap.val().telefonoRF1,
                    NRF2:snap.val().NRF2,
                    PRF2:snap.val().PRF2,
                    DRF2:snap.val().DRF2,
                    telefonoRF2:snap.val().telefonoRF2,    
                });
                
                this.setState({
                    prestamos,        
                });      
                       
            });
        }
        
    }
    /** FUNCIONES BUSCAR Y ELIMINAR FIN */


    /** FUNCIONES INICIO */

    actualizarSelectDia(e){
        e.preventDefault();
        this.setState({
            selectDia:e.target.value
        })
    }
    actualizarSelectMes(e){
        e.preventDefault();
       this.setState({
            selectMes:e.target.value
        })
    }
    actualizarSelectYear(e){
        e.preventDefault();
        this.setState({
            selectYear:e.target.value
        })
    }

    actualizarNombre(e) {
        this.setState({
          nombre: e.target.value   
        });
    }

    actualizarNombreBuscar(e) {
        this.setState({
          nombreBuscar: e.target.value   
        });
    }

    actualizarMonto(e) {
        this.setState({
            monto: e.target.value,
        });   
    }

    actualizarIntereses(e) {
        this.setState({
          intereses: e.target.value,
        });
    }

    actualizarComision(e) {
        this.setState({
          comision: e.target.value,
        });
    }

    actualizarInputInteresesMora(e) {
        this.setState({
          inputInteresesMora: e.target.value,
        });
    }

    actualizarInputFecha(e){
        console.log(e.target.value)
        this.setState({
            inputFecha: e.target.value
        });
    }

    actualizarNumeroCuotas(e) {
        this.setState({
            numCuotas: e.target.value  
        });
    }

    // start nuevo form

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
    // end

    cargarFormulario(id,i,e){
        e.preventDefault();
        this.setState({pagosLeer:[]});
        const { pagos } = this.state;
        var {pagosLeer2}= new Array();
        pagosLeer2=[]
        console.log(pagosLeer2)
        console.log(id)
        for(let i = 0; i < pagos.length; i++) {
            if(pagos[i].verClaveID === id) {
                console.log(pagos[i].verFechaCuotasPagas)

                pagosLeer2.push({
                    verNumeroCuotasPagas:pagos[i].verNumeroCuotasPagas,
                    verFechaCuotasPagas:pagos[i].verFechaCuotasPagas,
                    verClaveID:pagos[i].verClaveID
                })
                this.setState({pagosLeer:pagosLeer2});
            }
        }        

        const { prestamos } = this.state;
        for(let i = 0; i < prestamos.length; i++) {
            if(prestamos[i].keyID === id) {

                var fechaPrestamo = moment(prestamos[i].fecha,["YYYY-MM-DD"])
                this.setState({
                    nombre:prestamos[i].nombre,
                    monto:prestamos[i].monto,
                    numCuotas:prestamos[i].numCuotas,
                    cuotasPagas:prestamos[i].cuotasPagas,
                    intereses:prestamos[i].intereses,
                    comision:prestamos[i].comision,
                    valorCuota:prestamos[i].valorCuota,
                    keyID:prestamos[i].keyID,
                    fechaPrestamo:fechaPrestamo.format('DD/MM/YYYY'),
                    fechaPago:prestamos[i].fecha,

                    apellidos:prestamos[i].apellidos,
                    numeroCedula:prestamos[i].numeroCedula,
                    ciudad:prestamos[i].ciudad,
                    direccion:prestamos[i].direccion,
                    telefono:prestamos[i].telefono,
                    nombreEmpresa:prestamos[i].nombreEmpresa,
                    sueldo:prestamos[i].sueldo,
                    direccionEmpresa:prestamos[i].direccionEmpresa,
                    telefonoEmpresa:prestamos[i].telefonoEmpresa,
                    actividadIndependiente:prestamos[i].actividadIndependiente,
                    ciudadActividadIndependiente:prestamos[i].ciudadActividadIndependiente,
                    ingresoActiIndep:prestamos[i].ingresoActiIndep,
                    NRP1:prestamos[i].NRP1,
                    DRP1:prestamos[i].DRP1,
                    telefonoRP1:prestamos[i].telefonoRP1,
                    NRP2:prestamos[i].NRP2,
                    DRP2:prestamos[i].DRP2,
                    telefonoRP2:prestamos[i].telefonoRP2,
                    NRF1:prestamos[i].NRF1,
                    PRF1:prestamos[i].PRF1,
                    DRF1:prestamos[i].DRF1,
                    telefonoRF1:prestamos[i].telefonoRF1,
                    NRF2:prestamos[i].NRF2,
                    PRF2:prestamos[i].PRF2,
                    DRF2:prestamos[i].DRF2,
                    telefonoRF2:prestamos[i].telefonoRF2,
                })
                var a = moment(prestamos[i].fecha,["YYYY-MM-DD"]);
                var cuotas = prestamos[i].cuotasPagas;
                var valorCuota = prestamos[i].valorCuota;
                
            }
        } 

        var fecha = moment().format('DD/MM/YYYY');
        this.setState({
            hoy:fecha
        })
        
        var b = a.clone().add(cuotas+1, 'month')

        this.setState({
            fechaPago:b.format('DD/MM/YYYY')
        })

        var fecha1 = moment();
        var fecha2 = moment(b);

        var diasMora = fecha1.diff(fecha2,'days')
        
        if(diasMora<0){
            this.setState({
                diasMora:0
            })
        }else{
            this.setState({
                diasMora
            })
        }  
    }

    roundNumber(num, scale) {
        if(!("" + num).includes("e")) {
          return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } else {
          var arr = ("" + num).split("e");
          var sig = ""
          if(+arr[1] + scale > 0) {
            sig = "+";
          }
          return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }
    /** FUNCIONES FIN */


    /** METODOS RENDER INICIO */


    renderBuscarCliente(){
        return(
        <div className="buscar2 ">
            <input className="form-control" id="NombreBuscar" type="text" placeholder="Buscar nombre" value={this.state.nombreBuscar} onChange={this.actualizarNombreBuscar.bind(this)}/>                   
            <a href="" onClick={this.actualizarTabla.bind(this)} className="BotonBuscarNombre badge badge-primary"><i className="fas fa-search Icono"></i></a>         
        </div>
        )
    }

    renderTotales(){
        return(
            <div>
            
                 <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th scope="col">Total monto</th>
                            <th scope="col">Total utilidad</th>
                            <th scope="col">Total interese y capital</th>
                            <th scope="col">Total utilidad mensual</th>
                            <th scope="col">Total comision mensual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                            <td data-label="Total monto">{this.totalMonto.toLocaleString('es-CO')}</td>
                            <td data-label="Total utilidad">{this.totalUtilidad.toLocaleString('es-CO')}</td>
                            <td data-label="Total int y capital">{this.totalInteresesCapital.toLocaleString('es-CO')}</td>
                            <td data-label="Total utilidad mensual">{this.totalUtilidadMensual.toLocaleString('es-CO')}</td>
                            <td data-label="Total comision mensual">{this.totalComisionMensual.toLocaleString('es-CO')}</td>
                        </tr>
                    </tbody>
                </table> 
               
            </div>           
        )
    }

    renderTabla(){
        return(
            <div className="Tabla col-sm-11"> 
                <div className="c">
                    <div className="ContenedorTitulo">
                        {this.renderBuscarCliente()}   <br/>   
                        
                    </div>  
                    {this.renderTotales()}                 
                </div>                            
                
                <table className="ta table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Fecha prestamo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Monto</th>
                        <th scope="col">utilidad</th>
                        <th scope="col">intereses y capital</th>
                        <th scope="col">Valor cuota</th>
                        <th scope="col">Utilidad mensual</th>
                        <th scope="col">Comision mensual</th>
                        <th scope="col">Intereses</th>
                        <th scope="col"># cuotas</th>
                        <th scope="col"></th>                   
                    </tr>
                </thead> 
                { 
                    this.state.prestamos.map((prestamo,i) => (
                        <tbody key={i}>
                        <tr>
                            <th scope="row">{prestamo.user}</th>
                            <td data-label="Fecha prestamo">{prestamo.fecha+" - "+prestamo.horaExacta}</td>
                            <td className={prestamo.idColor} data-label="Nombre">{prestamo.nombre}</td>
                            <td data-label="Monto">{prestamo.monto.toLocaleString('es-CO')}</td>
                            <td data-label="utilidad">{((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas).toLocaleString('es-CO')}</td>
                            <td data-label="intereses y capital">{(((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas)+prestamo.monto).toLocaleString('es-CO')}</td>
                            <td data-label="Valor cuota">{prestamo.valorCuota.toLocaleString('es-CO')}</td> 
                            <td data-label="Utilidad mensual">{(((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas)/prestamo.numCuotas).toLocaleString('es-CO')}</td> 
                            <td data-label="Comision mensual">{prestamo.ValorComision.toLocaleString('es-CO')}</td>
                            <td data-label="Intereses">{prestamo.intereses}</td>
                            <td data-label="# cuotas">{prestamo.numCuotas} <br/>
                                <a href="#" className="badge badge-info ainfo" data-toggle="modal" data-target="#myModalAgregarCuota" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="fas fa-eye plus plus2"></i></a>
                                <a href="#" className="badge badge-warning agregarCuota aadd" onClick={this.agregarCuota.bind(this,prestamo.keyID)}><i className="fas fa-plus plus plus2"></i></a></td>
                            
                            <td data-label="Ver,Editar y eliminar"className="">
                            <div className="container"> 
                                <div className="container ">
                                    <div className="row ">      
                                        <div className="col-5 ">
                                            <a href="#"  className="badge badge-success LiInf" data-toggle="modal" data-target="#myModalInfo" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="fas fa-info-circle Icono2"></i></a>
                                        </div>
                                        <div className="col-7 ">
                                            <a href="#" className="badge badge-primary boEdi clickable" data-toggle="modal" data-target="#myModal" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="far fa-edit plus"></i></a>
                                            <div className="espacio"></div>
                                            <a href="#" onClick={this.EliminarPrestamo.bind(this,prestamo.keyID)} className="badge badge-danger boEli"><i className="far fa-trash-alt plus"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal hide " id="myModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modaliti modal-dialog-scrollable" role="document">     
                                        <div className="modal-content">
                                            <div className="modal-header ed">
                                                <h4 className="modal-title losh4">¡EDICION DE DATOS!</h4>
                                            </div>
                                            <div className="ModalForm modal-body ede">
                                            <form action="">
                                            <div className="form-row ">
                                                <div className="form-group col-md-4">
                                                <label htmlFor="inputFecha">Fecha de prestamo: {this.state.fechaPrestamo}</label><br/>
                                                <input className="form-control inputFecha" type="date" name="inputFecha" id="inputFecha" onChange={this.actualizarInputFecha.bind(this)} value={this.state.inputFecha}/> <br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="NombreModal">Nombre</label><br/>
                                                <input className="form-control" id="NombreModal" type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="PesoKilosModal">Monto</label><br/>
                                                <input className="form-control" id="PesoKilosModal" type="text" value={this.state.monto} onChange={this.actualizarMonto.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="intereses">Intereses</label><br/>
                                                <input className="form-control" id="intereses" type="text" value={this.state.intereses} onChange={this.actualizarIntereses.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="comision">Comision</label><br/>
                                                <input className="form-control" id="comision" type="text" value={this.state.comision} onChange={this.actualizarComision.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="ValorUnidadModal">Numero de cuotas</label><br/>
                                                <input className="form-control" id="ValorUnidadModal" type="text" value={this.state.numCuotas} onChange={this.actualizarNumeroCuotas.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <h4 >Valor cuota</h4>
                                                <h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO')}</h5>
                                                </div>
                                            </div>
                                                <div className="Closh4 ">
                                                <h4 className="modal-title losh4">Datos personales</h4></div>
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
                                        <h4 className="modal-title losh4">Datos laborales</h4></div>
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

                                                <label htmlFor="DireccionEmpresa">Direccion empresa</label>
                                                <input 
                                                id="DireccionEmpresa"
                                                type="text" 
                                                placeholder="Ejemplo: cra 5 # 23-98"
                                                value={this.state.direccionEmpresa}
                                                onChange={this.actualizarDireccionEmpresa.bind(this)}
                                                autoComplete="nombre"
                                                className="form-control"/> <br/>

                                                <label htmlFor="TelefonoEmpresa">Telefono empresa</label>
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
                                        <h4 className="modal-title losh4">Datos actividad economica independiente</h4></div>
                                        <div className="form-row ">
                                            <div className="form-group col-md-4">

                                                <label htmlFor="ActividadEconomicaa">Actividad economica</label>
                                                <input 
                                                type="text"
                                                id="ActividadEconomicaa"
                                                placeholder="Ejemplo: Comerciante"
                                                value={this.state.actividadIndependiente}
                                                onChange={this.actualizarActividadIndependiente.bind(this)} className="form-control"/> <br/>
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

                                                <label htmlFor="CiudadAct">Ciudad</label>
                                                <input 
                                                id="CiudadAct"
                                                type="text" 
                                                placeholder="Ejemplo: Armenia"
                                                value={this.state.ciudadActividadIndependiente}
                                                onChange={this.actualizarCiudadActividadIndependiente.bind(this)}
                                                autoComplete="nombre"
                                                className="form-control"/>
                                            </div>
                                    
                                        </div>
                                        <div className="Closh4">        
                                        <h4 className="modal-title losh4">Referencias personales</h4></div>
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
                                        <h4 className="modal-title losh4">Referencias Familiares</h4></div>
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

                                            </form>
                                            </div>                                           
                                            <div className="modal-footer ede">
                                                <button onClick={this.handleDatabase} type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-check Icono"></i></button>
                                                <button type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-times Icono"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="modal fade" id="myModalInfo" role="dialog">
                                    <div className="modal-dialog modal-lg" >     
                                        <div className="modal-content">
                                            <div className="modal-header ed">
                                                <h4 className="modal-title losh4">{this.state.nombre+" "+this.state.apellidos}</h4>
                                            </div>
                                            <div className="ModalForm modal-body ede">
                                            <form action="">
                                            <div className="form-row ">
                                                <div className="form-group col-md-4">
                                                <label htmlFor="inputFecha">Fecha de prestamo: {this.state.fechaPrestamo}</label><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="NombreModal">Nombre</label><br/>
                                                <input disabled className="form-control" id="NombreModal" type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="PesoKilosModal">Monto</label><br/>
                                                <input disabled className="form-control" id="PesoKilosModal" type="text" value={this.state.monto} onChange={this.actualizarMonto.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="intereses">% Intereses</label><br/>
                                                <input disabled className="form-control" id="intereses" type="text" value={this.state.intereses} onChange={this.actualizarIntereses.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="comision">% Comision</label><br/>
                                                <input disabled className="form-control" id="comision" type="text" value={this.state.comision} onChange={this.actualizarComision.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label htmlFor="ValorUnidadModal">Numero de cuotas</label><br/>
                                                <input disabled className="form-control" id="ValorUnidadModal" type="text" value={this.state.numCuotas} onChange={this.actualizarNumeroCuotas.bind(this)}/><br/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                <h4 >Valor cuota</h4>
                                                <h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO')}</h5>
                                                </div>
                                            </div>
                                                <div className="Closh4 ">
                                                <h4 className="modal-title losh4">Datos personales</h4></div>
                                        <br/>
                                        <div className="form-row ">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Apellidos">Apellidos</label>
                                                <input disabled
                                                type="text"
                                                id="Apellidos"
                                                placeholder="Ejemplo: Gallego"
                                                value={this.state.apellidos}
                                                onChange={this.actualizarApellidos.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="cedula">Numero de cedula</label>
                                                <input disabled
                                                type="text"
                                                id="cedula"
                                                placeholder="Ejemplo: 31234765"
                                                value={this.state.numeroCedula}
                                                onChange={this.actualizarNumeroCedula.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Ciudad">Ciudad</label>
                                                <input disabled
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
                                                <input disabled
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
                                                <input disabled
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
                                        <h4 className="modal-title losh4">Datos laborales</h4></div>
                                        <div className="form-row ">
                                            <div className="form-group col-md-6">

                                                <label htmlFor="NombreEmpresa">Nombre empresa</label>
                                                <input disabled
                                                type="text"
                                                id="NombreEmpresa"
                                                placeholder="Ejemplo: Ecopetrol"
                                                value={this.state.nombreEmpresa}
                                                onChange={this.actualizarNombreEmpresa.bind(this)} className="form-control"/> <br/>
                                                
                                                <label htmlFor="Sueldo">Sueldo</label>
                                                <input disabled
                                                type="text"
                                                id="Sueldo"
                                                placeholder="Ejemplo: 900.000"
                                                value={this.state.sueldo}
                                                onChange={this.actualizarSueldo.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-6">

                                                <label htmlFor="DireccionEmpresa">Direccion empresa</label>
                                                <input disabled
                                                id="DireccionEmpresa"
                                                type="text" 
                                                placeholder="Ejemplo: cra 5 # 23-98"
                                                value={this.state.direccionEmpresa}
                                                onChange={this.actualizarDireccionEmpresa.bind(this)}
                                                autoComplete="nombre"
                                                className="form-control"/> <br/>

                                                <label htmlFor="TelefonoEmpresa">Telefono empresa</label>
                                                <input disabled
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
                                        <h4 className="modal-title losh4">Datos actividad economica independiente</h4></div>
                                        <div className="form-row ">
                                            <div className="form-group col-md-4">

                                                <label htmlFor="ActividadEconomicaa">Actividad economica</label>
                                                <input disabled
                                                type="text"
                                                id="ActividadEconomicaa"
                                                placeholder="Ejemplo: Comerciante"
                                                value={this.state.actividadIndependiente}
                                                onChange={this.actualizarActividadIndependiente.bind(this)} className="form-control"/> <br/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="ingresoAct">Ingreso actividad independiente</label>
                                                <input disabled
                                                type="text"
                                                id="ingresoAct"
                                                placeholder="Ejemplo: 900.000"
                                                value={this.state.ingresoActiIndep}
                                                onChange={this.actualizarIngresoActividadIndependiente.bind(this)} 
                                                autoComplete="nombre"
                                                className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-4">

                                                <label htmlFor="CiudadAct">Ciudad</label>
                                                <input disabled
                                                id="CiudadAct"
                                                type="text" 
                                                placeholder="Ejemplo: Armenia"
                                                value={this.state.ciudadActividadIndependiente}
                                                onChange={this.actualizarCiudadActividadIndependiente.bind(this)}
                                                autoComplete="nombre"
                                                className="form-control"/>
                                            </div>
                                    
                                        </div>
                                        <div className="Closh4">        
                                        <h4 className="modal-title losh4">Referencias personales</h4></div>
                                        <div className="form-row ">
                                            <div className="form-group col-md-4">

                                                <label htmlFor="NombreCompletoRP1">Nombre completo</label>
                                                <input disabled
                                                type="text"
                                                id="NombreCompletoRP1"
                                                placeholder="Ejemplo: Arbey castaño"
                                                value={this.state.NRP1}
                                                onChange={this.actualizarNRP1.bind(this)} className="form-control"/> <br/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="DireccionRP1">Direccion</label>
                                                <input disabled
                                                type="text"
                                                id="DireccionRP1"
                                                placeholder="Ejemplo: Cra 4 # 4-9"
                                                value={this.state.DRP1}
                                                onChange={this.actualizarDRP1.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-4">

                                                <label htmlFor="TelefonoRP1">Telefono</label>
                                                <input disabled
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
                                                <input disabled
                                                type="text"
                                                id="NombreCompletoRP2"
                                                placeholder="Ejemplo: Arbey castaño"
                                                value={this.state.NRP2}
                                                onChange={this.actualizarNRP2.bind(this)} className="form-control"/> <br/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="DireccionRP2">Direccion</label>
                                                <input disabled
                                                type="text"
                                                id="DireccionRP2"
                                                placeholder="Ejemplo: Cra 4 # 4-9"
                                                value={this.state.DRP2}
                                                onChange={this.actualizarDRP2.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-4">

                                                <label htmlFor="TelefonoRP2">Telefono</label>
                                                <input disabled
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
                                        <h4 className="modal-title losh4">Referencias Familiares</h4></div>
                                        <div className="form-row ">
                                            <div className="form-group col-md-3">

                                                <label htmlFor="NombreCompletoRf1">Nombre completo</label>
                                                <input disabled
                                                type="text"
                                                id="NombreCompletoRf1"
                                                placeholder="Ejemplo: Arbey castaño"
                                                value={this.state.NRF1}
                                                onChange={this.actualizarNRF1.bind(this)} className="form-control"/> <br/>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="Parentesco1">Parentesco</label>
                                                <input disabled
                                                type="text"
                                                id="Parentesco1"
                                                placeholder="Ejemplo: primo"
                                                value={this.state.PRF1}
                                                onChange={this.actualizarParentesoRF1.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="DireccionRf1">Direccion</label>
                                                <input disabled
                                                type="text"
                                                id="DireccionRf1"
                                                placeholder="Ejemplo: Cra 4 # 4-9"
                                                value={this.state.DRF1}
                                                onChange={this.actualizarDRF1.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-3">

                                                <label htmlFor="TelefonoRf1">Telefono</label>
                                                <input disabled
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
                                                <input disabled
                                                type="text"
                                                id="NombreCompletoRf2"
                                                placeholder="Ejemplo: Arbey castaño"
                                                value={this.state.NRF2}
                                                onChange={this.actualizarNRF2.bind(this)} className="form-control"/> <br/>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="Parentesco2">Parentesco</label>
                                                <input disabled
                                                type="text"
                                                id="Parentesco2"
                                                placeholder="Ejemplo: primo"
                                                value={this.state.PRF2}
                                                onChange={this.actualizarParentesoRF2.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="DireccionRf2">Direccion</label>
                                                <input disabled
                                                type="text"
                                                id="DireccionRf2"
                                                placeholder="Ejemplo: Cra 4 # 4-9"
                                                value={this.state.DRF2}
                                                onChange={this.actualizarDRF2.bind(this)} className="form-control"/>
                                            </div>
                                            <div className="form-group col-md-3">

                                                <label htmlFor="TelefonoRf2">Telefono</label>
                                                <input disabled
                                                id="TelefonoRf2"
                                                type="text" 
                                                placeholder="Ejemplo: 3120009987"
                                                value={this.state.telefonoRF2}
                                                onChange={this.actualizarTelefonoRF2.bind(this)}
                                                autoComplete="nombre"
                                                className="form-control"/>
                                            </div>
                                    
                                        </div>
                                                
                                                


                                            </form>
                                            </div>
                                            <div className="modal-footer ede">
                                                <button type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-times Icono"></i></button>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>

                                <div className="modal fade" id="myModalAgregarCuota" role="dialog">
                                    <div className="modal-dialog">     
                                        <div className="modal-content">
                                            <div className="modal-header ed">
                                                <h4 className="modal-title losh4">Estado de cuenta: {this.state.nombre+" "+this.state.apellidos}</h4>
                                            </div>
                                            <div className="ModalForm modal-body ede">
                                                <span>Fecha de prestamo: {this.state.fechaPrestamo}</span><br/>
                                                <span id="fechaPago">Fecha de pago: {this.state.fechaPago}</span><br/>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <td>Numero de cuotas</td>
                                                            <td>Cuotas pagadas</td>
                                                            <td>Cuotas por pagar</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td data-label="Numero de cuotas">{parseInt(this.state.numCuotas)}</td>
                                                            <td data-label="Cuotas pagadas">{parseInt(this.state.cuotasPagas)}</td>
                                                            <td data-label="Cuotas por pagar">{parseInt(this.state.numCuotas-this.state.cuotasPagas)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br/>
                                                <span>Dias de mora: {this.state.diasMora}</span><br/><br/>
                                                <label htmlFor="inputInteresMora">% Interes mora</label>
                                                <input type="number" id="inputInteresMora" className="form-control buscar2" onChange={this.actualizarInputInteresesMora.bind(this)} value={this.state.inputInteresesMora} placeholder="% interes"/><br/>
                                                
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <td><span >Valor cuota</span></td>
                                                            <td> <span >Valor mora</span></td>
                                                            <td><span >Valor total cuota</span></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td data-label="Valor cuota"><h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO')}</h5></td>
                                                            <td data-label="Valor mora"><h5>{this.roundNumber((((this.state.valorCuota*(this.state.inputInteresesMora/100))/30)*this.state.diasMora),0).toLocaleString('es-CO')}</h5></td>
                                                            <td data-label="Valor total cuota"><h5>{this.roundNumber(((((this.state.valorCuota*(this.state.inputInteresesMora/100))/30)*this.state.diasMora)+this.state.valorCuota),0).toLocaleString('es-CO')}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table> <br/>
                                                {this.state.pagosLeer.map((pago,i) => (
                                                <div key={i}>
                                                    <p>{pago.verFechaCuotasPagas}</p>
                                                    <p>{pago.verNumeroCuotasPagas}</p>                                                
                                                </div>
                                            ))
                                            }
                                            </div>
                                            <div className="modal-footer ede">
                                                <a href="#" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-times Icono3"></i></a>
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <br/>
                            </td>                                                             
                        </tr>
                        
                        </tbody>  
                        
                    ))//.reverse()
                    
                }  
                
                </table>    
            </div>        
        )
    }
    /** METODOS RENDER FIN */

    /** METODOS BD INICIO */

    agregarCuota(id,e){
        e.preventDefault();
        var fecha = moment().format('DD/MM/YYYY');
        var r = window.confirm("Esta seguro de agregar una cuota?");
        if (r === true) {
            firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
                const { cuotas} = this.state;            
                cuotas.push({
                    keyID: snap.key,
                    cuotasPagas:snap.val().cuotasPagas, 
                });

                this.setState({cuotas});
            
            })
            //console.log(this.state.cuotas)
            const { cuotas } = this.state;
            for(let i = 0; i < cuotas.length; i++) {
                if(cuotas[i].keyID === id) {
                
                var a = cuotas[i].cuotasPagas
                var claveID = cuotas[i].keyID
                
                }
            } 
            this.setState({cuotas:[]});

            var uno = 1;
            this.setState({
                cuotasPagas:a+parseInt(uno)
            })
            //console.log(this.state.cuotasPagas)

            const record2 = { 
                cuotaNum: a+parseInt(uno),
                claveID:claveID,
                fechaPago:fecha 
            } 

            const dbRef2 = firebase.database().ref('prestamosJuan/pagos');
            const newPicture = dbRef2.push();
            newPicture.set(record2
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    console.log("bien")
                }
            });

            const record = { 
                cuotasPagas: a+parseInt(uno) 
            } 

            const dbRef = firebase.database().ref('prestamosJuan/prestamo');
            dbRef.child(id).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Cuota agregada!!", "haz click en el boton!", "success");               
                }
            });

            this.setState({prestamos:[]});
            var {prestamos} = this.state; 
            prestamos=[]; 
            firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
            //const { compras } = this.state;            
            prestamos.push({
                keyID: snap.key,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                numCuotas: snap.val().numCuotas,
                cuotasPagas: snap.val().cuotasPagas,
                monto:snap.val().monto,
                intereses: snap.val().intereses,
                comision:snap.val().comision,
                ValorComision:snap.val().ValorComision,
                user: snap.val().user,
                valorCuota:snap.val().valorCuota,
                activado: snap.val().activado, 
                
                
                apellidos:snap.val().apellidos,
                numeroCedula:snap.val().numeroCedula,
                ciudad:snap.val().ciudad,
                direccion:snap.val().direccion,
                telefono:snap.val().telefono,
                nombreEmpresa:snap.val().nombreEmpresa,
                sueldo:snap.val().sueldo,
                direccionEmpresa:snap.val().direccionEmpresa,
                telefonoEmpresa:snap.val().telefonoEmpresa,
                actividadIndependiente:snap.val().actividadIndependiente,
                ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
                ingresoActiIndep:snap.val().ingresoActiIndep,
                NRP1:snap.val().NRP1,
                DRP1:snap.val().DRP1,
                telefonoRP1:snap.val().telefonoRP1,
                NRP2:snap.val().NRP2,
                DRP2:snap.val().DRP2,
                telefonoRP2:snap.val().telefonoRP2,
                NRF1:snap.val().NRF1,
                PRF1:snap.val().PRF1,
                DRF1:snap.val().DRF1,
                telefonoRF1:snap.val().telefonoRF1,
                NRF2:snap.val().NRF2,
                PRF2:snap.val().PRF2,
                DRF2:snap.val().DRF2,
                telefonoRF2:snap.val().telefonoRF2,  
            });
            //compras.splice(this.id,1);
            //if(this._isMounted){        
            this.setState({prestamos});
            //}
            });
        }
    }
    
    handleDatabase(event){
        event.preventDefault();

        if(this.state.nombre === ''|| this.state.numCuotas === ''|| this.state.monto === '' || this.state.intereses === '' || this.state.comision === ''){
            swal("Campos vacios!", "¡No se puede hacer editar un prestamo sin datos !", "warning");
        
        }else if(this.state.inputFecha===''){
            const record = { 
                nombre : this.state.nombre,
                monto: this.state.monto,
                intereses: this.state.intereses,
                ValorComision: this.state.monto * (this.state.comision/100),
                comision:this.state.comision,
                numCuotas:this.state.numCuotas,
                valorCuota: this.state.valorCuota,

                apellidos:this.state.apellidos,
                numeroCedula:this.state.numeroCedula,
                ciudad:this.state.ciudad,
                direccion:this.state.direccion,
                telefono:this.state.telefono,
                nombreEmpresa:this.state.nombreEmpresa,
                sueldo:this.state.sueldo,
                direccionEmpresa:this.state.direccionEmpresa,
                telefonoEmpresa:this.state.telefonoEmpresa,
                actividadIndependiente:this.state.actividadIndependiente,
                ciudadActividadIndependiente:this.state.ciudadActividadIndependiente,
                ingresoActiIndep:this.state.ingresoActiIndep,
                NRP1:this.state.NRP1,
                DRP1:this.state.DRP1,
                telefonoRP1:this.state.telefonoRP1,
                NRP2:this.state.NRP2,
                DRP2:this.state.DRP2,
                telefonoRP2:this.state.telefonoRP2,
                NRF1:this.state.NRF1,
                PRF1:this.state.PRF1,
                DRF1:this.state.DRF1,
                telefonoRF1:this.state.telefonoRF1,
                NRF2:this.state.NRF2,
                PRF2:this.state.PRF2,
                DRF2:this.state.DRF2,
                telefonoRF2:this.state.telefonoRF2,  

        
            } 
        
            const dbRef = firebase.database().ref('prestamosJuan/prestamo');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Prestamo editado!", "haz click en el boton!", "success");               
                }
            } );
        }else{
            console.log(this.state.inputFecha)
            const record = { 
                nombre : this.state.nombre,
                monto: this.state.monto,
                intereses: this.state.intereses,
                ValorComision: this.state.monto * (this.state.comision/100),
                comision:this.state.comision,
                numCuotas:this.state.numCuotas,
                valorCuota: this.state.valorCuota,
                fecha:this.state.inputFecha,

                apellidos:this.state.apellidos,
                numeroCedula:this.state.numeroCedula,
                ciudad:this.state.ciudad,
                direccion:this.state.direccion,
                telefono:this.state.telefono,
                nombreEmpresa:this.state.nombreEmpresa,
                sueldo:this.state.sueldo,
                direccionEmpresa:this.state.direccionEmpresa,
                telefonoEmpresa:this.state.telefonoEmpresa,
                actividadIndependiente:this.state.actividadIndependiente,
                ciudadActividadIndependiente:this.state.ciudadActividadIndependiente,
                ingresoActiIndep:this.state.ingresoActiIndep,
                NRP1:this.state.NRP1,
                DRP1:this.state.DRP1,
                telefonoRP1:this.state.telefonoRP1,
                NRP2:this.state.NRP2,
                DRP2:this.state.DRP2,
                telefonoRP2:this.state.telefonoRP2,
                NRF1:this.state.NRF1,
                PRF1:this.state.PRF1,
                DRF1:this.state.DRF1,
                telefonoRF1:this.state.telefonoRF1,
                NRF2:this.state.NRF2,
                PRF2:this.state.PRF2,
                DRF2:this.state.DRF2,
                telefonoRF2:this.state.telefonoRF2,  

        
            } 
        
            const dbRef = firebase.database().ref('prestamosJuan/prestamo');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Prestamo editado!", "haz click en el boton!", "success");               
                }
            } );
       }
        this.setState({prestamos:[]});
        var {prestamos} = this.state; 
        prestamos=[]; 
        firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
        //const { compras } = this.state;            
        prestamos.push({
            keyID: snap.key,
            fecha: snap.val().fecha,
            horaExacta: snap.val().horaExacta,
            nombre: snap.val().nombre,
            numCuotas: snap.val().numCuotas,
            cuotasPagas: snap.val().cuotasPagas,
            monto:snap.val().monto,
            intereses: snap.val().intereses,
            comision:snap.val().comision,
            ValorComision:snap.val().ValorComision,
            user: snap.val().user,
            valorCuota:snap.val().valorCuota,
            activado: snap.val().activado   ,

            apellidos:snap.val().apellidos,
            numeroCedula:snap.val().numeroCedula,
            ciudad:snap.val().ciudad,
            direccion:snap.val().direccion,
            telefono:snap.val().telefono,
            nombreEmpresa:snap.val().nombreEmpresa,
            sueldo:snap.val().sueldo,
            direccionEmpresa:snap.val().direccionEmpresa,
            telefonoEmpresa:snap.val().telefonoEmpresa,
            actividadIndependiente:snap.val().actividadIndependiente,
            ciudadActividadIndependiente:snap.val().ciudadActividadIndependiente,
            ingresoActiIndep:snap.val().ingresoActiIndep,
            NRP1:snap.val().NRP1,
            DRP1:snap.val().DRP1,
            telefonoRP1:snap.val().telefonoRP1,
            NRP2:snap.val().NRP2,
            DRP2:snap.val().DRP2,
            telefonoRP2:snap.val().telefonoRP2,
            NRF1:snap.val().NRF1,
            PRF1:snap.val().PRF1,
            DRF1:snap.val().DRF1,
            telefonoRF1:snap.val().telefonoRF1,
            NRF2:snap.val().NRF2,
            PRF2:snap.val().PRF2,
            DRF2:snap.val().DRF2,
            telefonoRF2:snap.val().telefonoRF2, 
        });
        //compras.splice(this.id,1);
        //if(this._isMounted){        
        this.setState({prestamos});
        //}
        }); 
    }
    /** METODOS BD FIN */


    /** METODO PRINCIPAL */

    render(){

        if(this.state.userLogueado.uid==="QwbmsCVm1QZWbhM4RFgs9FHXrIv1"){
            return (
                <div>
                    {
                        this.renderTabla()
                    }
                </div>
            );
        }else{
            return(
                <div>
                    <img className="dangerr" width="250px" src={logo} alt=""/>
                    <h1>NO TIENE PERMISO PARA ESTAR EN ESTA PAGINA</h1>
                </div>
            );
        }
        
    } 
}
export default VerPrestamos;


/*renderSelectFecha(){
        return(
            <div>
                <label>Dia</label>
                <select value={this.state.selectDia} onChange={this.actualizarSelectDia.bind(this)} name="dia">
                <option>1</option>< option>2</option> <option>3</option> <option>4</option><option>5</option><option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option>< option>11</option> <option>12</option> <option>13</option> <option>14</option> <option>15</option> <option>16</option> <option>17</option> <option>18</option> <option>19</option> <option>20</option>
                    <option>21</option> <option>22</option> <option>23</option> <option>24</option> <option>25</option> <option>26</option> <option>27</option> <option>28</option> <option>29</option><option>30</option><option>31</option>
                
                </select>

                <label>Mes</label>
                <select value={this.state.selectMes} onChange={this.actualizarSelectMes.bind(this)} name="mes">
                    <option >1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                </select>

                <label >Año</label>
                <select value={this.state.selectYear} onChange={this.actualizarSelectYear.bind(this)} name="year">
                    <option >2018</option> <option>2019</option>< option>2020</option>
                </select>

                <a href="" onClick={this.actualizarTabla.bind(this)} className="BotonBuscar badge badge-primary"><i className="fas fa-search Icono"></i></a>
            </div>           
        )


        <h1 className="Titulo display-4">Prestamos</h1> <br/> 

    }*/

  /*openNav(id,i,e) {
        e.preventDefault();
        console.log(id+"----"+i);
        this.cargarFormulario(id,i,e);
        document.getElementById("filaOculta").style.display="inline";
    }

    closeNav() {
        document.getElementById("filaOculta").style.display="none";
    
    }*/

     /*EliminarAlmacen(id,e){
        e.preventDefault();
       var r = window.confirm("Esta seguro ?");
        if (r === true) {
            const dbRef = firebase.database().ref('compraDeCafe/compras');
            dbRef.child(id).remove();
        } else {
        }       
    }*/
    
    /* const { prestamos: compras } = this.state;

        firebase.database().ref('compraDeCafe/compras').on('child_removed', snap => {
            for(let i = 0; i < compras.length; i++) {
                if(compras[i].keyID === snap.key) {
                    compras.splice(i , 1);
                }
            }
            this.setState({ compras });
        });*/