import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Feeds from './components/Feeds'
import About from './components/About'
import Liked from './components/Liked'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import User from './components/User'
import './App.css'


class App extends React.Component {

  state = {
    user: false,
    postsArray: [],
    avatar: '',
    likedPosts: []
  }

  componentDidMount() {
    this.getPosts()
    this.getLikedPosts()
  }

  updateCurrentUser = data => {
    this.setState({
      user: data.user,
      avatar: data.avatar_url
    })
  }

  signupHandler = (userObj) => {

    let obj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        user: userObj
      })
    }

    fetch('http://localhost:3000/api/v1/users', obj)
    .then(response => response.json())
    .then(data => {
      console.log(data) //TESTING_PURPOSES
      if (data.jwt) {
        localStorage.setItem('token', data.jwt)
        this.setState({
          user: data.user
        })
      } else {
        this.setState({
          signupMessage: data.error
        })
      }
    })
  }

  loginHandler = (userObj) => {
    let obj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        user: userObj
      })
    }

    fetch('http://localhost:3000/api/v1/login', obj)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.jwt) {
        localStorage.setItem('token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('avatar', data.avatar)
      }
      this.setState({
        user: data.user
      }, () => this.props.history.push('/about'))
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('avatar')
    this.props.history.push('/login')
    this.setState({
      user: false
    })
  }

  getPosts = () => {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {
      console.log(posts)
      this.setState({
        postsArray: posts
      })
    })
  }
  
  getLikedPosts = () => {
    fetch('http://localhost:3000/likes')
    .then(response => response.json())
    .then(data => {
      this.setState({
        likedPosts: data
      })
    })
  }

  render() {
    return (
      <Switch>
        <div>
          <NavBar logoutHandler={this.logoutHandler} user={this.state.user}/>
          <Route exact path='/feeds' render={() => <Feeds posts={this.state.postsArray} />} />
          <Route exact path='/about' render={() => <About />} />
          <Route exact path='/liked' render={() => <Liked liked={this.state.likedPosts} />} />
          <Route exact path='/signup' render={() => <SignUp signupHandler={this.signupHandler}/>} />
          <Route exact path='/login' render={() => <LogIn loginHandler={this.loginHandler}/>} />
          <Route exact path='/user' render={() => <User updateCurrentUser={this.updateCurrentUser} user={this.state.user} />} />
        </div>
      </Switch>
    )
  }
}

export default withRouter(App)

