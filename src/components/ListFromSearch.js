import React from 'react'
import PostContainer from './PostContainer'

class ListFromSearch extends React.Component {

    state = {
        postsArray: []
    }

    componentDidMount() {
        this.getPosts()
        this.filterArray()
    }

    getPosts = () => {
        fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(data => {
          this.setState({
            postsArray: data
          })
        })
    }

    filterArray = () => {
        return this.state.postsArray.filter(post => {
            return post.hashtag === this.props.query
        })
    }

    render() {
        return (
            <div>
                <PostContainer posts={this.filterArray()}/>
            </div>
        )
    }
}

export default ListFromSearch