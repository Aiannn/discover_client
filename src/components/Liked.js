import React from 'react'
import PostContainer from './PostContainer'

class Liked extends React.Component {
    render() {
        return (
            <PostContainer posts={this.props.liked} />
        )
    }
}

export default Liked