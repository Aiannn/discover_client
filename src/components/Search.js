import React from 'react'
import { Redirect } from 'react-router-dom';

class Search extends React.Component {
    render() {
        return (
            <div>
                <input type='text' placeholder='Search' />
            </div>
        )
    }
}

export default Search