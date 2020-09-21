import React from 'react'

class SignUp extends React.Component {

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
        this.props.signupHandler(this.state)
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='username' onChange={this.changeHandler} value={this.state.username} placeholder='Enter Username' />
                    <input type='text' name='password' onChange={this.changeHandler} value={this.state.password} placeholder='Enter Password' />
                    <input type='submit' value='Sign Up' />
                </form>
            </div>
        )
    }
}

export default SignUp