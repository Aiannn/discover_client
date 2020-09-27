import React from 'react'
import { Header } from 'semantic-ui-react'
import UserHeader from './UserHeader'
import SearchBar from './SearchBar'
import '../styles/AppHeader.css'

class AppHeader extends React.Component {
    render() {
        return (
            <div id='app-header'>
                <Header as='h2'>
                    Discover 
                </Header>
                <SearchBar />
                <UserHeader user={this.props.user}/>
            </div>
        )
    }
}

export default AppHeader