import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class PostCard extends React.Component {

  state = {
    likes: this.props.post.likes.length,
    isLiked: null,
    likeId: null
  }

  componentDidMount() {
    this.checkUserLiked()
    console.log(this.props.post)
  }

  deletePost = (post) => {
    fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'DELETE'
    })
    this.props.deletePostFromPage(post)
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
      <div className='post-card'>
        <Card>
          <Card.Content extra>
            <Link to={`/users/${this.props.post.user.username}`}>
              <Icon name='user' />
                {this.props.post.user.username}
            </Link>
          </Card.Content>

          <Image src={'http://localhost:3000/'+this.props.post.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.post.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.post.description}</span>
            </Card.Meta>
            <Card.Description>
              <audio src={'http://localhost:3000/'+this.props.post.track} controls></audio>
              <Button
                onClick={this.clickLike}
                color = {this.state.isLiked ? 'red' : 'blue'}
                content={this.state.isLiked ? 'Liked' : 'Like'}
                icon='heart'
                label={{ as: 'a', basic: true, content: this.state.likes }}
                labelPosition='right'
              />

              {JSON.parse(window.localStorage.user).username === this.props.post.user.username 
              && this.props.match.path === '/user' ?
              
              <Button animated onClick={() => this.deletePost(this.props.post)}>
                <Button.Content visible>Delete</Button.Content>
                <Button.Content hidden>
                  <Icon name='trash' />
                </Button.Content>
              </Button>
              :
              null
              }

            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a style={{marginRight: '20%'}}>
              <span>{this.props.post.hashtag}</span>
            </a>
            <a>
              <span>{(this.props.post.created_at).toLocaleString()}</span>
            </a>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default withRouter(PostCard) 

