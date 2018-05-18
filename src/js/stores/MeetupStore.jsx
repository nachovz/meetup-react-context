import Flux from "@4geeksacademy/react-flux-dash";

class MeetupStore extends Flux.Store{
    
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
            "events":[],
            "session":{}
        };
        
    }
    
    _loadDataMeetups(data){
        let tempState = this.state;
        tempState.meetups = data;
        this.setStoreState(tempState).emit();
    }
    
    _loadDataEvents(data){
        let tempState = this.state;
        tempState.events = data;
        this.setStoreState(tempState).emit();
    }
    
    getAllMeetups(){
        
        return this.state.meetups;
    }
    
    getAllEvents(){
        let eventsToSend = this.state.events;
        
        eventsToSend.forEach((theEvent)=>{
           let theMeetup =  this.state.meetups.find( (meetup) => {
               return parseInt(theEvent.meta_keys._meetup) === meetup.ID;
           });
           theEvent.meetup = {};
           theEvent.meetup = theMeetup;
        });
        
        return eventsToSend;
    }
    
    getEvent(incomingId){

        let eventToReturn =  this.state.events.find( (theEvent) => {
            return parseInt(incomingId) === theEvent.ID;
        });
        
        if(typeof(eventToReturn) !== 'undefined'){
            eventToReturn.meetup = {};
            eventToReturn.meetup = this.state.meetups.find( (theMeetup) =>{
                return theMeetup.ID === parseInt(eventToReturn.meta_keys._meetup[0]);
            });
        }
        return eventToReturn;
    }
    
    getMeetup(aVariable){
        return this.state.meetups.find(  (THISISANELEMENT) =>  THISISANELEMENT.ID === parseInt(aVariable)  );
    }
    
    _error(e){
        const newState = { "error": e.toString() };
        this.setStoreState(newState).emit('ERROR');
    }
    
    getError(){
        return this.state.error;
    }
    
    _setSession(userInfo){
        let tempState = this.state;
        tempState.session = userInfo;
        
        this.setStoreState(tempState).emit();
    }
    
    getSession(){
        return this.state.session;
    }
    
    _rsvpSuccessful(args){
        let tempState = this.state;
        tempState.events.map( (anEvent) => {
            if(anEvent.ID === parseInt(args[0]) ){
                anEvent.meta_keys._rsvpYes.push(args[1]);
            }
        });

        this.setStoreState(tempState).emit();
    }
    
    getToken(){
        return this.state.session.token;
    }
    
    _endSession(){
        let tempState = this.state;
        tempState.session = {};
        this.setStoreState(tempState).emit();
    }
}

var meetupStore = new MeetupStore();
export default meetupStore;