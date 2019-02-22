import React from 'react';
import { Route, Switch } from 'react-router-dom';


import App from './componentes/App';
import CrearPrestamos from './componentes/CrearPrestamos';
import VerPrestamos from './componentes/VerPrestamos';
import Registro from './componentes/Registro';
import VerVentas from './componentes/VerVentas';
import Promedios from './componentes/Promedios';
import PromediosGuardados from './componentes/PromediosGuardados';
import Gastos from './componentes/Gastos';
import Ingresos from './componentes/Ingresos';
import CerrarDia from './componentes/CerrarDia';
import HistorialDeCierres from './componentes/HistorialDeCierres';

const AppRoutes = () =>
    <App>
        <Switch>
        <Route exact path="/CrearPrestamos" component={CrearPrestamos}/>
        <Route exact path="/VerPrestamos" component={VerPrestamos}/>
        <Route exact path="/Registro" component={Registro}/>
        <Route exact path="/VerVentas" component={VerVentas}/>
        <Route exact path="/Promedios" component={Promedios}/>
        <Route exact path="/PromediosGuardados" component={PromediosGuardados}/>
        <Route exact path="/Gastos" component={Gastos}/>
        <Route exact path="/Ingresos" component={Ingresos}/>
        <Route exact path="/CerrarDia" component={CerrarDia}/>
        <Route exact path="/HistorialDeCierres" component={HistorialDeCierres}/>                    
        </Switch>
    </App>
    export default AppRoutes;