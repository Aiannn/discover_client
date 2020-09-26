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
import Users from './components/Users'
import ForYou from './components/ForYou'
import UserShowPage from './components/UserShowPage'
import './App.css'


class App extends React.Component {

  state = {
    user: false,
    signupMessage: ''
  }

  updateUser = (updUser) => {
    this.setState({
      user: updUser
    })
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
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data.user))
          this.setState({
              user: data.user
          })
      })
    }
    else {
      this.props.history.push('signup')
    }
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
        localStorage.setItem('user', JSON.stringify(data.user))
        this.setState({
          user: data.user
        }, () => this.props.history.push('/about'))
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
      }
      this.setState({
        user: data.user
      }, () => this.props.history.push('/about'))
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.props.history.push('/login')
    this.setState({
      user: false
    })
  }

  render() {
    return (
      <Switch>
        <div>
          <NavBar logoutHandler={this.logoutHandler} user={this.state.user}/>
          <Route exact path='/feeds' render={() => <Feeds />} />
          <Route exact path='/about' render={() => <About />} />
          <Route exact path='/liked' render={() => <Liked />} />
          <Route exact path='/signup' render={() => <SignUp signupHandler={this.signupHandler}/>} />
          <Route exact path='/login' render={() => <LogIn loginHandler={this.loginHandler}/>} />
          <Route exact path='/user' render={() => <User updateUser={this.updateUser} user={this.state.user} />} />
          {/* <Route exact path='/users/:userName' render={() => <Users currentUser={this.state.user}/>} /> */}
          <Route exact path='/users/:userName' render={() => <UserShowPage currentUser={this.state.user}/>} />
          <Route exact path='/foryou' render={() => <ForYou />} />
        </div>
      </Switch>
    )
  }
}

export default withRouter(App)

