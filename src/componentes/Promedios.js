import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import './global/css/Promedios.css';

class Promedios extends Component {
    constructor(){
        super();
        this.state={
            user:'',
            promedios:[],
            arrobasPergamino:0,
            totalPergamino:0,
            arrobasPasilla:0,
            totalPasilla:0,
            arrobasCafeVerde:0,
            totalCafeVerde:0,
            inputTrasladarVerdeValor:'',
            BDtrasladosCafeVerdeArrobas:0,
            BDtrasladosCafeVerdeTotal:0

        }
        this.renderTablaPergamino=this.renderTablaPergamino.bind(this)
        this.renderTablaPasilla=this.renderTablaPasilla.bind(this)
        this.renderTablaCafeVerde=this.renderTablaCafeVerde.bind(this)
        this.handleDatabasePromediosCafeVerde=this.handleDatabasePromediosCafeVerde.bind(this)
        this.roundNumber=this.roundNumber.bind(this)
        this.handleTrasladosVerde=this.handleTrasladosVerde.bind(this)
       
    }

    is_mouted=false

    componentWillMount(){
        console.log("cdm")
        this.is_mouted=true
    }

    componentDidMount(){
        console.log("cwm")

        if (this.is_mouted) {

            firebase.auth().onAuthStateChanged(user => {
                this.setState({ 
                    user: user 
                }); 
            })

            var arrobasPergamino = 0;
            var totalPergamino = 0;
            firebase.database().ref('compraDeCafe/compras').orderByChild("calidad_enPromedio").equalTo("Pergamino_false").on('child_added', snap => {
    
                arrobasPergamino=arrobasPergamino+snap.val().pesoArrobas
                totalPergamino=totalPergamino+snap.val().total
                this.setState({
                    arrobasPergamino,
                    totalPergamino
                })
            });

            var arrobasPasilla = 0;
            var totalPasilla = 0;
            firebase.database().ref('compraDeCafe/compras').orderByChild("calidad_enPromedio").equalTo("Pasilla_false").on('child_added', snap => {

                arrobasPasilla=arrobasPasilla+snap.val().pesoArrobas
                totalPasilla=totalPasilla+snap.val().total
                this.setState({
                    arrobasPasilla,
                    totalPasilla
                })
            });

            var arrobasCafeVerde = 0;
            var totalCafeVerde = 0;
            firebase.database().ref('compraDeCafe/compras').orderByChild("calidad_enPromedio").equalTo("Cafe verde_false").on('child_added', snap => {

                arrobasCafeVerde=arrobasCafeVerde+snap.val().pesoArrobas
                totalCafeVerde=totalCafeVerde+snap.val().total
                this.setState({
                    arrobasCafeVerde,
                    totalCafeVerde
                })
            });

            var arrobasTrasladosCafeVerde = 0;
            var totalTrasladosCafeVerde = 0;
            firebase.database().ref('compraDeCafe/traslados').orderByChild("calidad_enPromedio").equalTo("Cafe verde_false").on('child_added', snap => {

                arrobasTrasladosCafeVerde=arrobasTrasladosCafeVerde+snap.val().arrobas
                totalTrasladosCafeVerde=totalTrasladosCafeVerde+snap.val().total
                this.setState({
                    BDtrasladosCafeVerdeArrobas:arrobasTrasladosCafeVerde,
                    BDtrasladosCafeVerdeTotal:totalTrasladosCafeVerde
                })
            });

             //Math.round((this.state.totalPergamino+(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)))/(this.state.arrobasPergamino+this.state.inputTrasladarVerdeValor*1)).toLocaleString('es-CO')
            /*<td>{Math.round((this.state.totalPergamino+(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)))/(this.state.arrobasPergamino+this.state.inputTrasladarVerdeValor*1)).toLocaleString('es-CO')}</td> 
        <td>{parseInt(this.state.totalPergamino+(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)), 10).toLocaleString('es-CO')}</td>                                                                         
        */

        } 
    }

    componentWillUnmount(){
        this.is_mouted=false
        console.log("cwum")

    }

    trasladarVerde(e) {

        var inputTrasladarVerde = e.target.value
    
        this.setState({
            inputTrasladarVerdeValor: inputTrasladarVerde
        });
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

    renderTablaPergamino(){
        return(
            <div className="Tabla col-md-8"> 
            <div className="card">
                <div className="ContenedorTitulo">
                    <h1 className="Titulo display-4">Pergamino</h1>     
                </div> 
                <br/>
            </div>           
            <table className="table table-bordered" id="tabla">
                <thead>
                    <tr>
                        <th scope="col">Peso Arrobas</th>
                        <th scope="col">Valor unidad</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>          
                    </tr>
                </thead> 
                { 
                    <tbody>
                        <tr>                            
                            <td>{this.roundNumber(this.state.arrobasPergamino+this.state.inputTrasladarVerdeValor*1,2)}</td>                          
                            <td>{Math.round((this.state.totalPergamino+(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)))/(this.state.arrobasPergamino+this.state.inputTrasladarVerdeValor*1)).toLocaleString('es-CO')}</td> 
                            <td>{parseInt(this.state.totalPergamino+(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)), 10).toLocaleString('es-CO')}</td>                                                                         
                            <td><button className="btn btn-primary"><i className="far fa-save Icono"></i></button></td>
                        </tr>
                    </tbody> 
                } 
            </table> 
        </div>
        )
    }

    renderTablaPasilla(){
        return(
            <div className="Tabla col-md-8"> 
            <br/>
            <div className="card">
                <div className="ContenedorTitulo">
                    <h1 className="Titulo display-4">Pasilla</h1>     
                </div> 
                <br/>
            </div>           
            <table className="table table-bordered" id="tabla">
                <thead>
                    <tr>
                        <th scope="col">Peso Arrobas</th>
                        <th scope="col">Valor unidad</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>          
                    </tr>
                </thead> 
                { 
                    <tbody>
                        <tr>                            
                            <td>{this.roundNumber(this.state.arrobasPasilla,2)}</td>                          
                            <td>{Math.round(this.state.totalPasilla/this.state.arrobasPasilla).toLocaleString('es-CO')}</td> 
                            <td>{parseInt(this.state.totalPasilla, 10).toLocaleString('es-CO')}</td>                                                                         
                            <td><button className="btn btn-primary"><i className="far fa-save Icono"></i></button></td>
                        </tr>
                            
                    
                        <tr>
                            <td><label htmlFor="inputPergamino">Trasladar de la pasilla</label></td>
                            <td><input type="text" id="inputPergamino"/></td>
                            <td><label htmlFor="selectPergamino"> Al</label></td>
                            <td>
                                <select id="selectPergamino">
                                    <option value="">Pergamino</option>
                                    <option value="">Cafe verde</option>
                                </select>
                            </td>   
                        </tr> 
                    </tbody> 
                } 
            </table> 
        </div>
        )
    }

    renderTablaCafeVerde(){
        return(
            <div className="Tabla col-md-8"> 
            <br/>
            <div className="card">
                <div className="ContenedorTitulo">
                    <h1 className="display-4">Cafe verde</h1>     
                </div> 
                <br/>
            </div>           
            <table className="table table-bordered" id="tabla">
                <thead>
                    <tr>
                        <th scope="col">Peso Arrobas</th>
                        <th scope="col">Valor unidad</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>          
                    </tr>
                </thead> 
                { 
                    <tbody>
                        <tr>                            
                            <td>{this.roundNumber(this.state.arrobasCafeVerde-this.state.inputTrasladarVerdeValor-this.state.BDtrasladosCafeVerdeArrobas,2)}</td>                          
                            <td>{Math.round(this.state.totalCafeVerde/this.state.arrobasCafeVerde).toLocaleString('es-CO')}</td> 
                            <td>{this.roundNumber((this.state.totalCafeVerde-this.state.BDtrasladosCafeVerdeTotal)-(this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)),0).toLocaleString('es-CO')}</td>                                                                         
                            <td><button onClick={this.handleDatabasePromediosCafeVerde} className="btn btn-primary"><i className="far fa-save Icono"></i></button></td>
                        </tr>                            
                        <tr>
                            <td><label htmlFor="inputPergamino">Trasladar del cafe Verde</label></td>
                            <td><input 
                                type="number" 
                                id="inputPergamino"
                                placeholder="Ejemplo @ : 20"
                                value={this.state.inputTrasladarVerdeValor.toLocaleString('es-CO')}
                                onChange={this.trasladarVerde.bind(this)}
                                autoComplete="nombre"
                                className="form-control"
                                name="inputTrasladarVerde"
                                /></td>
                            <td><label htmlFor="selectPergamino"> A</label></td>
                            <td className="CajaSelectButton">
                                <select id="selectPergamino"
                                        className="form-control"
                                        name="selectTrasladarVerde">
                                    <option value="">Pergamino</option>
                                </select>
                                <button className="btn btn-primary" onClick={this.handleTrasladosVerde} ><i className="far fa-paper-plane Icono"></i></button>
                            </td>  
                        </tr> 
                    </tbody> 
                } 
            </table> 
        </div>
        )
    }

    handleTrasladosVerde(event){
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
            calidad_enPromedio:"Cafe verde_false",
            user: this.state.user.email,
            horaExacta: horaExacta,
            arrobas:this.state.inputTrasladarVerdeValor*1,
            total:this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde)        
        }

        const dbRef = firebase.database().ref('compraDeCafe/traslados');
        const newPicture = dbRef.push();
        newPicture.set(record);

        //compras

        const nombre = 'del verde'
        const record2 = { 
            fecha: fecha,
            nombre : nombre,
            calidad: "Pergamino",
            pesoKilos: 0,
            pesoArrobas:this.state.inputTrasladarVerdeValor*1,
            valorUnidad: this.state.totalCafeVerde/this.state.arrobasCafeVerde,
            total: this.state.inputTrasladarVerdeValor*(this.state.totalCafeVerde/this.state.arrobasCafeVerde),
            user: this.state.user.email,
            horaExacta: horaExacta,
            enPromedio:false,
            calidad_enPromedio:"Pergamino_false"
    
        }

        const dbRef2 = firebase.database().ref('compraDeCafe/compras');
        const newPicture2 = dbRef2.push();
        newPicture2.set(record2
        ,function(error) {
            if (error) {
                console.log(error.message)
            } else {
                swal("Traslado exitoso!", "haz click en el boton!", "success");                  
            }
        });

        this.setState({
            inputTrasladarVerdeValor:''
        })

    }

    handleDatabasePromediosCafeVerde(event){
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
            mes:mes,
            dia:dia,
            year:year,
            calidad:"cafe verde",
            user: this.state.user.email,
            horaExacta: horaExacta,
            arrobas:this.state.arrobasCafeVerde-this.state.BDtrasladosCafeVerdeArrobas,
            total:this.state.totalCafeVerde-this.state.BDtrasladosCafeVerdeTotal,
            valorUnidad:Math.round(this.state.totalCafeVerde/this.state.arrobasCafeVerde)
        }

        const dbRef = firebase.database().ref('compraDeCafe/promedios');
        const newPicture = dbRef.push();
        newPicture.set(record
        ,function(error) {
            if (error) {
                console.log(error.message)
            } else {
                swal("Promedio guardado con exito!", "haz click en el boton!", "success");
                
            }
        });    
        
        firebase.database().ref('compraDeCafe/compras').orderByChild("calidad_enPromedio").equalTo("Cafe verde_false").on('child_added', snap => {
            
            var claveChild=snap.key

            const record2 = {
                calidad_enPromedio:"Cafe verde_true",
                enPromedio:true
            }
            const dbRef2 = firebase.database().ref('compraDeCafe/compras');
            dbRef2.child(claveChild).update(record2
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {

                }
            } );
        }); 

        firebase.database().ref('compraDeCafe/traslados').orderByChild("calidad_enPromedio").equalTo("Cafe verde_false").on('child_added', snap => {
            
            var claveChild=snap.key

            const record2 = {
                calidad_enPromedio:"Cafe verde_true",
            }
            const dbRef2 = firebase.database().ref('compraDeCafe/traslados');
            dbRef2.child(claveChild).update(record2
            ,function(error) {
                if (error) {
                    console.log(error.message)
                } else {

                }
            } );
        }); 


        this.setState({
            arrobasCafeVerde:0,
            totalCafeVerde:0,
            BDtrasladosCafeVerdeArrobas:0,
            BDtrasladosCafeVerdeTotal:0
        })
          
    }

    render(){
        return (
            <div>
                <h1 className="TituloPrincipal display-3">Promedios actuales</h1>  
                {this.renderTablaPergamino()}
                {this.renderTablaPasilla()}
                {this.renderTablaCafeVerde()}
            </div>
        );
    }
}
export default Promedios;