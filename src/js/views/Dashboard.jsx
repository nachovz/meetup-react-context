import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import ReactGA from 'react-ga';
import Navbar from '../component/Navbar.jsx';

import meetupStore from '../stores/MeetupStore.jsx';
import meetupActions from '../actions/MeetupActions.jsx';

/*IGNORE FOR NOW*/
import sessionStore from '../stores/SessionStore.jsx';
import sessionActions from '../actions/SessionActions.jsx';

import moment from "moment";


export default class Dashboard extends Flux.View {
    
    constructor(){
        super();
        
        this.state = {
            events: meetupStore.getAllEvents(),
            session: meetupStore.getSession()
        };
        
        this.bindStore(meetupStore, function(){
            // retreive events data
            this.setState({
                events: meetupStore.getAllEvents(),
                session: meetupStore.getSession()
            });
        });
        /*this.bindStore(meetupStore, 'CONTENT_LOADED', (data) => {
            console.log("Dashboard:CONTENT_LOADED", data); 
            const events = meetupStore.getAllEvents();
            this.setState({events:events}); 
        });
        this.bindStore(meetupStore, 'ERROR', function(data){
            console.log("HOME:ERROR", data);    
            //alert(meetupStore.getError());
            
        });*/
    }
    
    componentWillMount(){
    }
    
    handleStoreChanges(){
    }
    
    componentWillUnmount(){
    }
    
    render(){
        //GA Pageview
        ReactGA.pageview(window.location.pathname + window.location.search);
        
        // Render the Calendar
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        
        //if(allEvents.length < 1) return(<h2>No events soon</h2>); 
        
        var allEvents = this.state.events.length < 1 ? 
            <div> 
                <h2>No events soon</h2> 
                
            </div>: this.state.events.map((event) =>{
            
            //IMPORT moment.js
            let aTime = event.meta_keys.day+"T"+event.meta_keys.time.replace(/:/g,'');
            let eventDay = moment(aTime);
            event.meetup = typeof( event.meetup ) === 'undefined' ? { ID : 0, post_title : "" } : event.meetup;
            
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
                                    <Link className="card-text" to={"/meetup/"+event.meetup.ID} > {event.meetup.post_title} </Link>
                                </h6>
                                <Link to={"/event/"+event.ID} className="btn btn-primary">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ); 
        });
        
        return(
            <div>
                
                <Navbar sessionData={this.state.session} currentView="home" />

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
                                {allEvents}
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