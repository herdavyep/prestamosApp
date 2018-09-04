import React, { Component } from 'react';
import firebase from 'firebase';
import './global/css/VerCompras.css';

class VerCompras extends Component {
    constructor(){
        super();
        this.state = {
            bandera:false,
            compras:[],
            fecha:'',
            nombre:'',
            calidad:'Pergamino',
            peso:'',
            valorUnidad:'',
            total:'',
            user:'',
            selectDia:'1',
            selectMes:'1',
            selectYear:'2018'
    
    
        };
        this.renderTabla=this.renderTabla.bind(this)
        this.renderSelectFecha=this.renderSelectFecha.bind(this)

    }
    _isMounted = false

    componentDidMount(e){
        this._isMounted = true
        console.log("cdm")
    }
   componentWillUnmount(){
        console.log("cwu");
        this._isMounted = false
      }
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
          firebase.database().ref('compraDeCafe/compras').orderByChild("fecha").equalTo(fecha).on('child_added', snap => {
            const { compras } = this.state;            
            compras.push({
                keyID: snap.key,
                fecha: snap.val().fecha,
                horaExacta: snap.val().horaExacta,
                nombre: snap.val().nombre,
                peso: snap.val().peso,
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

    componentDidUpdate(){
        console.log("cdu");
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
                    peso: snap.val().peso,
                    total: snap.val().total,
                    user: snap.val().user,
                    valorUnidad:snap.val().valorUnidad,
                    calidad: snap.val().calidad   
                });
                
                this.setState({
                    compras:compras,
                    bandera:true
        
                });      
                   
                console.log(compras)

         });
         console.log(this.state.compras)
    }

    eliminarCompra(id,e){
        e.preventDefault();
        console.log(id)
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
            peso: e.target.value,
        });   
    }

    actualizarValorUnidad(e) {
        this.setState({
          valorUnidad: e.target.value,
        });
    }

    cargarFormulario(id,e){
        e.preventDefault();
        const { compras } = this.state;
        for(let i = 0; i < compras.length; i++) {
            if(compras[i].keyID === id) {
                this.setState({
                    nombre:compras[i].nombre,
                    calidad:compras[i].calidad,
                    peso:compras[i].peso,
                    valorUnidad:compras[i].valorUnidad,
                })
                //console.log(pictures[i].nombre)
            }
        }
        
    }

    renderTabla(){
        return(
            <div className="Tabla col-md-8"> 
            <br/>
            <div className="ContenedorTitulo">
                <h1 className="Titulo display-4">Compras</h1>     
            </div> 
            <br/>
            <div className="FechaTabla">
                <h5>Buscar compras por fecha</h5>
                {this.renderSelectFecha()}
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
                    <th scope="col">Peso</th>
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
                        <td>{compra.peso}</td>
                        <td>{compra.valorUnidad.toLocaleString('es-CO')}</td> 
                        <td>{compra.total.toLocaleString('es-CO')}</td> 
                        <td>
                        <div className="container">
                            <button type="button" className="badge badge-primary" data-toggle="modal" data-target="#myModal" onClick={this.cargarFormulario.bind(this,compra.keyID)}>Editar compra</button>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">     
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Editar Compra</h4>
                                        </div>
                                        <div className="ModalForm modal-body">
                                        <form action="">
                                            <label htmlFor="">Nombre</label><br/>
                                            <input type="text" value={this.state.nombre} onChange={this.actualizarNombre.bind(this)}/><br/><br/>
                                            <label htmlFor="">Calidad</label><br/>
                                            <select 
                                                value={this.state.calidad}
                                                onChange={this.actualizarCalida.bind(this)}>
                                                <option>Pergamino</option>
                                                <option>Cafe verde</option>
                                                <option>Pasilla</option>
                                                <option>Otro</option>
                                            </select><br/><br/>
                                            <label htmlFor="">Peso @</label><br/>
                                            <input type="text" value={this.state.peso} onChange={this.actualizarPeso.bind(this)}/><br/><br/>
                                            <label htmlFor="">Valor Unidad</label><br/>
                                            <input type="text" value={this.state.valorUnidad} onChange={this.actualizarValorUnidad.bind(this)}/><br/><br/>
                                            <label htmlFor="">Total</label><br/>
                                            <h5>{this.state.peso*this.state.valorUnidad}</h5>

                                        </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="badge badge-primary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            
                            </div>
                        <br/>
                        <a href="" onClick={this.eliminarCompra.bind(this,compra.keyID)} className="badge badge-danger">Eliminar</a>
                        </td>                                     
                    </tr>
                    </tbody>             
                ))//.reverse()
            }  
            </table>      
        </div>
        )
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

                <a href="" onClick={this.actualizarTabla.bind(this)} className="BotonBuscar badge badge-primary">Buscar</a>
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
export default VerCompras;