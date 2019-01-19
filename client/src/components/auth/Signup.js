import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signup extends Component {

    onSubmit = formProps => {
        console.log("Submit",formProps);
        // 2nd arg is callback that is called on success.  see the signup action creator
        this.props.signup(formProps, () => {
            console.log("Signup Submit - successful!")
            this.props.history.push('/feature');
        });
    }

    render() {
        // handleSubmit - from redux/redux-forms
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} >
                <fieldset>
                    <label>Email</label>
                    <Field 
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field 
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"                        
                    />                    
                </fieldset> 
                <div>{this.props.errorMessage}</div>
                <button>Sign Up!</button>               
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage : state.auth.errorMessage}
}
export default compose (
    connect(mapStateToProps, actions),
    reduxForm({form: 'signup'})
) (Signup);
