import React, { Component } from 'react'
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'

//no need for it
class FollowDimmer extends Component {
  state = {
      active: false,
      users: []
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  componentDidMount() {
      fetch(`http://localhost:3000/api/v1/users`)
      .then(response => response.json())
      .then(data => {
          this.setState({
              users: data
          })
      })
  }

  sortUsers = () => {
      return this.state.users.forEach(user => {
          return <div>{user.username}</div>
      })
  }

  render() {
    const { active } = this.state

    return (
      <div>
        <Button
          content='Show'
          icon='plus'
          labelPosition='left'
          onClick={this.handleOpen}
        />

        <Dimmer active={active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon inverted>
            <Icon name='user' />
                Followers
            <Header.Subheader><div>{this.state.users.map(i => <p>{i.username}</p>)}</div></Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    )
  }
}

export default FollowDimmer