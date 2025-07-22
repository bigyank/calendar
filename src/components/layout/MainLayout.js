import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">React App Demo</h1>
        <nav className="main-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Holiday Calendar
          </NavLink>
          <NavLink 
            to="/experience" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Experience Form
          </NavLink>
        </nav>
      </header>
      
      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>React Router Demo Application</p>
      </footer>
    </div>
  );
}

export default MainLayout; 