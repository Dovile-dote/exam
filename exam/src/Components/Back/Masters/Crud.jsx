import Nav from '../Nav';
import Create from './Create';
import Edit from './Edit';
import List from './List';

function Crud() {
  return (
    <div className="back">
      <Nav />
      <div className="flex">
        <Create />
        <List />
        <Edit />
      </div>
    </div>
  );
}
export default Crud;
