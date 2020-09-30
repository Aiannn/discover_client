import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PostContainer from './PostContainer'
import { Card, Icon, Image, Button, Dimmer, Header } from 'semantic-ui-react'

class UserShowPage extends React.Component {

    state = {
        otherUser: false,
        hisPosts: [],
        isFollowed: null,
        followers: null,
        activeFollowers: false,
        activeFollowings: false
    }

    handleOpenFollowers = () => this.setState({ activeFollowers: true })
    handleCloseFollowers = () => this.setState({ activeFollowers: false })

    handleOpenFollowings = () => this.setState({ activeFollowings: true })
    handleCloseFollowings = () => this.setState({ activeFollowings: false })

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

    //WORKS, but it could be sensitive, moreover I have many more Links where I should implement it
    //since props(props.match.params) changes this function get triggered
    componentWillReceiveProps(nextProps) {
        fetch(`http://localhost:3000/api/v1/users/${nextProps.match.params.userName}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.user)
            this.setState({
                otherUser: data.user,
                hisPosts: data.user.posts,
                followers: data.user.followers.length,
                isFollowed: this.checkUserFollowed() ? true : false,
                activeFollowers: false,
                activeFollowings: false 
            })
        })
    }
    
    componentWillMount() {
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
                    
                    <a onClick={this.handleOpenFollowers}>
                        <Icon name='user' />
                        Followers {this.state.followers}
                    </a>
                    <Dimmer active={this.state.activeFollowers} onClickOutside={this.handleCloseFollowers} page>
                        <Header as='h2' icon inverted>
                            <Icon name='user' />
                                Followers
                            <Header.Subheader>
                                <div>
                                    {this.state.otherUser.followers && this.state.otherUser.followers.map(i => 
                                    <Link to={JSON.parse(localStorage.user).username!==i.username ? `/users/${i.username}` : `/user`} >
                                        <p>
                                            {i.username}
                                        </p>
                                    </Link>
                                    )}
                                </div>
                            </Header.Subheader>
                        </Header>
                    </Dimmer>

                    <a onClick={this.handleOpenFollowings}>
                        <Icon name='user' />
                        Followings {this.state.otherUser.followees && this.state.otherUser.followees.length}
                    </a>
                    <Dimmer active={this.state.activeFollowings} onClickOutside={this.handleCloseFollowings} page>
                        <Header as='h2' icon inverted>
                            <Icon name='user' />
                                Followings
                            <Header.Subheader>
                                <div>
                                    {this.state.otherUser.followees && this.state.otherUser.followees.map(i => 
                                    <Link to={JSON.parse(localStorage.user).username!==i.username ? `/users/${i.username}` : `/user`} >
                                        <p>
                                            {i.username}
                                        </p>
                                    </Link>
                                    )}
                                </div>
                            </Header.Subheader>
                        </Header>
                    </Dimmer>

                    </Card.Content>
                </Card>

                <PostContainer posts={this.state.hisPosts} />

            </React.Fragment>
        )
    }
}

export default withRouter(UserShowPage)


