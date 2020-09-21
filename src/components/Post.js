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
                user: this.props.user,
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
                <img src={'http://localhost:3000/'+this.props.post.image} alt={this.props.post.title}/>
                <audio src={this.props.post.track} controls></audio>
                <button onClick={this.clickHandler}>Like</button>
            </div>
        )
    }
}
export default Post

