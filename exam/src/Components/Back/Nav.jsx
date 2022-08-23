import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="nav">
        <NavLink
          to="/admin/"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'crimson',
                }
              : null
          }
        >
          <span className="nav-hover">BACKAS</span>
        </NavLink>
        <NavLink
          to="/admin/create-service"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'crimson',
                }
              : null
          }
        >
          <span className="nav-hover">Create SERVICE</span>
        </NavLink>
        <NavLink
          to="/admin/services"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'crimson',
                }
              : null
          }
        >
          <span className="nav-hover">SERVICES</span>
        </NavLink>
        <NavLink
          to="/admin/masters"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'crimson',
                }
              : null
          }
        >
          <span className="nav-hover">Masters</span>
        </NavLink>
        <Link to="/logout">Logout</Link>
      </nav>
    </>
  );
}

export default Nav;
