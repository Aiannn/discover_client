import React from 'react'

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
        <div className="searchForm">
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>{(this.state.query.length===0) ? null :this.state.filteredData.map(i => <p>{i.username}</p>)}</div>
        </div>
      );
    }
}

export default SearchBar