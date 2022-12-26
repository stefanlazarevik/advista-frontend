import FormControl, { INPUT_CLASS } from '~/components/FormControl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { z } from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUpMutation } from '~/services/auth/auth';
const signUpSchema = z.object({
  username: z.string().min(1, 'Please enter a valid username'),
  password: z.string().min(1, 'Please enter a valid password'),
  confirm_password: z.string().min(1, 'Please enter a confirm password'),
  email: z.string().email('Please enter a valid email'),
});
type signUpForm = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutateAsync } = useMutation(signUpMutation().queryFn, {
    onSuccess: () => {
      router('/sign-in');
    },
  });
  const onSubmit = (data: signUpForm) => {
    toast.promise(
      mutateAsync(data),
      {
        loading: 'Signing up user',
        success: 'Successfully signed up user',
        error: (err) => err.response.data.message.toString(),
      },
      {
        id: 'sign-up',
      },
    );
  };
  return (
    <div className="bg-slate-100">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
          <p className="mt-5 text-center">
            Please fill in this form to create an account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                inputId="username"
                label="User Name"
                errorMessage={errors?.username?.message}
              >
                <input
                  id="username"
                  type="text"
                  required
                  className={INPUT_CLASS}
                  {...register('username')}
                />
              </FormControl>

              <div>
                <FormControl
                  inputId="email"
                  label="Email"
                  errorMessage={errors?.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="current-password"
                    className={INPUT_CLASS}
                    {...register('email')}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  inputId="password"
                  label="Password"
                  errorMessage={errors?.password?.message}
                >
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className={INPUT_CLASS}
                    {...register('password')}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  inputId="confirm_password"
                  label="Confirm Password"
                  errorMessage={errors?.confirm_password?.message}
                >
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className={INPUT_CLASS}
                    {...register('confirm_password')}
                  />
                </FormControl>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full transform justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition-all  ease-in-out hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
