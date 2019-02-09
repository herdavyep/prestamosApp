import React, { Component } from 'react';
import firebase from 'firebase';
import './global/css/VerPrestamos.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
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
            numCuotas:'',
            cuotasPagas:0,
            cuotasXpagar:'',
            monto:'',
            intereses:'',
            inputInteresesMora:'',
            comision: 0,
            ValorComision:0,
            valorCuota:'',
            user:'',
            activado:'',
            keyID:'',
            idArray:'',
            usuarioParaBuscar:'',
            nombreBuscar:'',
            totalMonto:'',
            totalInteresesCapital:'',
            totalUtilidad:'',
            totalUtilidadMensual:'',
            totalComisionMensual:''  
        };
        this.handleDatabase = this.handleDatabase.bind(this);
        this.renderTabla=this.renderTabla.bind(this);
        this.renderTotales=this.renderTotales.bind(this);
        this.renderBuscarCliente=this.renderBuscarCliente.bind(this);
        this.roundNumber=this.roundNumber.bind(this); 

    }
    _isMounted = false

    componentWillMount(){       
      
        var totalMonto=0;
        var totalInteresesCapital=0;
        var totalUtilidad=0;
        var totalUtilidadMensual=0;
        var totalComisionMensual=0;  
        firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
            const { prestamos} = this.state; 

            prestamos.push({
                keyID: snap.key,
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
                activado: snap.val().activado   
            });
            totalMonto=totalMonto+snap.val().monto;
            totalUtilidad=totalUtilidad+((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)
            totalInteresesCapital=totalInteresesCapital+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)+snap.val().monto)
            totalUtilidadMensual=totalUtilidadMensual+(((((snap.val().intereses-snap.val().comision)/100)*snap.val().monto)*snap.val().numCuotas)/snap.val().numCuotas)
            totalComisionMensual=parseInt( totalComisionMensual)+snap.val().ValorComision
            if(this._isMounted){        
                this.setState({
                    prestamos,
                    totalMonto,
                    totalUtilidad,
                    totalInteresesCapital,
                    totalUtilidadMensual,
                    totalComisionMensual
                });
            }
        }); 
    }

    componentDidMount(){

        const { prestamos: compras } = this.state;

        firebase.database().ref('compraDeCafe/compras').on('child_removed', snap => {
            for(let i = 0; i < compras.length; i++) {
                if(compras[i].keyID === snap.key) {
                    compras.splice(i , 1);
                }
            }
            this.setState({ compras });
        });
        this._isMounted = true     

        console.log("cdm")
    }

   componentWillUnmount(){
        console.log("cwu");
        this._isMounted = false
    }

    /*EliminarAlmacen(id,e){
        e.preventDefault();
       var r = window.confirm("Esta seguro ?");
        if (r === true) {
            const dbRef = firebase.database().ref('compraDeCafe/compras');
            dbRef.child(id).remove();
        } else {
        }       
    }*/

    EliminarPrestamo(id,e){
        e.preventDefault();
        var r = window.confirm("Esta seguro de eliminar este prestamo?");
        if (r === true) {
            const { cuotas } = this.state;
            for(let i = 0; i < cuotas.length; i++) {
                if(cuotas[i].keyID === id) {
                    
                       var nombre=cuotas[i].nombre
                    
                }
            } 
            console.log(nombre)
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
            nombre_activado: snap.val().nombre_activado  
        });
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
                activado: snap.val().activado   
            });
            //compras.splice(this.id,1);
            //if(this._isMounted){        
            this.setState({prestamos});
            //}
            });
        }else{
            this.setState({prestamos:[]});
            var {prestamos} = this.state; 
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
                    activado: snap.val().activado    
                });
                
                this.setState({
                    prestamos,        
                });      
                       
            });
        }
        
    }

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

    cargarFormulario(id,i,e){
        e.preventDefault();
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
                    fechaPago:prestamos[i].fecha
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
        
        /*const record = { 
            fechaPago: b
        } 

        const dbRef = firebase.database().ref('prestamosJuan/prestamo');
        dbRef.child(id).update(record
        ,function(error) {
            if (error) {
                console.log(error.message)
            } else {
                         
            }
        }); */
         
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

    openNav(id,i,e) {
        e.preventDefault();
        console.log(id+"----"+i);
        this.cargarFormulario(id,i,e);
        document.getElementById("filaOculta").style.display="inline";
    }

    closeNav() {
        document.getElementById("filaOculta").style.display="none";
    
    }

    renderTabla(){
        return(
            <div className="Tabla col-sm-11"> 
                <div className="card">
                    <div className="ContenedorTitulo">
                        <h1 className="Titulo display-4">Prestamos</h1> <br/> 
                        {this.renderBuscarCliente()}   <br/>   
                        
                    </div>  
                    {this.renderTotales()}                 
                </div>                            
                <br/>  
                <br/>
                <table className="table table-bordered table-responsive-sm table-sm" id="tabla">
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
                            <td>{prestamo.fecha+" - "+prestamo.horaExacta}</td>
                            <td>{prestamo.nombre}</td>
                            <td><p>{prestamo.monto.toLocaleString('es-CO')}</p></td>
                            <td>{((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas).toLocaleString('es-CO')}</td>
                            <td>{(((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas)+prestamo.monto).toLocaleString('es-CO')}</td>
                            <td>{prestamo.valorCuota.toLocaleString('es-CO')}</td> 
                            <td>{(((((prestamo.intereses-prestamo.comision)/100)*prestamo.monto)*prestamo.numCuotas)/prestamo.numCuotas).toLocaleString('es-CO')}</td> 
                            <td>{prestamo.ValorComision.toLocaleString('es-CO')}</td>
                            <td>{prestamo.intereses}</td>
                            <td>{prestamo.numCuotas} <br/>
                                <a href="" className="badge badge-info " data-toggle="modal" data-target="#myModalAgregarCuota" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="fas fa-eye plus"></i></a>
                                <a href="" className="badge badge-warning agregarCuota " onClick={this.agregarCuota.bind(this,prestamo.keyID)}><i className="fas fa-plus plus"></i></a></td>
                            
                            <td className="">
                            <div className="container"> 
                                <div className="container ">
                                    <div className="row ">
                                        <div className="col-5 ">
                                            <a href=""  className="badge badge-success LiInf" data-toggle="modal" data-target="#myModalInfo" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="fas fa-info-circle Icono2"></i></a>
                                        </div>
                                        <div className="col-7 ">
                                            <a href="" className="badge badge-primary boEdi" data-toggle="modal" data-target="#myModal" onClick={this.cargarFormulario.bind(this,prestamo.keyID,i)}><i className="far fa-edit plus"></i></a>
                                            <div className="espacio"></div>
                                            <a href="" onClick={this.EliminarPrestamo.bind(this,prestamo.keyID)} className="badge badge-danger boEli"><i className="far fa-trash-alt plus"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">     
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Editar Compra</h4>
                                            </div>
                                            <div className="ModalForm modal-body">
                                            <form action="">
                                                <input className="form-control inputFecha" type="date" name="inputFecha" id="inputFecha" onChange={this.actualizarInputFecha.bind(this)} value={this.state.inputFecha}/>

                                                <label htmlFor="NombreModal">Nombre</label><br/>
                                                <input className="form-control" id="NombreModal" type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/>
                                                
                                                <label htmlFor="PesoKilosModal">Monto</label><br/>
                                                <input className="form-control" id="PesoKilosModal" type="text" value={this.state.monto} onChange={this.actualizarMonto.bind(this)}/><br/>
                                                
                                                <label htmlFor="intereses">Intereses</label><br/>
                                                <input className="form-control" id="intereses" type="text" value={this.state.intereses} onChange={this.actualizarIntereses.bind(this)}/><br/>
                                                
                                                <label htmlFor="comision">Comision</label><br/>
                                                <input className="form-control" id="comision" type="text" value={this.state.comision} onChange={this.actualizarComision.bind(this)}/><br/>
                                                
                                                <label htmlFor="ValorUnidadModal">Numero de cuotas</label><br/>
                                                <input className="form-control" id="ValorUnidadModal" type="text" value={this.state.numCuotas} onChange={this.actualizarNumeroCuotas.bind(this)}/><br/>
                                                
                                                <span >Valor cuota</span><br/>
                                                <h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas)}</h5>

                                            </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button onClick={this.handleDatabase} type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-check Icono"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id="myModalInfo" role="dialog">
                                    <div className="modal-dialog modal-lg" >     
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">{this.state.nombre}</h4>
                                            </div>
                                            <div className="ModalForm modal-body">
                                            <form action="">
                                                <label htmlFor="NombreModal">Nombre</label><br/>
                                                <input className="form-control" id="NombreModal" type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/>
                                                
                                                <label htmlFor="PesoKilosModal">Monto</label><br/>
                                                <input className="form-control" id="PesoKilosModal" type="text" value={this.state.monto} onChange={this.actualizarMonto.bind(this)}/><br/>
                                                
                                                <label htmlFor="intereses">Intereses</label><br/>
                                                <input className="form-control" id="intereses" type="text" value={this.state.intereses} onChange={this.actualizarIntereses.bind(this)}/><br/>
                                                
                                                <label htmlFor="comision">Comision</label><br/>
                                                <input className="form-control" id="comision" type="text" value={this.state.comision} onChange={this.actualizarComision.bind(this)}/><br/>
                                                
                                                <label htmlFor="ValorUnidadModal">Numero de cuotas</label><br/>
                                                <input className="form-control" id="ValorUnidadModal" type="text" value={this.state.numCuotas} onChange={this.actualizarNumeroCuotas.bind(this)}/><br/>
                                                
                                                <span >Valor cuota</span><br/>
                                                <h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas)}</h5>

                                            </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button onClick={this.handleDatabase} type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-check Icono"></i></button>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>

                                <div className="modal fade" id="myModalAgregarCuota" role="dialog">
                                    <div className="modal-dialog">     
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Estado de cuenta: {this.state.nombre}</h4>
                                            </div>
                                            <div className="ModalForm modal-body">
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
                                                            <td>{this.state.numCuotas}</td>
                                                            <td>{this.state.cuotasPagas}</td>
                                                            <td>{this.state.numCuotas-this.state.cuotasPagas}</td>
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
                                                            <td><h5>{"$ "+parseInt((((this.state.monto*(this.state.intereses/100))*this.state.numCuotas)+parseInt(this.state.monto))/this.state.numCuotas).toLocaleString('es-CO')}</h5></td>
                                                            <td><h5>{this.roundNumber((((this.state.valorCuota*(this.state.inputInteresesMora/100))/30)*this.state.diasMora),0).toLocaleString('es-CO')}</h5></td>
                                                            <td><h5>{this.roundNumber(((((this.state.valorCuota*(this.state.inputInteresesMora/100))/30)*this.state.diasMora)+this.state.valorCuota),0).toLocaleString('es-CO')}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                                <a href="#" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-plus-circle Icono3"></i></a>
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

    agregarCuota(id,e){
        e.preventDefault();
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
            console.log(this.state.cuotas)
            const { cuotas } = this.state;
            for(let i = 0; i < cuotas.length; i++) {
                if(cuotas[i].keyID === id) {
                
                var a = cuotas[i].cuotasPagas
                
                }
            } 
            this.setState({cuotas:[]});

            var uno = 1;
            this.setState({
                cuotasPagas:a+parseInt(uno)
            })
            //console.log(this.state.cuotasPagas)

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
                activado: snap.val().activado   
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
                fecha:this.state.inputFecha

        
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
            activado: snap.val().activado   
        });
        //compras.splice(this.id,1);
        //if(this._isMounted){        
        this.setState({prestamos});
        //}
        }); 
    }

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
            <div className="container">
                <div className="row">
                <div className="col">
                 <table className="table table-md table-responsive-sm table-bordered">
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
                            
                            <td>{this.state.totalMonto.toLocaleString('es-CO')}</td>
                            <td>{this.state.totalUtilidad.toLocaleString('es-CO')}</td>
                            <td>{this.state.totalInteresesCapital.toLocaleString('es-CO')}</td>
                            <td>{this.state.totalUtilidadMensual.toLocaleString('es-CO')}</td>
                            <td>{this.state.totalComisionMensual.toLocaleString('es-CO')}</td>
                        </tr>
                    </tbody>
                </table> 
                </div>       
                </div>
            </div>           
        )
    }

    render(){
        return (
            <div>
                {
                    this.renderTabla()
                }
            </div>
            
        );
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
    }*/

