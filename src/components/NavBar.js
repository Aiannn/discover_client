import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react' 
import '../styles/NavBar.css'

class NavBar extends React.Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return (
            <Menu pointing secondary vertical id='menu'>
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
                {window.localStorage.length > 0 ?
                    <NavLink to='/user'>
                        <Menu.Item
                            name={JSON.parse(window.localStorage.user).username}
                            icon='user'
                            active={activeItem === JSON.parse(window.localStorage.user).username}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    :
                    <NavLink to='signup'>
                        <Menu.Item
                            name='Sign Up'
                            icon='sign in'
                            active={activeItem === 'Sign Up'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                }
                <NavLink to='/foryou'>
                    <Menu.Item 
                        name='For You'
                        icon='fire'
                        active={activeItem === 'For You'}
                        onClick={this.handleItemClick}
                    />
                </NavLink>
                {window.localStorage.length > 0 ?
                    <Menu.Item 
                        name='Log Out'
                        icon='log out'
                        onClick={this.props.logoutHandler}
                    />
                    :
                    <NavLink to='/login'>
                        <Menu.Item
                            name='Log In'
                            icon='sign in'
                            active={activeItem === 'Log In'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                }
            </Menu>
        )
    }
}

export default NavBar 




// <div className='parent'>
//     <ul className='div1'>
//         <NavLink to='/feeds'>
//             <li>Feeds</li>
//         </NavLink>
//         <NavLink to='/about'>
//             <li>About</li>
//         </NavLink>
//         <NavLink to='/liked'>
//             <li>Liked</li>
//         </NavLink>
//         {window.localStorage.length > 0 ? 
//             <NavLink to='/user'>
//                 <li>{JSON.parse(window.localStorage.user).username}</li>
//             </NavLink>
//             :
//             <NavLink to='/signup'>
//                 <li>Sign Up</li>
//             </NavLink>
//         }
//         <NavLink to='/foryou'>
//             <li>For You</li>
//         </NavLink>
//         {window.localStorage.length > 0 ? 
//             <li onClick={this.props.logoutHandler}>Log Out</li>
//             :
//             <NavLink to='/login'>
//                 <li>Login</li>
//             </NavLink>
//         }
//         <Search />
//     </ul>
// </div>