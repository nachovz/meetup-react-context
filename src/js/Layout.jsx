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
                "id": 87, 
                "title": "Miami Tech Meetup", 
                "thumbnail": "http://lorempixel.com/output/technics-q-c-100-100-1.jpg", 
                "events": [
                    {
                        "id": 34,
                        "title": "React How-To",
                        "day": "SATURDAY, MARCH 10",
                        "time": "5:00 PM",
                        "image": "http://lorempixel.com/output/technics-q-c-700-500-3.jpg",
                        "rsvp": false
                    },{
                        "id": 56,
                        "title": "Music+Coding",
                        "day": "SATURDAY, MARCH 17",
                        "time": "2:00 PM",
                        "image": "http://lorempixel.com/output/technics-q-c-700-500-5.jpg",
                        "rsvp": false
                    },{
                        "id": 67,
                        "title": "Hardware hacking 101",
                        "day": "THURSDAY, MARCH 22",
                        "time": "6:00 PM",
                        "image": "http://lorempixel.com/output/technics-q-c-700-500-7.jpg",
                        "rsvp": false
                    }
                ]},{
                "id": 886, 
                "title": "Wordpress Meetup",
                "thumbnail": "http://lorempixel.com/100/100/technics/", 
                "events": [
                    {
                        "id": 384,
                        "title": "Wordpress for LOCAL",
                        "day": "MONDAY, MARCH 12",
                        "time": "6:30 PM",
                        "image": "http://lorempixel.com/700/500/technics/",
                        "rsvp": false
                    },{
                        "id": 776,
                        "title": "Wordpress API LOCAL",
                        "day": "SATURDAY, MARCH 17",
                        "time": "2:00 PM",
                        "image": "http://lorempixel.com/700/500/technics/",
                        "rsvp": false
                    },{
                        "id": 5677,
                        "title": "Wordpress Guttenberg LOCAL",
                        "day": "THURSDAY, MARCH 22",
                        "time": "5:30 PM",
                        "image": "http://lorempixel.com/700/500/technics/",
                        "rsvp": false
                    }
                ]
            }
            */],
            "events":[/*
              {
                "ID": 36,
                "post_author": "1",
                "post_date": "2018-04-24 00:21:11",
                "post_date_gmt": "2018-04-24 00:21:11",
                "post_content": "fsgfgdfg",
                "post_title": "5th Event for meetup 1",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "5th-event-for-meetup-1",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2018-04-24 00:21:11",
                "post_modified_gmt": "2018-04-24 00:21:11",
                "post_content_filtered": "",
                "post_parent": 0,
                "guid": "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=36",
                "menu_order": 0,
                "post_type": "event",
                "post_mime_type": "",
                "comment_count": "0",
                "filter": "raw",
                "meta_keys": {
                  "_edit_last": "1",
                  "_edit_lock": "1525298021:1",
                  "day": "20180428",
                  "_day": "day",
                  "time": "07:00:00",
                  "_time": "time",
                  "_meetup": "9",
                  "_rsvpNo": [
                    "nachovz"
                  ],
                  "_rsvpYes": [
                    87,
                    67
                  ]
                },
                "thumbnail": false
              },
              {
                "ID": 35,
                "post_author": "1",
                "post_date": "2018-04-24 00:19:12",
                "post_date_gmt": "2018-04-24 00:19:12",
                "post_content": "HELLO!",
                "post_title": "4th Event for Meetup 1",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "4th-event-for-meetup-1",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2018-04-24 00:19:12",
                "post_modified_gmt": "2018-04-24 00:19:12",
                "post_content_filtered": "",
                "post_parent": 0,
                "guid": "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=35",
                "menu_order": 0,
                "post_type": "event",
                "post_mime_type": "",
                "comment_count": "0",
                "filter": "raw",
                "meta_keys": {
                  "_edit_last": "1",
                  "_edit_lock": "1525131757:1",
                  "day": "20180426",
                  "_day": "day",
                  "time": "06:00:00",
                  "_time": "time",
                  "_meetup": "9",
                  "_rsvpYes": [
                    87
                  ],
                  "_rsvpNo": [
                    87,
                    "nachovz"
                  ]
                },
                "thumbnail": false
              },
              {
                "ID": 13,
                "post_author": "1",
                "post_date": "2018-04-06 17:33:02",
                "post_date_gmt": "2018-04-06 17:33:02",
                "post_content": "",
                "post_title": "2nd Event for meetup 2",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "2nd-event-for-meetup-2",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2018-04-09 16:48:08",
                "post_modified_gmt": "2018-04-09 16:48:08",
                "post_content_filtered": "",
                "post_parent": 0,
                "guid": "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=13",
                "menu_order": 0,
                "post_type": "event",
                "post_mime_type": "",
                "comment_count": "0",
                "filter": "raw",
                "meta_keys": {
                  "_edit_last": "1",
                  "_edit_lock": "1523654744:1",
                  "_meetups": "9",
                  "day": "20180412",
                  "_day": "day",
                  "time": "17:00:00",
                  "_time": "time",
                  "_meetup": "10",
                  "_thumbnail_id": "33",
                  "_rsvp": [
                    4000,
                    4500
                  ],
                  "_rsvpYes": [
                    "085618-9439",
                    "756.IAZV.VJGS.26",
                    "60181124",
                    "74796311",
                    "418479032",
                    "154117198"
                  ],
                  "_rsvpNo": [
                    "nachovz"
                  ]
                },
                "thumbnail": [
                  "https://wordpress-breathecode-cli-nachovz.c9users.io/wp-content/uploads/2018/04/Newsletter-eme-1024x614.jpg",
                  1024,
                  614,
                  true
                ]
              },
              {
                "ID": 12,
                "post_author": "1",
                "post_date": "2018-04-06 17:31:03",
                "post_date_gmt": "2018-04-06 17:31:03",
                "post_content": "TEST",
                "post_title": "1st Event for Meetup 1",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "1st-event-for-meetup-1-2",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2018-04-09 21:08:56",
                "post_modified_gmt": "2018-04-09 21:08:56",
                "post_content_filtered": "",
                "post_parent": 0,
                "guid": "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=12",
                "menu_order": 0,
                "post_type": "event",
                "post_mime_type": "",
                "comment_count": "0",
                "filter": "raw",
                "meta_keys": {
                  "_edit_last": "1",
                  "_edit_lock": "1523651695:1",
                  "_meetups": "10",
                  "_thumbnail_id": "32",
                  "day": "20180419",
                  "_day": "day",
                  "time": "17:00:00",
                  "_time": "time",
                  "_meetup": "9",
                  "_rsvpYes": [
                    1234,
                    2222,
                    1111,
                    "154117198"
                  ],
                  "_rsvpNo": [
                    5678,
                    3333,
                    "nachovz"
                  ]
                },
                "thumbnail": [
                  "https://wordpress-breathecode-cli-nachovz.c9users.io/wp-content/uploads/2018/04/Screen-Shot-2017-12-04-at-9.43.29-AM.png",
                  994,
                  563,
                  false
                ]
              },
              {
                "ID": 11,
                "post_author": "1",
                "post_date": "2018-04-06 16:29:03",
                "post_date_gmt": "2018-04-06 16:29:03",
                "post_content": "This is an event test",
                "post_title": "1st event for Meetup 2",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "1st-event-for-meetup-2",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2018-04-09 21:08:43",
                "post_modified_gmt": "2018-04-09 21:08:43",
                "post_content_filtered": "",
                "post_parent": 0,
                "guid": "https://wordpress-breathecode-cli-nachovz.c9users.io/?post_type=event&#038;p=11",
                "menu_order": 0,
                "post_type": "event",
                "post_mime_type": "",
                "comment_count": "0",
                "filter": "raw",
                "meta_keys": {
                  "_edit_last": "1",
                  "_edit_lock": "1523307984:1",
                  "_meetups": "10",
                  "_wp_old_slug": "1st-event-for-meetup-1",
                  "day": "20180419",
                  "_day": "day",
                  "time": "18:00:00",
                  "_time": "time",
                  "_meetup": "10",
                  "_rsvpYes": [
                    3333,
                    "nachovz"
                  ],
                  "_rsvpNo": [
                    3333
                  ]
                },
                "thumbnail": false
              }*/
            ],
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
