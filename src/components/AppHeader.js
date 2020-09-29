import React from 'react'
import { Header } from 'semantic-ui-react'
import UserHeader from './UserHeader'
import SearchBar from './SearchBar'
import '../styles/AppHeader.css'

class AppHeader extends React.Component {
    render() {
        return (
            <div id='app-header'>
                <div>
                    <Header as='h2'>
                        Discover 
                    </Header>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <UserHeader user={this.props.user}/>
                </div>
            </div>
        )
    }
}

export default AppHeader
