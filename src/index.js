import React from 'react';
import firebase from 'firebase';
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRoutes from './routes';
import {  BrowserRouter as Router } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyAk2vkyGyxlwb8Op06dQSBusjevhh108kQ",
    authDomain: "compra-cafe-heri.firebaseapp.com",
    databaseURL: "https://compra-cafe-heri.firebaseio.com",
    projectId: "compra-cafe-heri",
    storageBucket: "",
    messagingSenderId: "1099267404920"
});


render(
<Router>
    <AppRoutes/>
</Router>, document.getElementById('root'));
registerServiceWorker();
