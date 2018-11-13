import React, { Component } from 'react';
import logo from './global/images/marco.png';
import cafe from './global/images/grano-cafe.png';
import './global/css/Gastos.css'


class Gastos extends Component {
    constructor(){
        super();
        this.state={
            imagen:cafe
        }
    
    this.cargarImagen = this.cargarImagen.bind(this);
    }

    cargarImagen(e){
        const imagen = e.target.files[0].name;
        console.log(imagen)
        this.setState({
            imagen
        })
    }

    render(){
        return (
            <div className="contenedor">
                <div className="logo">
                    <img src={this.state.imagen} alt="" className="imagen"/>
                    <input type="file" name="" id="" onChange={this.cargarImagen}/>
                </div>
            </div>
           
        );
    }
}
export default Gastos;