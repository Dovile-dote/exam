import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {
  const { setCreateService } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');

  const handleCreate = () => {
    const data = { title, city };
    setCreateService(data);
    setTitle('');
    setCity('');
  };

  return (
    <div className="flex flex-column create">
      <h2>Create new Service</h2>

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Add title here"
      />
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="Add city here"
      />
      <button type="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default Create;
