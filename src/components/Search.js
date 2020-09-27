import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

//no need for it, instead i use SearchBar.js
class Search extends React.Component {

    state = {
        searchTerm: '',
        fetchedData: ''
    }
    //IT'S WORKING FIRST TIME YOU CLICK ON USER, BUT THEN IT DOESN'T WORK!
    changeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    keyUpHandler = (e) => {
        console.log(e.target.value)
        fetch(`http://localhost:3000/api/v1/users/${e.target.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                fetchedData: data.user
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <input type='text' options={null} placeholder='Search username/hashtags' 
                    name='search' onChange={this.changeHandler} 
                    value={this.state.searchTerm}
                    onKeyUp={this.keyUpHandler}
                    />
                </div>
                {this.state.fetchedData ?
                <Link to={`/users/${this.state.fetchedData.username}`}>
                    <div>
                        <div>{this.state.fetchedData.username}</div>
                        <div><img src={'http://localhost:3000'+this.state.fetchedData.avatar} /></div>
                    </div>
                </Link>
                :
                null
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Search)





/* <Dropdown
  button
  className='icon'
  floating
  labeled
  icon='address book'
  options={null}
  search
  text='Select User'
/> */