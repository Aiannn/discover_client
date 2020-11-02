import React from 'react'
import PostContainer from './PostContainer'

class ForYou extends React.Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        fetch('http://localhost:3000/mostliked')
        .then(resp => resp.json())
        .then(posts => {
            this.setState({
                posts: posts 
            })
        })
    }

    render() {
        return(
            <React.Fragment>
                <div id="most-liked">
                    <div><h2>Most Liked</h2></div>
                    <PostContainer posts={this.state.posts}/>
                </div>
            </React.Fragment>
        )
    }
}

export default ForYou