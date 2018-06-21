import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "moment";

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
                                        <div className="jumbotron-fluid mb-3">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img className="img-fluid" src="https://via.placeholder.com/600x350" alt="Card image cap"></img>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h2 className="card-title">{meetup.post_title}</h2>
                                                        <span className="card-subtitle text-muted">Location</span>
                                                        <h6 className="card-text">Miami, FL</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-8 col-lg-6 mx-auto">
                                                    <h5>Next Events</h5>
                                                    {
                                                        state.events.map( event => {
                                                            if(parseInt(event.meta_keys._meetup) === meetup.ID){
                                                                let aTime = event.meta_keys.day+"T"+event.meta_keys.time.replace(/:/g,'');
                                                                let eventDay = Moment(aTime);
                                                                return(
                                                                    <div className="card w-100" key={event.ID}>
                                                                        <div className="card-header">
                                                                            <h2>{eventDay.format("MMMM D").toString()}</h2>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <h3>{eventDay.format("h:mm a").toString()}</h3>
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <h5 className="card-title"><Link to={"/event/"+event.ID}>{event.post_title}</Link></h5>
                                                                                    <h6>
                                                                                        <Link 
                                                                                            className="card-text" 
                                                                                            to={"/meetup/"+event.meta_keys._meetup} 
                                                                                        > 
                                                                                            {
                                                                                                state.meetups.length > 0 ?
                                                                                                    state.meetups.find((meetup)=> meetup.ID === parseInt(event.meta_keys._meetup) ).post_title
                                                                                                :
                                                                                                    "Loading..."
                                                                                            } 
                                                                                        </Link>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ); 
                                                            }
                                                        })
                                                    }
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