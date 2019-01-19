import React, { Component } from 'react';

class HistorialDeCierres extends Component {
    render(){
        return (
            <div>
                <h1>HistorialDeCierres</h1>
            </div>
        );
    }
}
export default HistorialDeCierres;/*





import React, { Component } from 'react';
import firebase from 'firebase'; 
import swal from 'sweetalert';

import './global/css/CrearCompras.css'

class CrearPrestamos extends Component {
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
            user:'',
            enPromedio:false

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
                        type="number" 
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
            swal("Campos vacios!", "¡No se puede hacer una compra sin datos !", "warning");
        
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
                horaExacta: horaExacta,
                enPromedio:this.state.enPromedio,
                calidad_enPromedio:(this.state.calidad+"_"+this.state.enPromedio)
        
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
                horaExacta: horaExacta,
                enPromedio:this.state.enPromedio,
                calidad_enPromedio:(this.state.calidad+"_"+this.state.enPromedio)
        
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
export default CrearPrestamos;









import React, { Component } from 'react';
import firebase from 'firebase';
import './global/css/VerCompras.css';
import swal from 'sweetalert';


class VerPrestamos extends Component { 
    constructor(){
        super();
        this.state = {
            compras:[],
            fecha:'',
            nombre:'',
            calidad:'Pergamino',
            pesoKilos:'',
            pesoArrobas:'',
            valorUnidad:'',
            total:'',
            user:'',
            selectDia:'',
            selectMes:'',
            selectYear:'',
            keyID:'',
            idArray:'',
            fechaParaBuscar:''    
        };
        this.handleDatabase = this.handleDatabase.bind(this);
        this.renderTabla=this.renderTabla.bind(this)
        this.renderSelectFecha=this.renderSelectFecha.bind(this)

    }
    _isMounted = false

    componentWillMount(){
        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth()+1;
        var year = dt.getFullYear();
        var fecha = (dia+"/"+mes+"/"+year); 
       // if(this._isMounted){
            this.setState({
                selectDia:dia,
                selectMes:mes,
                selectYear:year
            })
        //}
        console.log(fecha)
          firebase.database().ref('compraDeCafe/compras').orderByChild("fecha").equalTo(fecha).on('child_added', snap => {
            const { compras } = this.state;            
            compras.push({
                keyID: snap.key,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                pesoKilos: snap.val().pesoKilos,
                pesoArrobas:snap.val().pesoArrobas,
                total: snap.val().total,
                user: snap.val().user,
                valorUnidad:snap.val().valorUnidad,
                calidad: snap.val().calidad   
            });
            if(this._isMounted){        
                this.setState({compras});
            }
        });
    console.log("cwm");

    }

    componentDidMount(){

        const { compras } = this.state;

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

    EliminarAlmacen(id,e){
        e.preventDefault();
       var r = window.confirm("Esta seguro?");
        if (r === true) {
            const dbRef = firebase.database().ref('compraDeCafe/compras');
            dbRef.child(id).remove();
        } else {
    
        } 
        
      }

    actualizarTabla(e){
        e.preventDefault();
       // this.setState({ bandera:false });
        this.setState({compras:[]});
        var {compras} = this.state; 
        compras=[];  
        firebase.database().ref('compraDeCafe/compras')
        .orderByChild("fecha").equalTo(this.state.selectDia+"/"+this.state.selectMes+"/"+this.state.selectYear)
        .on('child_added', snap => {  
            compras.push({
                keyID: snap.key,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                pesoKilos: snap.val().pesoKilos,
                pesoArrobas:snap.val().pesoArrobas,
                total: snap.val().total,
                user: snap.val().user,
                valorUnidad:snap.val().valorUnidad,
                calidad: snap.val().calidad   
            });
            
            this.setState({
                compras:compras,        
            });      
                   
        });
    }

    actualizarCalida(e) {
        this.setState({
            calidad: e.target.value  
        });
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
    actualizarPeso(e) {
        this.setState({
            pesoKilos: e.target.value,
        });   
    }

    actualizarValorUnidad(e) {
        this.setState({
          valorUnidad: e.target.value,
        });
    }

    cargarFormulario(id,i,e){
        e.preventDefault();

        const { compras } = this.state;
        for(let i = 0; i < compras.length; i++) {
            if(compras[i].keyID === id) {
                this.setState({
                    nombre:compras[i].nombre,
                    calidad:compras[i].calidad,
                    pesoKilos:compras[i].pesoKilos,
                    valorUnidad:compras[i].valorUnidad,
                    keyID:compras[i].keyID,
                    fechaParaBuscar:compras[i].fecha
                })
            }
        }       
    }

    renderTabla(){
        return(
            <div className="Tabla col-sm-8"> 
            <br/>
            <div className="card">
                <div className="ContenedorTitulo">
                    <h1 className="Titulo display-4">Prestamos</h1>     
                </div> 
                <br/>
                <div className="FechaTabla">
                    <h5>Buscar compras por fecha</h5>
                    {this.renderSelectFecha()}
                </div> 
            </div>           
            <br/>  
            <br/>
            <table className="table table-bordered" id="tabla">
            <thead>
                <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Fecha-Hora</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Calidad</th>
                    <th scope="col">Peso Kilos</th>
                    <th scope="col">Peso Arrobas</th>
                    <th scope="col">Valor Unidad</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>          
                </tr>
            </thead> 
            { 
                this.state.compras.map((compra,i) => (
                    <tbody key={i}>
                    <tr>
                        <th scope="row">{compra.user}</th>
                        <td>{compra.fecha+" - "+compra.horaExacta}</td>
                        <td>{compra.nombre}</td>
                        <td><p>{compra.calidad}</p></td>
                        <td>{compra.pesoKilos}</td>
                        <td>{compra.pesoArrobas}</td>
                        <td>{compra.valorUnidad.toLocaleString('es-CO')}</td> 
                        <td>{compra.total.toLocaleString('es-CO')}</td> 
                        <td>
                        <div className="container"> 
                            <button type="button" className="badge badge-primary" data-toggle="modal" data-target="#myModal" onClick={this.cargarFormulario.bind(this,compra.keyID,i)}><i className="far fa-edit Icono"></i></button>
                            <a href="" onClick={this.EliminarAlmacen.bind(this,compra.keyID)} className="badge badge-danger"><i className="far fa-trash-alt Icono"></i></a>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">     
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Editar Compra</h4>
                                        </div>
                                        <div className="ModalForm modal-body">
                                        <form action="">
                                            <label htmlFor="NombreModal">Nombre</label><br/>
                                            <input className="form-control" id="NombreModal" type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/>
                                            <label htmlFor="CalidadModal">Calidad</label><br/>
                                            <select 
                                                className="form-control"
                                                id="CalidadModal"
                                                value={this.state.calidad}
                                                onChange={this.actualizarCalida.bind(this)}>
                                                <option>Pergamino</option>
                                                <option>Cafe verde</option>
                                                <option>Pasilla</option>
                                                <option>Otro</option>
                                            </select><br/>
                                            <label htmlFor="PesoKilosModal">Peso Kilos</label><br/>
                                            <input className="form-control" id="PesoKilosModal" type="text" value={this.state.pesoKilos} onChange={this.actualizarPeso.bind(this)}/><br/>
                                            
                                            <label htmlFor="ValorUnidadModal">Valor Unidad</label><br/>
                                            <input className="form-control" id="ValorUnidadModal" type="text" value={this.state.valorUnidad} onChange={this.actualizarValorUnidad.bind(this)}/><br/>
                                            
                                            <span >Total</span><br/>
                                            <h5>{"$ "+((this.state.pesoKilos*this.state.valorUnidad)/12.5).toLocaleString('es-CO')}</h5>
                                            <span>Arrobas</span>
                                            <h5>{"@ "+this.state.pesoKilos/12.5}</h5>

                                        </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={this.handleDatabase} type="button" className="badge badge-primary" data-dismiss="modal"><i className="fas fa-check Icono"></i></button>
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

    handleDatabase(event){
        event.preventDefault();
        
        if(this.state.pesoKilos === ''|| this.state.valorUnidad === '' ){
            swal("Campos vacios!", "¡No se puede hacer una compra sin datos !", "warning");
        
        }else if(this.state.nombre===''){
            const nombre = 'clientes varios'
            const record = { 
                nombre : nombre,
                calidad: this.state.calidad,
                pesoKilos: this.state.pesoKilos*1,
                pesoArrobas:this.state.pesoKilos/12.5,
                valorUnidad: this.state.valorUnidad*1,
                total: (this.state.valorUnidad*this.state.pesoKilos)/12.5,        
            }

            const dbRef = firebase.database().ref('compraDeCafe/compras');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Compra editada!", "haz click en el boton!", "success");                  
                }
            });

        }else{
            const record = { 
                nombre : this.state.nombre,
                calidad: this.state.calidad,
                pesoKilos: this.state.pesoKilos*1,
                pesoArrobas:this.state.pesoKilos/12.5,
                valorUnidad: this.state.valorUnidad*1,
                total: (this.state.valorUnidad*this.state.pesoKilos)/12.5,
        
            } 
        
            const dbRef = firebase.database().ref('compraDeCafe/compras');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Compra editada!", "haz click en el boton!", "success");               
                }
            } );
       }
        this.setState({compras:[]});
        var {compras} = this.state; 
        compras=[]; 
        firebase.database().ref('compraDeCafe/compras').orderByChild("fecha").equalTo(this.state.fechaParaBuscar).on('child_added', snap => {
        //const { compras } = this.state;            
        compras.push({
            keyID: snap.key,
            fecha: snap.val().fecha,
            horaExacta: snap.val().horaExacta,
            nombre: snap.val().nombre,
            pesoKilos: snap.val().pesoKilos,
            pesoArrobas:snap.val().pesoArrobas,
            total: snap.val().total,
            user: snap.val().user,
            valorUnidad:snap.val().valorUnidad,
            calidad: snap.val().calidad   
        });
        //compras.splice(this.id,1);
        //if(this._isMounted){        
        this.setState({compras});
        //}
    }); 
    }

    renderSelectFecha(){
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
    }

    render(){
        return (
            <div>
                {this.renderTabla()}
            </div>
            
        );
    } 
}
export default VerPrestamos;








*/