import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Components
import Navbar from '../component/Navbar.jsx';
import {Consumer} from '../stores/AppContext.jsx';

export default class Meetup extends React.Component {
    
    render(){
        return(
            <div>
            
                <Navbar />
                
                <Consumer>
                    {({ state }) => 
                        {
                            const meetup = state.meetups.find( meetup => meetup.ID === parseInt(this.props.match.params.theid) );
    
                            if(!meetup){ 
                                
                                return(<p>Loading</p>);
                            
                            }else{ 
                            
                                return(
                                    <div>
                                        <div className="container-fluid mt-4">
                                            <div className="card w-100">
                                                <div className="card-body"> 
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <img className="card-img-top" src="https://via.placeholder.com/600x350" alt="Card image cap"></img>
                                                        </div>
                                                        <div className="col-6">
                                                            <h2 className="card-title">{meetup.title}</h2>
                                                            <span className="card-subtitle text-muted">Location</span><br></br>
                                                            <h6 className="card-text">Miami, FL</h6>
                                                            <br></br>
                                                            <br></br>
                                                            <span className="card-subtitle text-muted">Members</span><br></br>
                                                            <h6 className="card-text">777</h6>
                                                            <br></br>
                                                            <br></br>
                                                            <span className="card-subtitle text-muted">Organizers</span><br></br>
                                                            <h6 className="card-text">Daniel Ocampo</h6>
                                                            <br></br>
                                                            <br></br>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <Link to="/event/1" className="btn btn-danger">Join Us</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-8">
                                                    <nav className="nav nav-pills nav-fill">
                                                        <a className="nav-item nav-link" href="#">Our Group</a>
                                                        <a className="nav-item nav-link disabled" href="#">Meet Ups</a>
                                                        <a className="nav-item nav-link disabled" href="#">Members</a>
                                                        <a className="nav-item nav-link disabled" href="#">Photos</a>
                                                        <a className="nav-item nav-link disabled" href="#">Discussions</a>
                                                        <a className="nav-item nav-link disabled" href="#">More</a>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container align-center mt-4">
                                            <div className="row">
                                                <div className="col-8">
                                                    <h5>Next Meetup</h5>
                                                </div>
                                                <br></br>
                                            </div>
                                            <div className="card w-100">
                                                <div className="card-body"> 
                                                    <div className="row">
                                                        <div className="col-8 h-100">
                                                            <span className="card-subtitle text-muted">Location</span>
                                                            <h2 className="card-title">Group Name</h2>
                                                            <h6 className="card-text">Sed tortor enim, varius sed maximus vel, scelerisque id leo. Phasellus congue lectus quis blandit volutpat. Ut eget venenatis magna. Nullam purus lacus, eleifend at pellentesque a, dignissim at ante. Duis hendrerit interdum libero quis feugiat. Nam et ex vel lectus volutpat iaculis ac vitae augue. Donec mattis, neque sed rutrum egestas, velit est vestibulum sem, ac ultricies massa metus non nisi. Phasellus scelerisque dolor at felis ullamcorper condimentum. </h6>
                                                            <br></br>
                                                            <span className="card-subtitle text-muted">7 going</span>
                                                        </div>
                                                        <div className="col-4">
                                                            <img className="card-img-top mb-3" src="https://via.placeholder.com/350x200" alt="Card image cap"></img>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <Link to="/event/2" className="btn btn-info text-align-center w-100 mb-3">Attend</Link><br></br>
                                                                </div>
                                                            </div>
                                                            <span className="card-subtitle text-muted">7777 SW 77 st, Miami FL 33177</span>
                                                        </div>
                                                    </div>        
                                                </div>         
                                            </div>  
                                        </div>
                                    </div>
                                );
                            }
                        }
                    }
                </Consumer>
            </div>       
        );
    }
}
Meetup.propTypes = {
  match: PropTypes.object
};