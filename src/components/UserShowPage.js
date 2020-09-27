import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PostContainer from './PostContainer'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class UserShowPage extends React.Component {

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
            <React.Fragment>
                <Card>
                    <Image src={'http://localhost:3000/'+this.state.otherUser.avatar} alt={this.state.otherUser.name} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>
                        {this.state.otherUser.username}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.state.otherUser.name}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div>Date of Birth: {this.state.otherUser.date_of_birth}</div>
                        <div>Bio: {this.state.otherUser.bio}</div>
                        <div>Email: {this.state.otherUser.email}</div>
                        <div>Total likes: {this.state.otherUser.total_likes}</div>
                        <div>
                            <Button 
                                onClick = {this.clickHandler}
                                color = {this.state.isFollowed ? 'grey' : 'blue'}
                                content = {this.state.isFollowed ? 'Unfollow' : 'Follow'}
                                icon = {this.state.isFollowed ? 'user times' : 'user plus'}
                            />
                        </div>
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        Followers {this.state.followers}
                    </a>
                    <a>
                        <Icon name='user' />
                        Followings {this.state.otherUser.followees && this.state.otherUser.followees.length}
                    </a>
                    </Card.Content>
                </Card>

                <PostContainer posts={this.state.hisPosts} />

            </React.Fragment>
        )
    }
}

export default withRouter(UserShowPage)


