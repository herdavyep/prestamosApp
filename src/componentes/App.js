import React, { Component } from 'react';
import InicioDeSesion from './global/InicioDeSesion'
import PropTypes from 'prop-types';
import Content from './global/Content';
import NavBar from './global/NavBar';
import Footer from './global/Footer';
import firebase from 'firebase';
import moment from 'moment';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user:null, 
      prestamos:[],
      mensaje:''
    };
   this.mensaje=this.mensaje.bind(this); 
  }

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  is_mouted=false

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      
      this.setState({ 
        user: user 
      });
    })

    firebase.database().ref('prestamosJuan/prestamo').orderByChild("activado").equalTo("1").on('child_added', snap => {
      const { prestamos} = this.state; 
      
      var a = moment(snap.val().fecha,["YYYY-MM-DD"]);
      var b = a.clone().add(snap.val().cuotasPagas+1, 'month')
      var fecha1 = moment();
      var fecha2 = moment(b);

      var antesDePago = fecha1.diff(fecha2,'days')
      //console.log(antesDePago > -2 && antesDePago < 1)
      //console.log(antesDePago)

      if(antesDePago > -2 && antesDePago < 1){
        prestamos.push({mensaje:"El cliente "+snap.val().nombre+" debe pagar el dia "+b.format('DD/MM/YYYY')})
        this.setState({
          prestamos
        })
      }
    }); 
    
    this.is_mouted=true
  }

  mensaje(){
    return(
      <div>
        {
          this.state.prestamos.map((prestamo,i) => (
            <div key={i} className="alert alert-warning alert-dismissible fade show" role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
              <strong>PAGOS!!</strong> {prestamo.mensaje}
            </div>
          ))
        }
      </div>
    )
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.is_mouted=false
  }

  render() {
    const{ children } = this.props;
    if(this.state.user && this.is_mouted){
        return (  
          <div className="App">
            {this.mensaje()}
            <NavBar/>
            <Content body={children}/>
            <Footer/>
          </div>
        );           
    }else{
      return(
        <InicioDeSesion/>
      )
    }
  }   
}

export default App;
