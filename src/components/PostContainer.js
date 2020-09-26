import React from 'react'
import PostCard from './PostCard'

class PostContainer extends React.Component {

    getPosts = () => {
        return this.props.posts.map(post => {
            return (
                <React.Fragment>
                    <PostCard post={post}/>
                </React.Fragment>
            )
        })
    }


    render() {
        return (
            <div class='post-container'>
                {this.getPosts()}
            </div>
        )
    }
}
    
export default PostContainer

