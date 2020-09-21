import React from 'react'
import Post from './Post'

class PostContainer extends React.Component {

    getPosts = () => {
        return this.props.posts.map(post => {
            return <Post post={post} />
        })
    }

    render() {
        return (
            <div>
                {this.getPosts()}
            </div>
        )
    }
}
    
export default PostContainer

