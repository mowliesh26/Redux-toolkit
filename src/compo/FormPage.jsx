import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser, editUser } from '../slice/userSlice';

function FormPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: userToEdit, index } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    gender: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

 
  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const validate = () => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required.';
    if (!formData.role) validationErrors.role = 'Role is required.';
    if (!formData.experience || isNaN(formData.experience)) {
      validationErrors.experience = 'Experience must be a valid number.';
    }
    if (!formData.gender) validationErrors.gender = 'Gender is required.';
    if (!formData.image) validationErrors.image = 'Image is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (userToEdit) {
        dispatch(editUser({ index, userData: formData }));  
      } else {
        dispatch(addUser(formData)); 
      }
      navigate('/cards');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] ? URL.createObjectURL(files[0]) : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({ ...errors, [name]: '' });  
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role"
          required
        />
        {errors.role && <div className="error">{errors.role}</div>}
      </div>
      <div>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Experience"
          required
        />
        {errors.experience && <div className="error">{errors.experience}</div>}
      </div>
      <div>
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
        />
        {errors.image && <div className="error">{errors.image}</div>}
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleInputChange}
            checked={formData.gender === 'male'}
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleInputChange}
            checked={formData.gender === 'female'}
          />{' '}
          Female
        </label>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <button onClick={handleSubmit}>
        {userToEdit ? 'Update' : 'Submit'}
      </button>
    </div>
  );
}

export default FormPage;
