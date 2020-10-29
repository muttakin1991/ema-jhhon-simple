import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
        const { register, handleSubmit, watch, errors } = useForm();
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const onSubmit = data => {
            console.log('form submitted', data);
        };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.exampleRequired && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
      {errors.exampleRequired && <span className="error">Email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your address" />
      {errors.exampleRequired && <span className="error">address is required</span>}
      
      <input name="phone number" ref={register({ required: true })} placeholder="Your phone number" />
      {errors.exampleRequired && <span className="error">Phone number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;