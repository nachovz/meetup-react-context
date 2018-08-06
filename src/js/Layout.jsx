import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Views
import Dashboard from "./views/Dashboard.jsx";
import Meetup from "./views/Meetup.jsx";
import Event from "./views/Event.jsx";

//Component
import ScrollToTop from "./component/ScrollToTop.jsx";

//Functional Packages
import {Provider} from './stores/AppContext.jsx';

export default class Layout extends React.Component {
  
  constructor(){
    super();
    
    this.state = {
            "meetups": [/*
                {   
                    ID: 36,
                    post_author: "1",
                    post_date: "2018-04-24 00:21:11",
                    post_date_gmt: "2018-04-24 00:21:11",
                    post_content: "fsgfgdfg",
                    post_title: "JABAJABAJABAJAB",
                    post_excerpt: "",
                    post_status: "publish",
                    comment_status: "closed",
                    ping_status: "closed",
                    post_password: "",
                    post_name: "5th-event-for-meetup-1",
                    to_ping: "",
                    pinged: "",
                    post_modified: "2018-04-24 00:21:11",
                    post_modified_gmt: "2018-04-24 00:21:11",
                    post_content_filtered: "",
                    post_parent: 0,
                    guid: "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=36",
                    menu_order: 0,
                    post_type: "event",
                    post_mime_type: "",
                    comment_count: "0",
                    filter: "raw",
                    meta_keys: {
                    _edit_last: "1",
                    _edit_lock: "1525298021:1",
                    day: "20180428",
                    _day: "day",
                    time: "07:00:00",
                    _time: "time",
                    _meetup: "9",
                    _rsvpNo: [ ],
                    _rsvpYes: [
                    87,
                    67,
                    "nachovz"
                    ]
                    },
                    thumbnail: false
                }*/
            ],
            "events":[
                {
                    ID: 36,
                    post_author: "1",
                    post_date: "2018-04-24 00:21:11",
                    post_date_gmt: "2018-04-24 00:21:11",
                    post_content: "fsgfgdfg",
                    post_title: "JABAJABAJABAJAB",
                    post_excerpt: "",
                    post_status: "publish",
                    comment_status: "closed",
                    ping_status: "closed",
                    post_password: "",
                    post_name: "5th-event-for-meetup-1",
                    to_ping: "",
                    pinged: "",
                    post_modified: "2018-04-24 00:21:11",
                    post_modified_gmt: "2018-04-24 00:21:11",
                    post_content_filtered: "",
                    post_parent: 0,
                    guid: "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=36",
                    menu_order: 0,
                    post_type: "event",
                    post_mime_type: "",
                    comment_count: "0",
                    filter: "raw",
                    meta_keys: {
                    _edit_last: "1",
                    _edit_lock: "1525298021:1",
                    day: "20180428",
                    _day: "day",
                    time: "07:00:00",
                    _time: "time",
                    _meetup: "36",
                    _rsvpNo: [ ],
                    _rsvpYes: [
                    87,
                    67,
                    "nachovz"
                    ]
                    },
                    thumbnail: false
                }
            ],
            "session":{/*
                ID: 2,
                username: "theUser",
                password: "1234",
                token: "qwerty12345asdfgzxcv"*/
            },
            "isLoading": true
        };
    this.actions = {
            "loadSession": (receivedUsername, receivedPassword) => {
                /*this.setState(
                    {
                        session: {
                            ID: 1000,
                            user_nicename: receivedUsername,
                            password: receivedPassword,
                            token: "gfdrtu6545hftydhgrhxfh"
                        }
                        
                    });
                */    //REST API AUTH
                    var data = {
                        "username":receivedUsername, 
                        "password":receivedPassword
                      };
                      
                    fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/jwt-auth/v1/token',
                    {
                      method: 'POST',
                      body: JSON.stringify(data),
                      headers: new Headers({
                        'Content-Type': 'application/json'
                        })
                    })
                    .then( (response) => response.json())
                    .then( (data) => {
                        
                        if (typeof(data.token) === "undefined" ) throw new Error(data.message);
                        this.setState({session: data});
                        
                        //ReactGA.set({ userId: data.user_nicename });
                    })
                    .catch(error => console.log(error));
                  
                    //Simulating user ID
                    /*
                    fetch('https://randomuser.me/api/?inc=id,name,picture')
                    .then(res => res.json())
                    .catch(error => {
                      //console.error('Error:', error)
                    })
                    .then(response => {
                      this.dispatch('MeetupStore.setSession', response);
                    });*/
                    
                    
                  },
            "rsvpEvent": (id, userId, answer) => {
                /*var indexOfEvent = 0;
                var theArrayWithEvent = this.state.events.filter( (item, index) => {
                    
                    if(item.ID === parseInt(id)){
                        indexOfEvent = index;
                        return true;
                    }
                    
                });
                let event = theArrayWithEvent[0];
                
                if(answer === "yes"){
                    event.meta_keys._rsvpYes.push(userId);
                }else{
                    event.meta_keys._rsvpNo.push(userId);
                }
                
                var tempArray = this.state.events;
                tempArray[indexOfEvent] = event;
                
                this.setState({"events": tempArray});
                
                ReactGA.event({
                  category: 'User',
                  action: 'RSVP',
                  value: answer === "yes" ? 1 : 0
                });*/
                
                let url = 'https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/events/rsvp/';
                
                var data = {
                  username: userId,
                  answer: answer
                };
                
                fetch(url+id, 
                {
                  method: 'PUT',
                  body: JSON.stringify(data),
                  headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.session.token
                    })
                })
                .then(data => {
                  if (data.status !== 200 ) {
                    throw new Error(data);//INVALID TOKEN
                  }
                  this.actions.loadInitialData();
                })
                .catch(error => console.log(error));
                
            },
            "loadInitialData": () => { 
                
            fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/events')
              .then(response => response.json())
              .then(data => this.setState({ events: data, isLoading: false }))
              .catch(error => console.log(error));
              
            fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/meetups')
              .then(response => response.json())
              .then(data => this.setState({ meetups: data }))
              .catch(error => console.log(error));
            }
            /*"changeEvent": () => {
            this.setState({events: this.state.events.map( (event, i) => {
                if(i === 0){  
                  event.post_title = "HOLA";
                }
                return event;
              })
            });
            },
            "logout": () => this.setState({session: {}})*/
    };
  }
  
  componentDidMount() {
    this.actions.loadInitialData();
  }

  
  render() {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop>
                    <div>
                        <Switch>
                            <Provider value={{state:this.state, actions: this.actions}}>
                                <Route exact path="/" component={Dashboard} />
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/event/:theid" component={Event} />
                                <Route exact path="/meetup/:theid" component={Meetup} />
                            </Provider>
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
  }
}
