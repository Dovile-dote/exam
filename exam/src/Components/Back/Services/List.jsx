import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {
  const { services } = useContext(BackContext);

  return (
    <div className="flex flex-column">
      <h2>List of Services</h2>
      <ul>
        {services
          ? services.map((s) => <Line key={s.id} line={s}></Line>)
          : null}
      </ul>
    </div>
  );
}

export default List;
