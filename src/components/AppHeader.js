import React from 'react'
import { Header, Menu, Image } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import { Link, NavLink } from 'react-router-dom'
import '../styles/AppHeader.css'

class AppHeader extends React.Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return (
            <div id='app-header'>
                {window.localStorage.length > 0 ? 
                <Menu secondary>
                    <Header as='h2'>
                        Discover
                    </Header>

                    <NavLink to='/feeds'>
                        <Menu.Item
                            name='Feeds'
                            icon='newspaper'
                            active={activeItem === 'Feeds'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>

                    <NavLink to='/about'>
                        <Menu.Item
                            name='About'
                            icon='info'
                            active={activeItem === 'About'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>

                    <NavLink to='/liked'>
                        <Menu.Item
                            name='Liked'
                            icon='heart'
                            active={activeItem === 'Liked'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>

                    <NavLink to='/foryou'>
                        <Menu.Item 
                            name='For You'
                            icon='fire'
                            active={activeItem === 'For You'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    
                    <Menu.Menu position='right'>
                        <div className='child'>
                            <Menu.Item>
                                <SearchBar />
                            </Menu.Item>
                        </div>

                        <div className='child' id='user-header'>
                            <Menu.Item>
                                <Link to='/user'>
                                    <Header as='h3' id="user-icon">
                                        <Image circular src={`http://localhost:3000/`+this.props.user.avatar} /> {this.props.user.username}
                                    </Header>
                                </Link>
                            </Menu.Item>
                        </div>

                        <div className='child'>
                            <Menu.Item 
                                name='Log Out'
                                icon='log out'
                                onClick={this.props.logoutHandler}
                            />
                        </div>
                    
                    </Menu.Menu>
                </Menu>
                :
                
                <Menu secondary>
                <Header as='h2'>
                    Discover
                </Header>
                </Menu>
                }
            </div>
        )
    }
}

export default AppHeader 
                            



