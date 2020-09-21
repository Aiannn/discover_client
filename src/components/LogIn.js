import React from 'react'

class LogIn extends React.Component {

    state = {
        username: '',
        password: ''
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.loginHandler(this.state)
    }

    render() {
        return (
            <div>
                <h3>Log In</h3>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='username' onChange={this.changeHandler} value={this.state.username} placeholder='Enter Username' />
                    <input type='text' name='password' onChange={this.changeHandler} value={this.state.password} placeholder='Enter Password' />
                    <input type='submit' value='Log In' />
                </form>
            </div>
        )
    }
}

export default LogIn