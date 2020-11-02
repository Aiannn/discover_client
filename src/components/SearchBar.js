import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link, withRouter, Switch, Route, Redirect} from 'react-router-dom'
import ListFromSearch from './ListFromSearch'
// import '../styles/SearchBar.css'

class SearchBar extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    submitHandler = e => {
      e.preventDefault()
      this.props.history.push('/listfromsearch')
      // <Redirect to='/listfromsearch' />
    }

    handleInputChange = e => {
      const query = e.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.username.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      fetch(`http://localhost:3000/api/v1/users`)
        .then(response => response.json())
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(user => {
            return (query.length === 0) ? null : user.username.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/listfromsearch' render={() => <ListFromSearch query={this.state.query}/>} />
          </Switch>
          <div className="searchForm"> 
            <form onSubmit={this.submitHandler}>
              <input
                className='searchTerm' 
                placeholder="Search by username/hashtag"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <input type='submit' value='Search!' className='searchButton' />
            </form>
            <div>
              {(this.state.query.length===0) ? null : this.state.filteredData.map(user => 
              <Link to={`/users/${user.username}`}>
                <div>
                  <Image circular src={'http://localhost:3000/'+user.avatar} height='50px'/>
                  <span>{user.username}</span>
                </div>
              </Link>
              )}
            </div>
          </div>
        </React.Fragment>
      )
    }
}

export default withRouter(SearchBar)
