import React from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/User.css'
import PostContainer from './PostContainer'

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
        title: ''
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

    submitHandler = (e) => {
        e.preventDefault()

        let obj = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                avatar: this.state.avatar,
                name: this.state.name,
                date_of_birth: this.state.date_of_birth,
                bio: this.state.bio,
                email: this.state.email,
                username: JSON.parse(window.localStorage.user).username 
            })
        }

        fetch('http://localhost:3000/api/v1/users/profile', obj)
        .then(response => response.json())
        .then(console.log)
    }

    uploadPhoto = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("avatar", this.state.avatar)
        
        fetch(`http://localhost:3000/api/v1/users/profile`, {
          method: "PATCH",
          body: formData
        })
          .then(res => res.json())
          .then(data => {
           console.log(data)
          })
    }

    uploadPost = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.append('track', this.state.track)
        formData.append('user', JSON.parse(window.localStorage.user).username)
        formData.append('title', this.state.title) 

        fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            body: formData 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
                        <div>Welcome, {JSON.parse(window.localStorage.user).username}</div>
                        <div>Name: {JSON.parse(window.localStorage.user).name}</div>
                        <div>Date of Birth: {JSON.parse(window.localStorage.user).date_of_birth}</div>
                        <div>Bio: {JSON.parse(window.localStorage.user).bio}</div>
                        <div>Email: {JSON.parse(window.localStorage.user).email}</div>
                        <div>Followers: {JSON.parse(window.localStorage.user).followers.length}</div>
                        <div>Followings: {JSON.parse(window.localStorage.user).followees.length}</div>
                        <div><img src={'http://localhost:3000/'+JSON.parse(window.localStorage.user).avatar} width='200' height='300' alt={JSON.parse(window.localStorage.user).name}/></div>
                    </div>
                    <div>
                        <button onClick={this.displayUpdateForm}>Update Info</button>
                        <button onClick={this.displayUpdateFormTwo}>Upload Post</button>
                    </div>
                    {this.state.display ?
                        <div className='container'>
                            <form onSubmit={this.submitHandler}>
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
                        <PostContainer posts={JSON.parse(localStorage.user).posts} />
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

