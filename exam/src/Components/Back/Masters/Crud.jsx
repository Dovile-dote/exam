import Nav from '../Nav';
import Create from './Create';
import Edit from './Edit';
import List from './List';

function Crud() {
  return (
    <div>
      <Nav />
      <Create />
      <List />
      <Edit />
    </div>
  );
}
export default Crud;
