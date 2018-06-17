import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import $ from "jquery";


export default class Navbar extends React.Component{
    constructor(props, context){
        super(props, context);
        
        this.login = this.login.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    
        this.state = {
          username: '',
          password: ''
        };
    }
    
    handleChangeUser(e){
        let tempState = this.state;
        tempState.username = e.target.value;
        this.setState(tempState);
    }
    
    handleChangePass(e){
        let tempState = this.state;
        tempState.password = e.target.value;
        this.setState(tempState);
    }
    
    // This will be called when the user clicks on the login button
    login(e) {
        e.preventDefault();
        // Here, we call an external AuthService. We’ll create it in the next step
        //MeetupActions.loadSession(this.state.username, this.state.password);
        //MeetupActions.loadSession(e.target[0].value, e.target[1].value);
        return false;
    }
    
    render(){
        let userInfo = <div></div>;
            if( this.props.sessionData && typeof(this.props.sessionData.user_nicename) !== 'undefined'){
                $('#exampleModal').modal('hide');
                userInfo =
                    <div className="d-flex">
                        <Link className="nav-item nav-link " to={"/user/"+this.props.sessionData.user_nicename.value}>
                                Hello, {this.props.sessionData.user_display_name.charAt(0).toUpperCase()+this.props.sessionData.user_display_name.substring(1)}
                        </Link>
                    </div>;
            }else{
                userInfo = <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleShow}>Login</button>;
            }
            
        let homeActive = this.props.currentView === "home" ? "active" :"";
        
        return(
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between navbar-expand-sm">
                    <a className="navbar-brand">OurMeetup</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {userInfo}
                            <Link className={"nav-item nav-link "+homeActive} to="/">Dashboard </Link>
                            {/*<a onClick={() => sessionActions.authenticateUser()}>Login</a>*/}
                        </div>
                        
                    </div>
                </nav>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form role="form" onSubmit={this.login}>
                                    <div className="form-group">
                                        <input type="text" name="user" value={this.state.user} placeholder="Username" onChange={this.handleChangeUser} />
                                        <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePass} />
                                    </div>
                                    <input type="submit" value="Login" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
Navbar.propTypes = {
  sessionData: PropTypes.object,
  currentView: PropTypes.string
};