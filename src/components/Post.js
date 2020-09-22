import React from 'react'
import '../styles/Post.css'

class Post extends React.Component {

    clickHandler = () => {

        let obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user: JSON.parse(window.localStorage.user).username,
                post: this.props.post
            })
        }

        fetch('http://localhost:3000/likes', obj)
        .then(response => response.json())
        .then(data => {console.log(data)})
    }

    render() {
        return (
            <div className='post'>
                <div>{this.props.post.title}</div>
                <div><img src={'http://localhost:3000/'+this.props.post.image} alt={this.props.post.title}/></div>
                <div><audio src={'http://localhost:3000/'+this.props.post.track} controls></audio></div>
                <div><button onClick={this.clickHandler}>Like</button><span>{this.props.post.likes.length} likes</span></div>
            </div>
        )
    }
}
export default Post

