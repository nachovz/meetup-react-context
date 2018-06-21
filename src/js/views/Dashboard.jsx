import React from "react";
import { Link } from "react-router-dom";

//Components
import Navbar from '../component/Navbar.jsx';
import {Consumer} from '../stores/AppContext.jsx';

//Functional Packages
import 'react-infinite-calendar/styles.css';
import Moment from "moment";
import ReactGA from 'react-ga';

export default class Dashboard extends React.Component {
    
    render(){
        //GA Pageview
        ReactGA.pageview(window.location.pathname + window.location.search);
        
        // Render the Calendar
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        
        return(
            <div>
                
                <Navbar  currentView="home" />

                <div className="jumbotron-fluid mb-3" >
                    <div className="container-fluid text-center">
                        <h1 >The Meetup Clone</h1>
                        <p className="lead">This is a mini project created by <a href="http://www.4geeksacademy.co">4GeeksAcademy</a></p>
                        <small>Using: ReactJS, Bootstrap, @Fortawesome, Moment, React-router</small>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-6 mx-auto">
                            <div className="row">
                                <Consumer>
                                    {({ state }) => (
                                        
                                        state.isLoading ? (<p>Loading...</p>) 
                                        :
                                        state.events.map( event => {
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
                                            
                                        })
                                        
                                    )}
                                </Consumer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    
}