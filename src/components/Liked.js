import React from 'react'
import PostContainer from './PostContainer'

class Liked extends React.Component {

    state = {
        likedPosts: []
    }

    componentDidMount() {
        this.getAPI()
    }

    getAPI = () => {
        const token = localStorage.getItem("token")
        if (token) {
          fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }) 
          .then(response=>response.json())
          .then(data => {
            console.log(data.user)
            this.setState({
              likedPosts: data.user.liked_posts
            })
          })
        }
    }

    render() {
        return (
            <PostContainer posts={this.state.likedPosts} />
        )
    }
}

export default Liked