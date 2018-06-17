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
  }
  
  componentDidMount() {
    fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/events')
      .then(response => response.json())
      .then(data => this.setState({ events: data, isLoading: false }));
      
    fetch('https://wordpress-breathecode-cli-nachovz.c9users.io/wp-json/sample_api/v1/meetups')
      .then(response => response.json())
      .then(data => this.setState({ meetups: data }));
  }
  
  render() {
    return (<div>
        <BrowserRouter>
            <ScrollToTop>
                <div>
                    <Switch>
                        <Provider value={{state:this.state}}>
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
