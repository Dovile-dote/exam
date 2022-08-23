import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {
  const { masters } = useContext(BackContext);
  console.log(masters);

  return (
    <div className="flex flex-column">
      <h2>List of masters</h2>
      <ul>
        {masters
          ? masters.map((m) =>
              m.name ? <Line key={m.id} line={m}></Line> : null
            )
          : null}
      </ul>
    </div>
  );
}

export default List;
