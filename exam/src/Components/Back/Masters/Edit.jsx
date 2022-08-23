import { useEffect, useState, useContext, useRef } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64';

function Edit() {
  const { services, modalMaster, setEditMaster, setModalMaster } =
    useContext(BackContext);
  console.log(modalMaster);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [service, setService] = useState('0');
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint, setDeletePhoto] = useState(null);

  useEffect(() => {
    if (null === modalMaster) {
      return;
    }
    setName(modalMaster.name);
    setSurname(modalMaster.surname);
    setSpecialization(modalMaster.specialization);
    // setService(
    //   services.filter((s) => modalMaster.service === s.title)[0]?.title ?? 0
    // );
    setService(modalMaster.service_id);
    setPhotoPrint(modalMaster.photo);
  }, [modalMaster]);

  const handleEdit = () => {
    const data = {
      name,
      surname,
      specialization,
      service_id: service,
      id: modalMaster.id,
      photo: photoPrint,
    };
    console.log(data);
    setEditMaster(data);
    setModalMaster(null);
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const handleDeletePhoto = () => {
    setDeletePhoto({ id: modalMaster.id });
    setModalMaster((p) => ({ ...p, photo: null }));
  };

  if (null === modalMaster) {
    return null;
  }

  return (
    <div className="editas">
      <div className="edito-content">
        <div className="edito-header">
          <h3>Edit</h3>
          <button
            type="button"
            className="close"
            onClick={() => setModalMaster(null)}
          >
            <span>&times;</span>
          </button>
        </div>
        {/* <h2>{type}</h2> */}
        <div>
          <label>EDIT name </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label>EDIT surname </label>
          <input
            type="text"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
          />
        </div>
        <div>
          <label>EDIT specialization </label>
          <input
            type="text"
            onChange={(e) => setSpecialization(e.target.value)}
            value={specialization}
          />
        </div>
        <div>
          <select
            value={service}
            onChange={(e) => setService(Number(e.target.value))}
          >
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
        </div>
        {photoPrint ? (
          <div className="photo">
            <img src={photoPrint} alt="img" />
          </div>
        ) : null}
        {/* <div> */}
        <p>Add new pfoto: </p>
        <input
          ref={fileInput}
          type="file"
          className="photo-input"
          onChange={doPhoto}
        />
        {/* </div> */}
        <div className="edito-footer">
          <button type="button" onClick={() => setModalMaster(null)}>
            Close
          </button>
          <button type="button" onClick={handleEdit}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
