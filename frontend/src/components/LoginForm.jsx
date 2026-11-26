import { Link } from 'react-router-dom';

const LoginForm = ({ email, setEmail, password, setPassword, errors, loading, note, onSubmit }) => {
  return (
    <main className="form-side">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <div>
          <h2>Log in</h2>
          <p className="muted">Enter your account details to continue.</p>
        </div>

        {note          && <div className="success">{note}</div>}
        {errors.global && <div className="alert">{errors.global}</div>}

        <div>
          <label className="field">Email
            <input type="email" placeholder="Enter your email address" value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.email ? 'bad' : ''} autoComplete="email" />
          </label>
          {errors.email && <p className="er">{errors.email}</p>}
        </div>

        <div>
          <label className="field">Password
            <input type="password" placeholder="Enter your password" value={password}
              onChange={e => setPassword(e.target.value)}
              className={errors.password ? 'bad' : ''} autoComplete="current-password" />
          </label>
          {errors.password && <p className="er">{errors.password}</p>}
        </div>

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p className="center muted">
          No account yet?&nbsp;<Link to="/register">Register here</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginForm;