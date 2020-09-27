import React from 'react'
import { Card, Icon, Image, Button, Form, FormField } from 'semantic-ui-react'
import '../styles/User.css'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        name: '',
        date_of_birth: '',
        bio: '',
        email: '',
        avatar: '',
        display: false,
        display2: false,
        image: '',
        track: '',
        title: '',
        userPosts: []
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        const token = localStorage.getItem('token')
        if (token) {
          fetch("http://localhost:3000/api/v1/profile", {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => response.json())
          .then(data => {
              console.log(data)
              this.setState({
                  userPosts: data.user.posts
              })
          })
        }
        else {
          this.props.history.push('signup')
        }
      }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
            this.setState({
                avatar: e.target.files[0]
            })
        }
    }

    handleImagePostChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    }

    handleTrackPostChange = e => {
        if (e.target.files[0]) {
            this.setState({
                track: e.target.files[0]
            })
        }
    }

    updateUserInfo = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("avatar", this.state.avatar)
        formData.append("name", this.state.name)
        formData.append("date_of_birth", this.state.date_of_birth)
        formData.append("bio", this.state.bio)
        formData.append("email", this.state.email)
        formData.append("user", this.props.user.username)

        
        fetch(`http://localhost:3000/api/v1/users/profile`, {
          method: "PATCH",
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.props.updateUser(data.user)
          })
    }

    uploadPost = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.append('track', this.state.track)
        formData.append('user', this.props.user.username)
        formData.append('title', this.state.title) 

        fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            body: formData 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                userPosts: [...this.state.userPosts, data]
            })
        })
    }

    displayUpdateForm = () => {
        this.setState({
            display: !this.state.display
        })
    }

    displayUpdateFormTwo = () => {
        this.setState({
            display2: !this.state.display2 
        })
    }    

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Image src={'http://localhost:3000/'+this.props.user.avatar} alt={this.props.user.name} wrapped ui={false} circular/>
                    <Card.Content>
                    <Card.Header>
                        {this.props.user.username}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.user.name}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>Date of Birth: {this.props.user.date_of_birth}</div>
                        <div>Bio: {this.props.user.bio}</div>
                        <div>Email: {this.props.user.email}</div>
                        <div>Total likes: {this.props.user.total_likes}</div>
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        Followers {this.props.user.followers && this.props.user.followers.length}
                    </a>
                    <a>
                        <Icon name='user' />
                        Followings {this.props.user.followees && this.props.user.followees.length}
                    </a>
                    </Card.Content>
                </Card>
                <Button 
                    onClick={this.displayUpdateForm}
                    content='Update Profile'
                    icon='plus square'
                    labelPosition='left'
                />
                <Button 
                    onClick={this.displayUpdateFormTwo}
                    content='Upload Post'
                    icon='upload'
                    labelPosition='left'
                />
                {this.state.display ? 
                    <Form>
                        <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' type='text' name='name' value={this.state.name} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Date of Birth</label>
                        <input placeholder='Date of birth' type='text' name='date_of_birth' value={this.state.date_of_birth} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Bio</label>
                        <input placeholder='Bio' type='text' name='bio' value={this.state.bio} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' type='text' name='email' value={this.state.email} onChange={this.changeHandler}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Avatar</label>
                        <input type='file' name='avatar' accept='image/png, image/jpeg' onChange={this.handleImageChange}/>
                        </Form.Field>
                        <Button onClick={this.updateUserInfo} type='submit' content='Update Profile' />
                    </Form>
                    :
                    null
                }
                {this.state.display2 ?
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input placeholder='Title' type='text' name='title' value={this.state.title} onChange={this.changeHandler} />
                        </Form.Field>
                        <Form.Field>
                            <label>Image</label>
                            <input type='file' name='image' accept='image/png, image/jpeg' onChange={this.handleImagePostChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Track</label>
                            <input type='file' name='track' accept='audio/mp3, audio/mpeg' onChange={this.handleTrackPostChange}/>
                        </Form.Field>
                        <Button onClick={this.uploadPost} type='submit' content='Upload Post' />
                    </Form>
                    :
                    null
                }


                <PostContainer posts={this.state.userPosts} />

            </React.Fragment>
        )
    }
}

export default Profile