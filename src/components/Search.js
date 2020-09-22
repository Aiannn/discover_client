import React from 'react'
import { Redirect } from 'react-router-dom';

class Search extends React.Component {

    state = {
        searchTerm: ''
    }

    changeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='Search' name='search' onChange={this.changeHandler} value={this.state.searchTerm}/>
            </div>
        )
    }
}

export default Search