import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [isError, setIsError] = useState();
  const [formData, setformData] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/auth/register", formData)
      .then(function (response) {
        if (response.status === 201) {
          setIsError(null);
          setIsLoading(false);
          setResponse(response.data);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(error.response);
      });
  };

  const handleChange = async (event) => {
    let target = event.target;
    let value = target.value;

    setformData({ ...formData, [target.name]: value });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstname'>
          {" "}
          firstname
          <input
            onChange={handleChange}
            id='firstname'
            name='firstname'
            type='text'
            required
          />
        </label>
        <label htmlFor='lastname'>
          {" "}
          lastname
          <input
            onChange={handleChange}
            id='lastname'
            name='lastname'
            type='text'
            required
          />
        </label>
        <label htmlFor='email'>
          {" "}
          email
          <input
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
            required
          />
        </label>
        <label htmlFor='phoneNumber'>
          {" "}
          phoneNumber
          <input
            onChange={handleChange}
            id='phoneNumber'
            name='phoneNumber'
            type='number'
            required
          />
        </label>
        <label htmlFor='password'>
          {" "}
          password
          <input
            onChange={handleChange}
            id='password'
            name='password'
            type='password'
          />
        </label>
        <button type='submit'>Add user</button>
      </form>
      {isError && <div className='error'>{isError.data.message}</div>}
    </div>
  );
};

export default Register;
