import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/Navbar.scss'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="logo">SnailRace</NavLink>
      </div>

      <div className="nav-center"> 
        <NavLink to="/vehicle">Ver Vehículos</NavLink>
        <NavLink to="/brand">Ver Marcas</NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin">Panel Admin</NavLink>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
          <NavLink to="/me">Profile</NavLink>
          <span className="user-email">{user.email}</span>
          <span className="user-name" onClick={logout} style={{ cursor: 'pointer', marginLeft: '10px' }}>
          (Logout)
        </span>
        </>
        ) : (
          <> 
        
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
          </>
          )}
      </div>
    </nav>
  )
}

export default Navbar
