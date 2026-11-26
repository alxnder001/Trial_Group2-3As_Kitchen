import { Link } from 'react-router-dom';

const CustomerLayout = ({ active, name, onLogout, cartCount, onCartClick, children }) => {
  return (
    <>
      <header className="topbar">
        <div className="brand"><span className="logo">3A</span>3A&apos;s Kitchen</div>
        <nav className="topnav">
          <Link to="/menu"     className={active === 'menu'     ? 'on' : ''}>Menu</Link>
          <Link to="/orders"   className={active === 'orders'   ? 'on' : ''}>My Orders</Link>
          <Link to="/feedback" className={active === 'feedback' ? 'on' : ''}>Feedback</Link>
          <span className="muted">Hi, <b>{name ? name.split(' ')[0] : ''}</b></span>
          {onCartClick && (
            <button className="cart-icon-btn" onClick={onCartClick} aria-label="View cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9"  cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}
          <button className="button secondary small" onClick={onLogout}>Log out</button>
        </nav>
      </header>
      <main className="page">{children}</main>
    </>
  );
};

export default CustomerLayout;
