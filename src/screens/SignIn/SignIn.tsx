import FormControl from '../../components/FormControl/FormControl';
import { INPUT_CLASS } from '~/components/FormControl';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { signIn } from '~/services/auth/auth';
import { setTokenInfo } from '~/lib/auth/authlib';
const loginInSchema = z.object({
  username: z.string().min(1, 'Please enter a valid username'),
  password: z.string().min(1, 'Please enter a valid password'),
});
type LoginInForm = z.infer<typeof loginInSchema>;
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInForm>({
    resolver: zodResolver(loginInSchema),
  });
  const router = useNavigate();
  const { mutateAsync } = useMutation(signIn().queryFn, {
    onSuccess: (data) => {
      console.log('data-->', data);
      setTokenInfo(data);
      router('/');
    },
  });
  const onSubmit = (data: LoginInForm) => {
    toast.promise(mutateAsync(data), {
      loading: 'Signing in user',
      success: 'Successfully signed in user',
      error: 'Failed to sign in user',
    });
  };
  return (
    <div className="bg-slate-100">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                inputId="username"
                label="Email address"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full transform justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-500 to-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition-all  ease-in-out hover:from-indigo-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
              <div>
                <p>
                  Don’t have an account?{' '}
                  <Link
                    to="/sign-up"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
