import React, { Component } from 'react';
import firebase from 'firebase';
import './global/css/VerVentas.css';
import swal from 'sweetalert';


class VerVentas extends Component {
    constructor(){
        super();
        this.state = {
            ventas:[],
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
    id=''

    componentWillMount(){
        var dt = new Date()
        var dia = dt.getDate();
        var mes = dt.getMonth()+1;
        var year = dt.getFullYear();
        var fecha = (dia+"/"+mes+"/"+year); 
        //if(this._isMounted){
            this.setState({
                selectDia:dia,
                selectMes:mes,
                selectYear:year
            })
       // }
        console.log(fecha)
          firebase.database().ref('compraDeCafe/ventas').orderByChild("fecha").equalTo(fecha).on('child_added', snap => {
            const { ventas } = this.state;            
            ventas.push({
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
            //if(this._isMounted){        
                this.setState({ventas});
            //}
        });
    console.log("cwm");

    }

    componentDidMount(){

        const { ventas } = this.state;

        firebase.database().ref('compraDeCafe/ventas').on('child_removed', snap => {
            for(let i = 0; i < ventas.length; i++) {
                if(ventas[i].keyID === snap.key) {
                    ventas.splice(i , 1);
                }
            }
            this.setState({ ventas });
        });
        //this._isMounted = true     

        console.log("cdm")
    }

   componentWillUnmount(){
        console.log("cwu");
        this._isMounted = false
    }

    componentWillUpdate(){
        console.log("cwu");
    }

    EliminarVenta(id,e){
        e.preventDefault();
        var r = window.confirm("Esta seguro?");
        if (r === true) {
            const dbRef = firebase.database().ref('compraDeCafe/ventas');
            dbRef.child(id).remove();
        } else {
    
        }    
      }

    actualizarTabla(e){
        e.preventDefault();
       // this.setState({ bandera:false });
        this.setState({ventas:[]});
        var {ventas} = this.state; 
        ventas=[];  
        firebase.database().ref('compraDeCafe/ventas')
        .orderByChild("fecha").equalTo(this.state.selectDia+"/"+this.state.selectMes+"/"+this.state.selectYear)
        .on('child_added', snap => {  
            ventas.push({
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
                ventas:ventas        
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
            this.id=i
        //console.log(i+"  "+this.id)
        const { ventas } = this.state;
        for(let i = 0; i < ventas.length; i++) {
            if(ventas[i].keyID === id) {
                this.setState({
                    nombre:ventas[i].nombre,
                    calidad:ventas[i].calidad,
                    pesoKilos:ventas[i].pesoKilos,
                    valorUnidad:ventas[i].valorUnidad,
                    keyID:ventas[i].keyID,
                    fechaParaBuscar:ventas[i].fecha
                })
                //console.log(pictures[i].nombre)
            }
        }
        
    }

    renderTabla(){
        return(
            <div className="Tabla col-md-8"> 
            <br/>
            <div className="card">
                <div className="ContenedorTitulo">
                    <h1 className="Titulo display-4">Ventas</h1>     
                </div> 
                <br/>
                <div className="FechaTabla">
                    <h5>Buscar ventas por fecha</h5>
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
                this.state.ventas.map((venta,i) => (
                    <tbody key={i}>
                    <tr>
                        <th scope="row">{venta.user}</th>
                        <td>{venta.fecha+" - "+venta.horaExacta}</td>
                        <td>{venta.nombre}</td>
                        <td><p>{venta.calidad}</p></td>
                        <td>{venta.pesoKilos}</td>
                        <td>{venta.pesoArrobas}</td>
                        <td>{venta.valorUnidad.toLocaleString('es-CO')}</td> 
                        <td>{venta.total.toLocaleString('es-CO')}</td> 
                        <td>
                        <div className="container"> 
                            <button type="button" className="badge badge-primary" data-toggle="modal" data-target="#myModal" onClick={this.cargarFormulario.bind(this,venta.keyID,i)}><i className="far fa-edit Icono"></i></button>
                            <a href="" onClick={this.EliminarVenta.bind(this,venta.keyID)} className="badge badge-danger"><i className="far fa-trash-alt Icono"></i></a>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">     
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Editar Venta</h4>
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
            swal("Campos vacios!", "¡No se puede hacer una venta sin datos !", "warning");
        
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

            const dbRef = firebase.database().ref('compraDeCafe/ventas');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Venta editada!", "haz click en el boton!", "success");                  
                }
            } );

        } else{
            const record = { 
                nombre : this.state.nombre,
                calidad: this.state.calidad,
                pesoKilos: this.state.pesoKilos*1,
                pesoArrobas:this.state.pesoKilos/12.5,
                valorUnidad: this.state.valorUnidad*1,
                total: (this.state.valorUnidad*this.state.pesoKilos)/12.5,
        
            } 
        
            const dbRef = firebase.database().ref('compraDeCafe/ventas');
            dbRef.child(this.state.keyID).update(record
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {
                    swal("Venta editada!", "haz click en el boton!", "success");               
                }
            } );
       }
       this.setState({ventas:[]});
        var {ventas} = this.state; 
        ventas=[]; 
       firebase.database().ref('compraDeCafe/ventas').orderByChild("fecha").equalTo(this.state.fechaParaBuscar).on('child_added', snap => {
        //const { compras } = this.state;            
        ventas.push({
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
        this.setState({ventas});
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
export default VerVentas;