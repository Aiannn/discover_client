import React from 'react'
import { withRouter } from 'react-router-dom'
import PostContainer from './PostContainer'


class Users extends React.Component {

    state = {
        otherUser: false,
        hisPosts: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.props.match.params.userId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.user)
            this.setState({
                otherUser: data.user,
                hisPosts: data.user.posts
            })
        })
    }

    render() {
        return ( 
            <div>
                <div>
                    <div>Username: {this.state.otherUser.username}</div>
                    <div>Name: {this.state.otherUser.name}</div>
                    <div>Date of Birth: {this.state.otherUser.date_of_birth}</div>
                    <div>Bio: {this.state.otherUser.bio}</div>
                    <div>Email: {this.state.otherUser.email}</div>
                    <div>Followers: {this.state.otherUser.followers && this.state.otherUser.followers.length}</div>
                    <div>Followings: {this.state.otherUser.followees && this.state.otherUser.followees.length}</div>
                    <div><img src={'http://localhost:3000/'+this.state.otherUser.avatar} width='200' height='300' alt={this.state.otherUser.name}/></div>
                </div>
                <div>
                    <PostContainer posts={this.state.hisPosts} />
                </div> 
            </div>
        )
    }
}

export default withRouter(Users)