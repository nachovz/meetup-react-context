import React from "react";
import { Link } from "react-router-dom";

//Components
import Navbar from '../component/Navbar.jsx';
import {Consumer} from '../stores/AppContext.jsx';

//Functional Packages
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from "moment";
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

                <div className="jumbotron jumbotron-fluid" >
                    <div className="container text-center">
                        <h1 className="display-4">Fluid jumbotron</h1>
                        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <Consumer>
                                    {({ state }) => (
                                        
                                        state.isLoading ? (<p>Loading...</p>) 
                                        :
                                        state.events.map( event => {
                                        let aTime = event.meta_keys.day+"T"+event.meta_keys.time.replace(/:/g,'');
                                        let eventDay = moment(aTime);
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
                                                            <h5 className="card-title">{event.post_title}</h5>
                                                            <h6>
                                                                <Link className="card-text" to={"/meetup/"+event.meta_keys._meetup} > Meetup </Link>
                                                            </h6>
                                                            <Link to={"/event/"+event.ID} className="btn btn-primary">View</Link>
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
                        <div className="col-md-4">
                            <InfiniteCalendar
                                width={400}
                                height={600}
                                selected={today}
                                disabledDays={[0,6]}
                                minDate={lastWeek}
                            />
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    
}