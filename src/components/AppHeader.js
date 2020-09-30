import React from 'react'
import { Header, Menu, Image } from 'semantic-ui-react'
import UserHeader from './UserHeader'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
// import '../styles/AppHeader.css'

class AppHeader extends React.Component {
    render() {
        return (
            <Menu secondary>
                <Menu.Item 
                    name='Discover'
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <SearchBar />
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/user'>
                            <Header as='h2' id="user-icon">
                                <Image circular src={`http://localhost:3000/`+this.props.user.avatar} /> {this.props.user.username}
                            </Header>
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default AppHeader

            // <div id='app-header'>
            //     <div className='child'>
            //         <Header as='h2'>
            //             Discover 
            //         </Header>
            //     </div>
            //     {window.localStorage.length > 0 ?
            //     <React.Fragment>
            //         <div className='child'>
            //             <SearchBar />
            //         </div>
            //         <div className='child'>
            //             <UserHeader user={this.props.user}/>
            //         </div>
            //     </React.Fragment>
            //     :
            //     null
            //     }
            // </div>
