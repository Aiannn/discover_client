import React from 'react'
import PostCard from './PostCard'
import '../styles/PostContainer.css'

class PostContainer extends React.Component {

    getPosts = () => {
        return this.props.posts.map(post => {
            return (
                <React.Fragment>
                    <PostCard post={post} deletePostFromPage={this.props.deletePostFromPage}/>
                </React.Fragment>
            )
        })
    }


    render() {
        return (
            <div className='post-container'>
                {this.getPosts()}
            </div>
        )
    }
}
    
export default PostContainer

