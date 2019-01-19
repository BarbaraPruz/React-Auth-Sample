import React, {Component} from 'react';
import { connect } from 'react-redux';
// higher order component to handle auth.   ChildComponent is component that needs the auth code.
// Boiler plate for hoc is the class Composed Component with the return
export default (ChildComponent) => {
    class ComposedComponent extends Component {

        // Re-usable code
        componentDidMount() {
            this.shouldNavigateAway();
        }
        componentDidUpdate() {
            this.shouldNavigateAway();
        }    
        shouldNavigateAway() {
            if (!this.props.auth)
                this.props.history.push('/');
        }
        
        
        render() {
            return <ChildComponent {...this.props} />
        }
    };
    const mapStateToProps = state => {
        return {
            auth: state.auth.authenticated
        }
    }
    return connect(mapStateToProps)(ComposedComponent);
};