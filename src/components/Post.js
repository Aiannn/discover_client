import React from 'react'
import '../styles/Post.css'

class Post extends React.Component {

    state = {
        likes: this.props.post.likes.length,
        isLiked: null,
        likeId: null
    }

    componentDidMount() {
        this.checkUserLiked()
        console.log(this.props.post)
    }

    clickLike = () => {
        this.state.isLiked ? 
        this.deleteLike()
        :
        this.createLike()
    }

    deleteLike = () => {
        fetch(`http://localhost:3000/likes/${this.state.likeId}`, {
            method: 'DELETE'
        })
        this.setState({
            likes: this.state.likes - 1,
            isLiked: !this.state.isLiked 
        })
    }

    createLike = () => {

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
        .then(data => {
            console.log(data)
            this.setState({
                likes: this.state.likes + 1, //Optimistic Rendering
                isLiked: !this.state.isLiked,
                likeId: data.id
            })
        })
    }

    checkUserLiked = () => {
        this.props.post.likes.forEach(like => {
            if (like.user_id === JSON.parse(window.localStorage.user).id) {
                this.setState({
                    isLiked: true,
                    likeId: like.id 
                })
            }
        })
    }

    render() {
        return (
            <div className='post'>
                <div>{this.props.post.user.username}</div>
                <div>{this.props.post.title}</div>
                <div><img src={'http://localhost:3000/'+this.props.post.image} alt={this.props.post.title}/></div>
                <div><audio src={'http://localhost:3000/'+this.props.post.track} controls></audio></div>
                <div>
                    <button onClick={this.clickLike}>
                        {this.state.isLiked ? "Unlike" : "Like"}
                    </button><span>{this.state.likes} likes</span>
                </div>
            </div>
        )
    }
}
export default Post

