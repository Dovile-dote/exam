import { useContext } from 'react';
import Line from './Line';
import FrontContext from '../FrontContext';

function List() {
  const { masters } = useContext(FrontContext);
  console.log(masters);

  return (
    <div>
      <h2>List of masters</h2>
      <ul>
        {masters
          ? masters.map((m) =>
              m.name !== null ? <Line key={m.id} line={m}></Line> : null
            )
          : null}
      </ul>
    </div>
  );
}

export default List;
