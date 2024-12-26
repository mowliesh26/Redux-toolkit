import { useDispatch } from 'react-redux';
import { login } from '../slice/authSlics';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => {
    dispatch(login());
    navigate('/form');
  };

  return (
    <div className='container'>
      {isLoggedIn ? (
        <p>You are already logged in. <button className='btn btn-sm btn-primary my-3 'onClick={() => navigate('/form')}>Go to Form</button></p>
      ) : (
        <button className='btn btn-sm btn-primary my-3' onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default LoginPage;
