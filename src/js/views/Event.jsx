import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Components
import Navbar from '../component/Navbar.jsx';

//Functional Packages
import Moment from "moment";
import ReactGA from 'react-ga';
import {Consumer} from '../stores/AppContext.jsx';

export default class Event extends React.Component {
    
    render(){
        ReactGA.pageview(window.location.pathname + window.location.search);
        
        return(
            <div>
                
                <Navbar  />
                <Consumer>
                    {({ state }) => 
                        {
                            const event = state.events.find( event => event.ID === parseInt(this.props.match.params.theid) );
    
                            if(!event){ 
                                
                                return(<p>Loading</p>);
                            
                            }else{ 
                                
                                let aTime = event.meta_keys.day+"T"+event.meta_keys.time.replace(/:/g,'');
                                let eventDay = Moment(aTime);
                                
                                return (
                                    <div>
                                        <div className="jumbotron jumbotron-fluid eventHero">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    {/*left side */}
                                                    <div className="col-md-8 jumboLeft">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <p className="eventDate">{eventDay.format("MMM D").toString()}</p>
                                                                <h1 className="eventTitle">{event.post_title}</h1>
                                                                <div className="row">
                                                                    <div className="col-md-2 text-center">
                                                                
                                                                        <img src="//placehold.it/50" className="rounded-circle" />
                                                                    </div>
                                                                    <div className="col-md-10 pt-1">
                                                                        <span className="text">Hosted by</span>
                                                                        <span className="link"> <Link to="/"> Mr. Whiskers</Link></span>
                                                                        <p>
                                                                            <span className="text">From</span>
                                                                            <span className="link"> 
                                                                                <Link to={"/meetup/"+event.meta_keys._meetup}> Meetup </Link>
                                                                            </span>
                                                                        </p>
                                                                    </div>        
                                                                </div>  
                                                            </div>
                                                        </div>
                                                    </div>
                        
                                                    {/*right side */}
                                                    <div className="col-md-4 jumboRight">
                                                        <div className="attendance">
                                                            <p><strong>Are you going?</strong> X people going</p>
                                                        </div>
                                                        {/*rsvpButtons*/}
                                                        <div className="row socialMedia flex-nowrap">
                                                            <div className="col-md-6">
                                                                <button type="button" className="btn-floating btn-sm btn-twi"><i className="fab fa-twitter"></i></button>
                                                                <span>Tweet It</span>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <a type="button" className="btn-floating btn-sm btn-fb"><i className="fab fa-facebook-f"></i></a>
                                                                <span>Share It</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="container-fluid">
                                            <div className="row">
                    
                                                {/*body right side...when using order you're saying MEDIUM and up will be second*/}
                                                <div className="col-md-4 order-md-2">
                                                    <div className="card smallCard">
                                                        <div className="card-body">
                                                            <div className="row cardInfo">
                                                                <div>
                                                                    <span> <i className="far fa-clock"></i></span>
                                                                </div>
                                                                <div>
                                                                    <span className="card-date">{eventDay.format("dddd, MMMM DD, YYYY").toString()}</span><br/>
                                                                    <span className="card-time">{eventDay.format("h:mm a").toString()}</span><br/>
                                                                    <span className="card-schedule">Every first and last Tuesday of the month</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <img top ="w-100" src="http://via.placeholder.com/350x150" alt="map of the location" />                            
                                                        
                                                    </div>
                                                </div>
                    
                                                {/*body left side*/}
                                                <div className="col-md-8 order-md-1">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <img className="img-fluid eventPhoto" src="http://via.placeholder.com/500X300" alt="event image of..." />
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
                                        <footer className="footer" id="footer">
                                            <div className="container">
                                                <div className="row justify-content-between">
                                                    <div className="col-6">
                                                        <img className="img-fluid" src="http://placehold.it/50x50" alt="" />
                                                    </div>
                                                    <div className="col-6">
                                                        <ul className="footer__links list-inline text-right">
                                                            <li className="footer__link list-inline-item">Blog</li>
                                                            <li className="footer__link list-inline-item">Contact Us</li>
                                                        </ul>
                                                    </div>
                                                </div>
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