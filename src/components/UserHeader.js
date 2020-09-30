import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserHeader = (props) => (
    <Link to='/user'>
        <Header as='h2' id="user-icon">
            <Image circular src={`http://localhost:3000/`+props.user.avatar} /> {props.user.username}
        </Header>
    </Link>
)

export default UserHeader
