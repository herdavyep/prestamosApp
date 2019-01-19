import React from 'react';
import firebase from 'firebase';
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRoutes from './routes';
import {  BrowserRouter as Router } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyDHhqog7mMfc0lXWG9X9sUz7aKtgyTmgl0",
    authDomain: "prestamosappjuanp.firebaseapp.com",
    databaseURL: "https://prestamosappjuanp.firebaseio.com",
    projectId: "prestamosappjuanp",
    storageBucket: "prestamosappjuanp.appspot.com",
    messagingSenderId: "66079732116"
});


render(
<Router>
    <AppRoutes/>
</Router>, document.getElementById('root'));
registerServiceWorker();
