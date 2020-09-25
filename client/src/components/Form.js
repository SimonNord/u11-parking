import React from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState(initialState);
  const [state, setstate] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    response = await axios.post();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstname'>
          <input onChange={handleChange} id='firstname' type='text' required />
        </label>
        <label htmlFor='lastname'>
          <input onChange={handleChange} id='lastname' type='text' required />
        </label>
        <label htmlFor='email'>
          <input onChange={handleChange} type='email' id='email' required />
        </label>
        <label htmlFor='phoneNumber'>
          <input
            onChange={handleChange}
            id='phoneNumber'
            type='number'
            required
          />
        </label>
        <label htmlFor='password'>
          <input onChange={handleChange} id='password' type='password' />
        </label>
      </form>
    </div>
  );
};

export default Form;
