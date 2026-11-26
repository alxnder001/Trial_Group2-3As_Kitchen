import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSession, takeNote, HOME } from '../store/db';
import AuthHero from '../components/AuthHero';
import LoginForm from '../components/LoginForm';
import '../styles/base.css';
import '../styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [note] = useState(() => takeNote());
  const [email, setEmail] = useState(() => {
    const pre = sessionStorage.getItem('3a_prefill');
    if (pre) { sessionStorage.removeItem('3a_prefill'); return pre; }
    return '';
  });
  const [password, setPassword] = useState('');
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('3a_kitchen_user');
    const role    = localStorage.getItem('3a_kitchen_role');
    if (session && role) navigate(HOME[role], { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailChange    = v => { setEmail(v);    setErrors(x => ({ ...x, email: '' })); };
  const handlePasswordChange = v => { setPassword(v); setErrors(x => ({ ...x, password: '' })); };

  const handleSubmit = async e => {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    const x  = {};
    if (!em)       x.email    = 'This field is required.';
    if (!password) x.password = 'This field is required.';
    if (Object.keys(x).length) { setErrors(x); return; }

    setLoading(true); setErrors({});
    try {
      const res  = await fetch('/users/login', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password }),
      });
      const data = await res.json();
      if (!res.ok) { setErrors({ global: data.error || 'Invalid email or password.' }); setLoading(false); return; }
      const user = data.user;
      setSession(user.email);
      localStorage.setItem('3a_kitchen_role', user.role);
      localStorage.setItem('3a_kitchen_name', user.name);
      localStorage.setItem('3a_kitchen_id',   user.id);
      if (user.riderId) localStorage.setItem('3a_kitchen_rider_id', user.riderId);
      navigate(HOME[user.role], { replace: true });
    } catch {
      setErrors({ global: 'Cannot reach the server. Is the backend running?' });
      setLoading(false);
    }
  };

  return (
    <div className="split">
      <AuthHero
        title="Good food, delivered to your door."
        subtitle="Log in to browse our menu, place your order, and track your delivery."
      />
      <LoginForm
        email={email}
        setEmail={handleEmailChange}
        password={password}
        setPassword={handlePasswordChange}
        errors={errors}
        loading={loading}
        note={note}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginPage;