import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Meetup from "./views/Meetup.jsx";
import Event from "./views/Event.jsx";
import Login from "./views/Login.jsx";

import meetupActions from './actions/MeetupActions.jsx';
import meetupStore from './stores/MeetupStore.jsx';

export default class Layout extends Flux.View {
  
  constructor(){
    super();
    meetupActions.loadApiMeetups();
    meetupActions.loadApiEvents(meetupStore.getToken());
    //meetupActions.loadSession();
  }
  
  render() {
    return (<div>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/event/:theid" component={Event} />
                    <Route exact path="/meetup/:theid" component={Meetup} />
                    <Route exact path="/login" component={Login} />
                    <Route render={() => <h1>Not found!</h1>} />
                </Switch>
            </div>
        </BrowserRouter>
    </div>
    );
  }
}
