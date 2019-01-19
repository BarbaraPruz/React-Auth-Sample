import React, {Component} from 'react';

import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return (
            <div>
                <h1>this is the feature (auth protected) component</h1>
            </div>
        )
    }
}

export default requireAuth(Feature);