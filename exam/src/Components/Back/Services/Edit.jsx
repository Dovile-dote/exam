import { useEffect, useState, useContext } from 'react';
import BackContext from '../BackContext';

function Edit() {
  const { modalService, setEditService, setModalService } =
    useContext(BackContext);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (null === modalService) {
      return;
    }
    setTitle(modalService.title);
    setCity(modalService.city);
  }, [modalService]);

  const handleEdit = () => {
    const data = { title, city, id: modalService.id };
    setEditService(data);
    setModalService(null);
  };

  if (null === modalService) {
    return null;
  }

  return (
    <div className="editas">
      <div className="edito-content">
        <div className="edito-header">
          <h2>Edit</h2>
          <button
            type="button"
            className="close"
            onClick={() => setModalService(null)}
          >
            <span>&times;</span>
          </button>
        </div>
        <label>
          <b>Title:</b>
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>
          <b>City:</b>
        </label>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <div className="edito-footer">
          <button type="button" onClick={handleEdit}>
            Save changes
          </button>{' '}
          <button type="button" onClick={() => setModalService(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
