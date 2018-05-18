import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import Navbar from '../component/Navbar.jsx';

import meetupStore from '../stores/MeetupStore.jsx';
import meetupActions from '../actions/MeetupActions.jsx';

export default class Login extends Flux.View {
    
    constructor(){
        super();
        
        
    }
    
    componentWillMount(){
        
        
    }
    
    render(){
        
                 
        return(
            <h2>Hello Login</h2>
        );
    }
}