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
            events:[
                {
                    ID: 36,
                    post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec libero consectetur risus vehicula interdum eu at elit. Proin a commodo erat, eu molestie ipsum. Aliquam tristique nunc a est tristique, et convallis risus ullamcorper. Fusce nec massa ac enim pellentesque ornare. Pellentesque non sapien varius, pellentesque tellus sit amet, facilisis justo. Duis rhoncus nunc id elementum dapibus. Sed dictum lacinia vestibulum.",
                    post_title: "Lorem Event",
                    meta_keys: {
                        day: "20180428",
                        time: "07:00:00",
                        _meetup: "9",
                        _rsvpNo: [
                            "robert",
                            "jjtime",
                            "username2"
                        ],
                        _rsvpYes: [
                            "cheeselover",
                            "neweradude",
                            "james1996"
                        ]
                    }
                }
            ],
            meetups:[
                {
                    ID: 9,
                    post_content: "The nicest Meetup ever",
                    post_title: "Tech Enthusiasts",
                }
            ],
            session:{
                ID: 2,
                username: "theUser",
                password: "1234",
                token: "qwerty12345asdfgzxcv"
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
                */    
                //REST API AUTH
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
                    })
                    .catch(error => console.log(error));
                    
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
                */
                
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
