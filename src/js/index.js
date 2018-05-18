//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-41629310-5');


//include jquery into the bundle and store its contents into the $ variable
import $ from "jquery";
//include bootstrap npm library into the bundle
import 'bootstrap';

//include your index.scss file into the bundle
import '../styles/index.scss';

//import your own components
import Layout from './Layout.jsx';

//render your react application
ReactDOM.render(
    <Layout />,
    document.querySelector('#app')
);