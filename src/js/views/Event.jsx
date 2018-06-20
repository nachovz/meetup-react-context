import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTw from '@fortawesome/fontawesome-free-brands/faTwitter';
import faFa from '@fortawesome/fontawesome-free-brands/faFacebook';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';

//Components
import Navbar from '../component/Navbar.jsx';

//Functional Packages
import Moment from "moment";
import ReactGA from 'react-ga';
import {Consumer} from '../stores/AppContext.jsx';

export default class Event extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          login: false  
        };
    }
    
    render(){
        ReactGA.pageview(window.location.pathname + window.location.search);
        
        return(
            <div>
                
                <Navbar  />
                <Consumer>
                    {({ state, actions }) => 
                        {
                            const user = state.session;
                            const event = state.events.find( event => event.ID === parseInt(this.props.match.params.theid) );
    
                            if(!event){ 
                                
                                return(<p>Loading</p>);
                            
                            }else{ 
                                const yesDisabled = typeof event.meta_keys._rsvpYes !== 'undefined' && event.meta_keys._rsvpYes.includes("nachovz")  ? "disabled" : "";
                                const noDisabled =typeof event.meta_keys._rsvpNo !== 'undefined' && event.meta_keys._rsvpNo.includes("nachovz")  ? "disabled" : "";
                                
                                let aTime = event.meta_keys.day+"T"+event.meta_keys.time.replace(/:/g,'');
                                let eventDay = Moment(aTime);
                                
                                return (
                                    <div>
                                        <div className="jumbotron jumbotron-fluid eventHero">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    {/*left side */}
                                                    <div className="col-md-9">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <p className="eventDate">{eventDay.format("MMM D").toString()}</p>
                                                                <h1 className="eventTitle">{event.post_title}</h1>
                                                                <h4> 
                                                                    <Link 
                                                                        to={"/meetup/"+event.meta_keys._meetup} 
                                                                    > 
                                                                        {
                                                                            state.meetups.length > 0 ?
                                                                                state.meetups.find((meetup)=> meetup.ID === parseInt(event.meta_keys._meetup) ).post_title
                                                                            :
                                                                                "Loading..."
                                                                        } 
                                                                    </Link>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                        
                                                    {/*right side */}
                                                    <div className="col-md-3 text-center rounded rsvpBox">
                                                        <h4 className="mb-4"> {event.meta_keys._rsvpYes.length} people going </h4>
                                                        <div className="row rsvpBTN flex-nowrap mb-4">
                                                            {!user.token ? 
                                                                <div className="mx-auto"> 
                                                                    <button type="button" 
                                                                            className="btn btn-primary"
                                                                            data-toggle="modal"
                                                                            data-target="#exampleModal"
                                                                            onClick={ () => this.setState({login: true})}
                                                                            >
                                                                            Login to RSVP
                                                                    </button>
                                                                </div>
                                                            :
                                                                <div>
                                                                    <div className="col-md-5">
                                                                        <button type="button" 
                                                                                className="btn btn-primary w-100 yesBTN" 
                                                                                disabled={yesDisabled} 
                                                                                onClick={() => actions.rsvpEvent(   this.props.match.params.theid, 
                                                                                                                    user.user_nicename, 
                                                                                                                    "yes", 
                                                                                                                    user.token)}
                                                                                >
                                                                                Yes
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <button type="button" 
                                                                                className="btn btn-primary w-100 noBTN"
                                                                                disabled={noDisabled}
                                                                                onClick={() => actions.rsvpEvent(   this.props.match.params.theid, 
                                                                                                                    user.user_nicename, 
                                                                                                                    "no", 
                                                                                                                    user.token)}
                                                                                >
                                                                                No
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="text-center socialIcons">
                                                            <FontAwesomeIcon icon={faTw} />
                                                            <FontAwesomeIcon icon={faFa} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-3 order-md-2">
                                                    <div className="card smallCard">
                                                        <div className="card-body">
                                                            <div className="row cardInfo">
                                                                <div className="col-2 socialIcons">
                                                                    <FontAwesomeIcon icon={faClock}/>
                                                                </div>
                                                                <div className="col-8">
                                                                    <span className="card-date">{eventDay.format("dddd, MMMM DD, YYYY").toString()}</span><br/>
                                                                    <span className="card-time">{eventDay.format("h:mm a").toString()}</span><br/>
                                                                    <span className="card-schedule">Every first and last Tuesday of the month</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                {/*body left side*/}
                                                <div className="col-md-9 order-md-1">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <img className="img-fluid" src="http://via.placeholder.com/800X500" alt="event image of..." />
                                                            <h5 className="details"><strong>Details</strong></h5>
                                                            <p className="bodyText">Snuggle up with cute kitties, hot lattes, and a book. We host this event twice a month for a place to socialize or maybe come out for alternative therapy.<br/><br/>There are a few rules to follow for this event:</p>
                                                            <ul>
                                                                <li>You must purchase a beverage (e.g. coffee, tea, cocoa, etc)</li>
                                                                <li>Stay as long as you like but only 30 minutes with each cat</li>
                                                                <li>Be kind to cats and humans alike</li>
                                                                <li>No children under 12 years old. This event is an escape for most people who attend</li>
                                                                <li>Must wear headphones for phone calls and music</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                    
                                        {/* the footer */}
                                        <footer className="footer ">
                                            <div className="container navbar-brand text-center">
                                                <img className="img-fluid" src="https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/logo-black.png" />
                                            </div>
                                        </footer>
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
Event.propTypes = {
  match: PropTypes.object
};