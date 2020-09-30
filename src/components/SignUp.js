import React from 'react'
import { Card, Form, Button} from 'semantic-ui-react'

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
        <Card>
            <h3>Sign Up</h3>
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
                    <Button type='submit'>Sign Up</Button>
                </Form.Field>
            </Form>
        </Card>
        )
    }
}

export default SignUp