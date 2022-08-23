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
    <li className="flex">
      <h3>{line.title}</h3>
      <p>{line.city}</p>
      <div className="buttons">
        <button className="edit" type="button" onClick={handleEdit}>
          <svg>
            <use href="#edit" />
          </svg>
        </button>
        <button className="delete" type="button" onClick={handleDelete}>
          <svg>
            <use href="#delete" />
          </svg>
        </button>
        {/* )} */}
      </div>
    </li>
  );
}

export default Line;
