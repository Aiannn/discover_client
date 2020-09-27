import React from 'react'
import { withRouter } from 'react-router-dom'
import PostContainer from './PostContainer'


//It's unnessesarily anymore. Instead Users I use UserShowPage
class Users extends React.Component {

    state = {
        otherUser: false,
        hisPosts: [],
        isFollowed: null,
        followers: null 
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.props.match.params.userName}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.user)
            this.setState({
                otherUser: data.user,
                hisPosts: data.user.posts,
                followers: data.user.followers.length,
                isFollowed: this.checkUserFollowed() ? true : false
            })
        })
    }

    checkUserFollowed = () => {
        let i = 0
        JSON.parse(window.localStorage.user).followees.forEach(followee => {
            if (followee.username === this.props.match.params.userName) {
                i = i + 1
            }    
        })
        return i > 0 ? true:false
    }
    
    clickHandler = () => {
        this.state.isFollowed ? 
        this.clickUnfollow()
        :
        this.clickFollow() 
    }

    clickFollow = () => {
        fetch(`http://localhost:3000/follows`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                follower_id: JSON.parse(localStorage.user).id,
                following_id: this.state.otherUser.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                isFollowed: !this.state.isFollowed,
                followers: this.state.followers + 1 
            })
        })
    }

    clickUnfollow = () => {
        fetch(`http://localhost:3000/unfollow`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                follower_id: JSON.parse(localStorage.user).id,
                following_id: this.state.otherUser.id 
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                isFollowed: !this.state.isFollowed,
                followers: this.state.followers - 1 
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
                    <div>Followers: {this.state.followers}</div>
                    <div>Followings: {this.state.otherUser.followees && this.state.otherUser.followees.length}</div>
                    <div><img src={'http://localhost:3000/'+this.state.otherUser.avatar} width='200' height='300' alt={this.state.otherUser.name}/></div>
                    <div>
                        <button onClick={this.clickHandler}>
                            {this.state.isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>
                <div>
                    <PostContainer posts={this.state.hisPosts} />
                </div> 
            </div>
        )
    }
}

export default withRouter(Users)