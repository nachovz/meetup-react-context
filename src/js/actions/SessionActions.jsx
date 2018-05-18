import Flux from "@4geeksacademy/react-flux-dash";
class SessionActions extends Flux.Action{
    
    authenticateUser(){
        this.dispatch('SessionStore.setAuthentication', {authenticated: true});
        // you will have to create a _setAutentication inside StoreActions
    }
    
}
var sessionActions = new SessionActions();
export default sessionActions;