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
            "meetups": [],
            "events":[],
            "session":{},
            "isLoading": true
        };
    this.actions = {
              "loadInitialData": () => {
                fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/events')
                  .then(response => response.json())
                  .then(data => this.setState({ events: data, isLoading: false }))
                  .catch(error => console.log(error));
                  
                fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/meetups')
                  .then(response => response.json())
                  .then(data => this.setState({ meetups: data }))
                  .catch(error => console.log(error));
              },
              "changeEvent": () => {
                this.setState({events: this.state.events.map( (event, i) => {
                    if(i === 0){  
                      event.post_title = "HOLA";
                    }
                    return event;
                  })
                });
              },
              "rsvpEvent": (id, userId, answer, token) => {
                
                /*ReactGA.event({
                  category: 'User',
                  action: 'RSVP',
                  value: answer === "yes" ? 1 : 0
                });*/
                
                var data = {
                  user: userId,
                  answer: answer
                };
                
                fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/events/rsvp/'+id, 
                {
                  method: 'PUT',
                  body: JSON.stringify(data),
                  headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                    })
                })
                .then(data => {
                  if (data.status !== 200 ) {
                    if(data.status === 403){
                      //this.dispatch('MeetupStore.endSession');
                    }
                    
                    throw new Error(data);
                  }
                  this.actions.loadInitialData();
                })
                .catch(error => console.log(error));
              },
              "loadSession": (username, password) => {
                //REST API AUTH
                var data = {
                    "username":username, 
                    "password":password
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
                    
                    //this.dispatch('MeetupStore.setSession', data); 
                    //this.loadApiEvents(data.token);
                    //this.loadInitialData();
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
              "logout": () => this.setState({session: {}})
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
