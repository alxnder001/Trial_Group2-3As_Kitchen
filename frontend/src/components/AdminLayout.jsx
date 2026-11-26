import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/api';
import '../styles/base.css';
import '../styles/admin.css';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem('3a_kitchen_role');

  useEffect(() => {
    if (role !== 'a') navigate('/login', { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  if (role !== 'a') return null;

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="brand">
          <span className="logo">3A</span>
          3A&apos;s Kitchen
        </div>
        <nav>
          <NavLink to="/admin/orders"   className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
          <NavLink to="/admin/promos"   className={({ isActive }) => isActive ? 'active' : ''}>Promo Generator</NavLink>
          <NavLink to="/admin/riders"   className={({ isActive }) => isActive ? 'active' : ''}>Riders</NavLink>
          <NavLink to="/admin/reports"  className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink>
          <NavLink to="/admin/feedback" className={({ isActive }) => isActive ? 'active' : ''}>Feedback</NavLink>
        </nav>
        <section className="admin-section">
          <p>Signed in as Admin</p>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </section>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
