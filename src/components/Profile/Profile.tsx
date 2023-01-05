import Error from '~/utils/Error/Error';
import React from 'react';
import { API_BASE_URL } from '~/environments';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { createUser, UserProfileType } from '~/services/user/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CustomerFormType,
  newCustomerSchema,
  updateCustomerSchema,
} from '~/components/CustomerForm';
import { z } from 'zod';
import { TWO_CHARACTER } from '~/utils/common';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '~/services/profile/profile';
import ImageUpload from '~/components/ImageUpload';
type Props = {
  userData: UserProfileType;
};
type ProfileFormType = {
  first_name: string;
  last_name?: string;
  email?: string;
  avatar?: string;
};
const editProfileSchema = z.object({
  first_name: z.string().min(2, TWO_CHARACTER).nullable(),
  last_name: z.string().nullable().optional(),
  email: z.string().email('Please enter a valid Email address').optional(),
  avatar: z.any().nullable().optional(),
});

const Profile = ({ userData }: Props) => {
  const [imageLink, setImageLink] = React.useState('');
  const [uploadImage, setUploadImage] = React.useState('');
  const queryClient = useQueryClient();
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(editProfileSchema),
  });
  useEffect(() => {
    reset({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      email: userData?.email,
      avatar: userData?.avatar_thumb,
    });
  }, [reset, userData]);
  const { mutateAsync: updateMutateAsync } = useMutation(
    updateProfile().queryFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['self']);
      },
    },
  );
  const onSubmit = (data: ProfileFormType) => {
    toast.promise(
      updateMutateAsync({
        ...data,
      }),
      {
        loading: 'Updating Profile',
        success: 'Update Profile',
        error: 'Failed to create profile',
      },
    );
  };
  const userImageLinkFromApi = `${API_BASE_URL}${userData?.avatar_thumb}`;

  const onFileUpload = (e: any): void => {
    setValue('avatar', e);
  };

  return (
    <div>
      <form
        className="space-y-8 divide-y divide-gray-200 rounded bg-white px-12 py-8 shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div className="space-y-6 sm:space-y-5">
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

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Avatar
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="pb-6s flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-5">
                    <ImageUpload
                      imageLink={userImageLinkFromApi}
                      onChange={(e) => onFileUpload(e)}
                    />
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
export default Profile;
