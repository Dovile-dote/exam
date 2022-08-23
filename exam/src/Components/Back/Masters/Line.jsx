import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {
  const { setDeleteMaster, setModalMaster, services } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteMaster(line);
  };

  const handleEdit = () => {
    setModalMaster(line);
  };

  return (
    <li>
      <div className="flex">
        {' '}
        {line.photo ? (
          <div className="photo">
            <img src={line.photo} alt="img" />
          </div>
        ) : null}{' '}
        <div className="flex flex-column">
          <h2>
            {line.name} {line.surname}
          </h2>
          <p>{line.specialization}</p>
        </div>
        {services.map((s) =>
          s.id === line.service_id ? (
            <div className="flex flex-column info">
              Servisas: {s.title}
              <b>Miestas: {s.city}</b>
            </div>
          ) : null
        )}{' '}
        <div className="buttons">
          <button className="edit" type="button" onClick={handleEdit}>
            <svg>
              <use href="#edit" />
            </svg>
            edit
          </button>
          <button className="delete" type="button" onClick={handleDelete}>
            <svg>
              <use href="#delete" />
            </svg>
            delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
