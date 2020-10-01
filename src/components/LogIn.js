import React from 'react'
import { Button, Form, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
            <div className='auth-form'>
                <Card>
                    <h3 style={{color: 'black', float:'left'}}>Login</h3>

                    <Link to='/signup'>
                        <h3 style={{color: 'black', float:'left', marginLeft:'220px', marginTop: '-35px'}}>Sign Up</h3>
                    </Link>

                    <Form onSubmit={this.submitHandler}>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder='Enter Username' type='text' name='username' onChange={this.changeHandler} value={this.state.username} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Enter Password' type='text' name='password' onChange={this.changeHandler} value={this.state.password} />
                        </Form.Field>
                        <Form.Field>
                            <Button type='submit'>Log In</Button>
                        </Form.Field>
                    </Form>
                </Card>
            </div>
        )
    }
}


export default LogIn
