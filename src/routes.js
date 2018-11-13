import React from 'react';
import { Route, Switch } from 'react-router-dom';


import App from './componentes/App';
import CrearCompras from './componentes/CrearCompras';
import VerCompras from './componentes/VerCompras';
import CrearVentas from './componentes/CrearVentas';
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
        <Route exact path="/CrearCompras" component={CrearCompras}/>
        <Route exact path="/VerCompras" component={VerCompras}/>
        <Route exact path="/CrearVentas" component={CrearVentas}/>
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