import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { login, logout, authConfig } from './Functions/auth';
import Front from './Components/Front/Front';
import Back from './Components/Back/Back';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={
            // <RequireAuth role="user">
            <Front show="sign-in" />
            // </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth role="user">
              <Front show="front" />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <Back show="admin" />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/create-service"
          element={
            <RequireAuth role="admin">
              <Back show="create-service" />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/services"
          element={
            <RequireAuth role="admin">
              <Back show="services" />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/masters"
          element={
            <RequireAuth role="admin">
              <Back show="masters" />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);
  console.log('alio');
  useEffect(() => {
    axios
      .get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then((res) => {
        console.log(res);
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children]);

  return view;
}

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass }).then((res) => {
      console.log(res.data);
      if ('ok' === res.data.msg) {
        login(res.data.key);
        navigate('/', { replace: true });
      }
    });
  };
  return (
    <div className="login flex flex-column">
      <div className="login-border">
        <div className="login-content flex flex-column">
          <div>
            name:{' '}
            <input
              placeholder="Enter Your name here"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
          </div>
          <div>
            password:{' '}
            <input
              placeholder="Enter Your password here"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </div>
          <button onClick={doLogin}>Login</button>
          <small>
            <b>NAME:</b>adminas <b>PASSWORD:</b>123
          </small>
          <small>
            No account? <a href="http://localhost:3000/sign-in">go</a>
          </small>
        </div>
      </div>
    </div>
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to="/login" replace />;
}

export default App;
