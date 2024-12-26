import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';  

function CardPage() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };

  const handleEdit = (index) => {
    const user = users[index];
    navigate('/form', { state: { user, index } });  
  };

  return (
    <div className="card-container">
      {users.map((user, index) => (
        <div key={index} className="card">
          <img src={user.image} alt="Profile" className="card-image" />
          <div className="card-content">
            <h3>{user.name}</h3>
            <p>Role: {user.role}</p>
            <p>Experience: {user.experience} years</p>
            <p>Gender: {user.gender}</p>
          </div>
          <div className="card-actions">
            <button onClick={() => handleEdit(index)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => handleDelete(index)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardPage;
