import React from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/User.css'
import PostContainer from './PostContainer'


//Dont need it anymore I use Profile Instead
class User extends React.Component {

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
                {window.localStorage.length > 0 ?
                <div>
                    <div>
                        <div>Welcome, {this.props.user.username}</div>
                        <div>Name: {this.props.user.name}</div>
                        <div>Date of Birth: {this.props.user.date_of_birth}</div>
                        <div>Bio: {this.props.user.bio}</div>
                        <div>Email: {this.props.user.email}</div>
                        <div>Followers: {this.props.user.followers && this.props.user.followers.length}</div>
                        <div>Followings: {this.props.user.followees && this.props.user.followees.length}</div>
                        <div><img src={'http://localhost:3000/'+this.props.user.avatar} width='200' height='300' alt={JSON.parse(window.localStorage.user).name}/></div>
                    </div>
                    <div>
                        <button onClick={this.displayUpdateForm}>Update Info</button>
                        <button onClick={this.displayUpdateFormTwo}>Upload Post</button>
                    </div>
                    {this.state.display ?
                        <div className='container'>
                            <form onSubmit={this.updateUserInfo}>
                                <label>Name:</label>
                                <input type='text' name='name' value={this.state.name} onChange={this.changeHandler}/>
                                <label>Date of Birth:</label>
                                <input type='text' name='date_of_birth' value={this.state.date_of_birth} onChange={this.changeHandler}/>
                                <label>Bio:</label>
                                <input type='text' name='bio' value={this.state.bio} onChange={this.changeHandler}/>
                                <label>Email:</label>
                                <input type='text' name='email' value={this.state.email} onChange={this.changeHandler}/>
                                <label>Avatar:</label>
                                <input type='file' name='avatar' accept='image/png, image/jpeg' onChange={this.handleImageChange}/>
                                <input type='submit' value='Submit' />
                            </form>
                        </div>
                        :
                        null 
                    }
                    {this.state.display2 ?
                        <div>
                            <form onSubmit={this.uploadPost}>
                                <label>Title</label>
                                <input type='text' name='title' value={this.state.title} onChange={this.changeHandler} />
                                <label>Image</label>
                                <input type='file' name='image' accept='image/png, image/jpeg' onChange={this.handleImagePostChange} />
                                <label>Track</label>
                                <input type='file' name='track' accept='audio/mp3, audio/mpeg' onChange={this.handleTrackPostChange}/>
                                <input type='submit' value='Upload' />
                            </form>
                        </div>
                        :
                        null
                    }
                    <div>
                        <PostContainer posts={this.state.userPosts} />
                    </div>
                </div>
                :
                <Redirect to='/signup' />
                }
            </React.Fragment>
        )
    }
}

export default User 

