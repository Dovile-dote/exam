import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {
  const { setDeleteService, setModalService } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteService(line);
  };

  const handleEdit = () => {
    setModalService(line);
  };

  return (
    <li>
      <h3>{line.title}</h3>
      <p>{line.city}</p>
      <div className="buttons">
        <button className="edit" type="button" onClick={handleEdit}>
          <svg>
            <use href="#edit" />
          </svg>
          edit
        </button>
        {/* {line.total ? (
          <div className="clothes-count">
            You have: <span>{line.total}</span> item in this categorie.
          </div>
        ) : ( */}
        <button className="delete" type="button" onClick={handleDelete}>
          <svg>
            <use href="#delete" />
          </svg>
          delete
        </button>
        {/* )} */}
      </div>
    </li>
  );
}

export default Line;
