import Flux from "@4geeksacademy/react-flux-dash";
class SessionStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            authenticated: false 
        };
    }
    
    //you are forced to use _ to avoid using the setters anywhere else
    _setAuthentication(data){
        //set the the new store state and emit
        this.setStoreState({ authenticated: data.authenticated }).emit();
        //you can specify an event name if you want
        //this.setStoreState({ authenticated: data.authenticated }).emit('EVENT_NAME');
    }
    
    getAuthentication(){
        return this.state.authenticated;
    }
}
var sessionStore = new SessionStore();
export default sessionStore;