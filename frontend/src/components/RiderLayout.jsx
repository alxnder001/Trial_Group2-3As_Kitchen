const RiderLayout = ({ name, onLogout, children }) => {
  return (
    <>
      <header className="topbar">
        <div className="brand"><span className="logo">3A</span>3A&apos;s Kitchen</div>
        <nav className="topnav">
          <span className="muted">Rider: <b>{name}</b></span>
          <button className="button secondary small" onClick={onLogout}>Log out</button>
        </nav>
      </header>
      <main className="page">{children}</main>
    </>
  );
};

export default RiderLayout;
