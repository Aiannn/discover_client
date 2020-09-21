import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'
import '../styles/NavBar.css'

class NavBar extends React.Component {
    render() {
        return (
            <div className='parent'>
                <ul className='div1'>
                    <NavLink to='/feeds'>
                        <li>Feeds</li>
                    </NavLink>
                    <NavLink to='/about'>
                        <li>About</li>
                    </NavLink>
                    <NavLink to='/liked'>
                        <li>Liked</li>
                    </NavLink>
                    {window.localStorage.length > 0 ? 
                        <NavLink to='/user'>
                            <li>{JSON.parse(window.localStorage.user).username}</li>
                        </NavLink>
                        :
                        <NavLink to='/signup'>
                            <li>Sign Up</li>
                        </NavLink>
                    }
                    {window.localStorage.length > 0 ? 
                        <li onClick={this.props.logoutHandler}>Log Out</li>
                        :
                        <NavLink to='/login'>
                            <li>Login</li>
                        </NavLink>
                    }
                    <Search />
                </ul>
            </div>
        )
    }
}

export default NavBar 


