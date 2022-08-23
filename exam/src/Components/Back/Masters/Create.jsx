import { useContext, useState, useRef } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateMaster, services } = useContext(BackContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [service, setService] = useState('0');
  // photos
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const handleCreate = () => {
    const data = { name, surname, specialization, service, photo: photoPrint };
    console.log(data);
    setCreateMaster(data);
    setName('');
    setSurname('');
    setSpecialization('');
    setService('0');
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="create flex flex-column">
      <h2>Create new Master</h2>
      {/* <div className="selectai"> */}
      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="0">Select service</option>
        {services
          ? services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
                {s.city}
              </option>
            ))
          : null}
      </select>

      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Add name"
      />
      <input
        type="text"
        onChange={(e) => setSurname(e.target.value)}
        value={surname}
        placeholder="Add surname"
      />
      <input
        type="text"
        onChange={(e) => setSpecialization(e.target.value)}
        value={specialization}
        placeholder="Add specialization"
      />

      {/* <div> */}
      <h3>ADD Photo</h3>

      <input
        className="photo-input"
        ref={fileInput}
        type="file"
        onChange={doPhoto}
      />

      {photoPrint ? (
        <div className="photo">
          <img src={photoPrint} alt="img" />
        </div>
      ) : null}
      <button type="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default Create;
