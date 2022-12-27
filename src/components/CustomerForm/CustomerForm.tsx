import { useParams } from 'react-router-dom';
import {
  createUser,
  getUserById,
  updateUser,
  UserProfileType,
} from '~/services/user/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Error from '~/utils/Error';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { API_BASE_URL } from '~/environments';
type Props = {
  mode: string;
};
export type CustomerFormType = {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  avatar?: string;
  user_mode?: number | string;
};
const TWO_CHARACTER = 'Must be at least 2 characters';
export const messageCharacter = (num: number) =>
  `Must be at least ${num} characters`;
export const newCustomerSchema = z
  .object({
    username: z.string().min(2, TWO_CHARACTER),
    first_name: z.string().min(2, TWO_CHARACTER).nullable(),
    last_name: z.string().min(2, TWO_CHARACTER).nullable().optional(),
    email: z.string().email(),
    password: z.string().min(8, messageCharacter(8)),
    confirm_password: z.string().min(8, messageCharacter(8)),
    avatar: z.any().nullable().optional(),
    user_mode: z.number().min(1).max(2),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: 'Password and confirm password must match',
    path: ['confirm_password'],
  });
export const updateCustomerSchema = z.object({
  username: z.string().min(2, TWO_CHARACTER),
  first_name: z.string().min(2, TWO_CHARACTER).nullable(),
  last_name: z.string().min(2, TWO_CHARACTER).nullable(),
  avatar: z.any().nullable(),
  user_mode: z.number().min(1).max(2),
});
const CustomerForm = ({ mode }: Props) => {
  const [userMode, setUserMode] = useState(false);
  const router = useNavigate();
  const { id }: any = useParams();
  console.log('id', id);
  const { data } = useQuery({ ...getUserById(id), enabled: mode === 'edit' });
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormType>({
    defaultValues: {
      user_mode: 1,
    },
    resolver: zodResolver(
      mode === 'create' ? newCustomerSchema : updateCustomerSchema,
    ),
  });
  useEffect(() => {
    if (data && mode === 'edit') {
      const { user_mode } = data;
      reset({
        ...data,
        user_mode: Number(user_mode),
      });
      if (user_mode === '2') {
        setUserMode(true);
      }
    }
  }, [data, mode, reset]);

  const { mutateAsync: createMutateAsync } = useMutation(createUser().queryFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      router('/user/list');
    },
  });
  const { mutateAsync: updateMutateAsync } = useMutation(
    updateUser(id).queryFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        router('/user/list');
      },
    },
  );
  const onSubmit = (data: any) => {
    data.avatar = data.avatar !== null ? data.avatar[0] : null;
    console.log(data);
    if (mode === 'create') {
      toast.promise(
        createMutateAsync({
          ...data,
          user_mode: data?.user_mode != null ? data?.user_mode : 1,
        }),
        {
          loading: 'Creating user',
          success: 'Creating user',
          error: 'Failed to create user',
        },
      );
    } else {
      const { password, confirm_password, email, ...rest } = data;
      toast.promise(updateMutateAsync(rest), {
        loading: 'Updating user',
        success: 'Updating user',
        error: 'Failed to update user',
      });
    }
  };
  const hanadleError = (error: any) => {
    console.log('error', error);
  };
  useEffect(() => {
    setValue('user_mode', userMode ? 2 : 1);
  }, [setValue, userMode]);

  return (
    <div>
      <form
        className="space-y-8 divide-y divide-gray-200 rounded bg-white px-12 py-8 shadow"
        onSubmit={handleSubmit(onSubmit, hanadleError)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Username
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    id="username"
                    autoComplete="given-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    {...register('username')}
                  />
                  {errors?.username?.message ? (
                    <Error text={errors.username.message} />
                  ) : null}
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  First Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    {...register('first_name')}
                  />
                  {errors?.first_name?.message ? (
                    <Error text={errors.first_name.message} />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Last Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    {...register('last_name')}
                  />
                  {errors?.last_name?.message ? (
                    <Error text={errors.last_name.message} />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email Address
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register('email')}
                  />
                  {errors?.email?.message ? (
                    <Error text={errors.email.message} />
                  ) : null}
                </div>
              </div>

              {mode === 'create' ? (
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Password
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="password"
                      id="password"
                      autoComplete="family-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      {...register('password')}
                    />
                    {errors?.password?.message ? (
                      <Error text={errors.password.message} />
                    ) : null}
                  </div>
                </div>
              ) : null}
              {mode === 'create' ? (
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="password"
                      id="confirm_password"
                      autoComplete="family-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      {...register('confirm_password')}
                    />
                  </div>
                  {errors?.confirm_password?.message ? (
                    <Error text={errors.confirm_password.message} />
                  ) : null}
                </div>
              ) : null}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Avatar
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="pb-6s flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5">
                    <div className="space-y-1 text-center">
                      {mode === 'edit' && data?.avatar_thumb !== null ? (
                        <img
                          src={`${API_BASE_URL}${data?.avatar_thumb}`}
                          alt="profile pic"
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            {...register('avatar')}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
            <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
              <div className="pt-6 sm:pt-5">
                <div role="group" aria-labelledby="label-email">
                  <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                    <div>
                      <div
                        className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                        id="label-email"
                      >
                        Is Admin
                      </div>
                    </div>
                    <div className="mt-4 sm:col-span-2 sm:mt-0">
                      <div className="max-w-lg space-y-4">
                        <div className="relative flex items-start">
                          <div className="flex h-5 items-center">
                            <Switch
                              checked={userMode}
                              onChange={setUserMode}
                              className={classNames(
                                userMode ? 'bg-indigo-600' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                              )}
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  userMode ? 'translate-x-5' : 'translate-x-0',
                                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                )}
                              />
                            </Switch>
                            {errors?.user_mode?.message ? (
                              <Error text={errors.user_mode.message} />
                            ) : null}
                          </div>
                          {/*<div className="ml-3 text-sm">*/}
                          {/*  <label*/}
                          {/*    htmlFor="comments"*/}
                          {/*    className="font-medium text-gray-700"*/}
                          {/*  >*/}
                          {/*    Comments*/}
                          {/*  </label>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => router('/user/list')}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CustomerForm;
