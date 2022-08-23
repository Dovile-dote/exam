import { useContext } from 'react';
import FrontContext from '../FrontContext';

function Line({ line }) {
  const { setDeleteMaster, setModalMaster, services } =
    useContext(FrontContext);

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
        )}
      </div>
    </li>
  );
}

export default Line;
