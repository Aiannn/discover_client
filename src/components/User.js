import React from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/User.css'

class User extends React.Component {

    state = {
        name: '',
        date_of_birth: '',
        bio: '',
        email: '',
        avatar: '',
        display: false 
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
        
        // configure your fetch url appropriately
        fetch(`http://localhost:3000/api/v1/users/profile`, {
          method: "PATCH",
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
                        <div><img src={window.localStorage.avatar} width='200' height='300' alt={JSON.parse(window.localStorage.user).name}/></div>
                    </div>
                    <div>
                        <button onClick={this.displayUpdateForm}>Update Info</button>
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
                </div>
                :
                <Redirect to='/signup' />
                }
            </React.Fragment>
        )
    }
}

export default User 

