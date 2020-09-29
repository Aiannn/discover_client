import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
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
        <div className="searchForm" style={{marginLeft: '120%'}}> 
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>
            {(this.state.query.length===0) ? null : this.state.filteredData.map(user => 
            <Link to={`/users/${user.username}`}>
              <div>
                <Image src={'http://localhost:3000/'+user.avatar} avatar/>
                <span>{user.username}</span>
              </div>
            </Link>
            )}
          </div>
        </div>
      );
    }
}

export default SearchBar