import React from 'react'
import { Header } from 'semantic-ui-react'
import UserHeader from './UserHeader'
import SearchBar from './SearchBar'
import '../styles/AppHeader.css'

class AppHeader extends React.Component {
    render() {
        return (
            <div id='app-header'>
                <div className='child'>
                    <Header as='h2'>
                        Discover 
                    </Header>
                </div>
                {window.localStorage.length > 0 ?
                <React.Fragment>
                    <div className='child'>
                        <SearchBar />
                    </div>
                    <div className='child'>
                        <UserHeader user={this.props.user}/>
                    </div>
                </React.Fragment>
                :
                null
                }
            </div>
        )
    }
}

export default AppHeader

