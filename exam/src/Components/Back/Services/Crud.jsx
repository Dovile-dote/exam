import Nav from '../Nav';
import Edit from './Edit';
import List from './List';

function Crud() {
  return (
    <div className="back">
      <Nav />
      <List />
      <Edit />
    </div>
  );
}
export default Crud;
