import React from 'react'
import PostContainer from './PostContainer'

class Feeds extends React.Component {

    render() {
        return (
            <div>
                <PostContainer posts={this.props.posts} />
            </div>
        )
    }
}


export default Feeds
