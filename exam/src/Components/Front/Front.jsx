import { useEffect, useState } from 'react';
import axios from 'axios';
import FrontContext from './FrontContext';
import { authConfig } from '../../Functions/auth';
import MasterList from './Masters/List';

// function Front({ show }) { jeigu reikia navigacijos app.jsx per promta paduodam
function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createUser, setCreateUser] = useState(null);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [masters, setMasters] = useState(null);
  const [services, setservices] = useState(null);

  const signIn = () => {
    const data = { name, pass };
    setCreateUser(data);
    setName('');
    setPass('');
  };

  useEffect(() => {
    if (null === createUser) return;
    axios.post('http://localhost:3003/users', createUser).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createUser]);

  ////////////////read masters////////////
  // read masters
  useEffect(() => {
    axios
      .get('http://localhost:3003/masters', authConfig())
      .then((res) => setMasters(res.data));
  }, [lastUpdate]);
  //read services
  useEffect(() => {
    axios
      .get('http://localhost:3003/services', authConfig())
      .then((res) => setservices(res.data));
  }, [lastUpdate]);

  return (
    <FrontContext.Provider value={{ masters, services }}>
      {show === 'sign-in' ? (
        <div className="flex flex-column">
          <h2>
            Already have acount? <a href="http://localhost:3000/admin">Go!</a>
          </h2>
          <div>
            <div>
              <div className="flex flex-column create">
                <div>
                  name:{' '}
                  <input
                    placeholder="Enter Your name here"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <button onClick={signIn}>sign in</button>
              </div>
            </div>
          </div>
        </div>
      ) : show === 'front' ? (
        <div className="flex front">
          <MasterList />
        </div>
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
