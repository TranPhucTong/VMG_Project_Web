import React from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegistrationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>Last Name</label>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.lastName?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Password</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field }) => <input type="password" {...field} />}
        />
        <p>{errors.password?.message}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
