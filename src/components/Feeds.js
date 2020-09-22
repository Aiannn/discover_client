import React from 'react'
import PostContainer from './PostContainer'

class Feeds extends React.Component {

    state = {
        postsArray: []
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/feeds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.posts[0])
          this.setState({
            postsArray: data.posts[0]
          })
        })
      }

    render() {
        return (
            <div>
                <PostContainer posts={this.state.postsArray} />
            </div>
        )
    }
}


export default Feeds
