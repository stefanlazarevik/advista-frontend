import { DebouncedInput } from '~/components/DebouncedInput';
import React, { useEffect, useState } from 'react';
import useUserHook from '~/hooks/user-hooks';
import { isAdmin, isSuperUser } from '~/lib/auth/authlib';
import SignIn from '~/screens/SignIn';
import { clsx } from 'clsx';
import { flexRender } from '@tanstack/react-table';
import { HiChevronDown } from 'react-icons/hi';
import TotalReport from '~/components/TotalReport';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '~/services/productView/products';
import {
  deleteUser,
  getUserList,
  makeUserActive,
  UserProfileType,
} from '~/services/user/user';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import Model from '~/components/Model';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import UserProfile from '../../assets/avatar-1.jpg';
import { API_BASE_URL } from '~/environments';
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];

const userTableHeaderList: string[] = [
  'name',
  'email',
  'Active/InActive',
  'Actions',
];

const UserTable = () => {
  const router = useNavigate();
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [openDeletedModel, setOpenDeleteModel] = useState(false);
  const [delsubmit, setDelsubmit] = useState(false);
  const [selectUser, setSelectUser] = useState<number>();
  const { queryKey: userListKey, queryFn: userListFn } = getUserList({
    query: searchFilter,
  });
  const { data } = useQuery(userListKey, userListFn, {
    retry: 1,
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutateAsync } = useMutation(deleteUser().queryFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
  const userListData = data?.results;
  useEffect(() => {
    if (delsubmit && selectUser) {
      setDelsubmit(false);
      setOpenDeleteModel(false);
      toast.promise(deleteMutateAsync(selectUser), {
        loading: 'Deleting user',
        success: 'User deleted',
        error: 'Failed deleting user',
      });
    }
  }, [deleteMutateAsync, delsubmit, selectUser]);

  const handleEdit = (id: number | undefined) => {
    if (id) {
      router(`/user/edit/${id}`);
    }
  };

  const { mutateAsync: activeOrInactiveUserMutateAsync } = useMutation(
    makeUserActive().queryFn,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );

  const handleActiveOrInactive = (id: number, status: boolean) => {
    if (id === 0) {
      toast.error('Id no found');
      return;
    }
    toast.promise(activeOrInactiveUserMutateAsync({ id, status: !status }), {
      loading: 'Updating User',
      success: 'User Updated',
      error: 'Failed to update user',
    });
  };

  return (
    <div className="mt-2 flex flex-col">
      <section className="mt-2 mb-4 flex w-full">
        <div className="w-full">
          <label htmlFor="search-account" className="sr-only">
            Search
          </label>
          <DebouncedInput
            type="text"
            name="search-account"
            id="search-account"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            value={searchFilter ?? ''}
            onChange={(value) => setSearchFilter(String(value))}
          />
        </div>
      </section>
      <div className="mt- 2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    />
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Active/InActive
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" bg-white">
                  {userListData?.map((person: UserProfileType) => (
                    <tr
                      key={person.id}
                      className="odd:bg-gray-50 even:bg-white"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-700 sm:pl-6 ">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              person.avatar_thumb
                                ? `${API_BASE_URL}${person.avatar_thumb}`
                                : UserProfile
                            }
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-700 sm:pl-6">
                        <div className="flex items-center">
                          <div>
                            <div className=" text-sm text-slate-700">
                              {`${person.first_name} ${person.last_name}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{person.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-700">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap  px-3 py-4 text-sm">
                        <Switch
                          checked={person.is_active}
                          onChange={() => {
                            handleActiveOrInactive(
                              person.id ?? 0,
                              person.is_active ? true : false,
                            );
                          }}
                          className={classNames(
                            person.is_active ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                          )}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              person.is_active
                                ? 'translate-x-5'
                                : 'translate-x-0',
                              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                            )}
                          />
                        </Switch>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleEdit(person?.id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => {
                              setSelectUser(person?.id);
                              setOpenDeleteModel(true);
                            }}
                          >
                            Delete
                          </button>
                          <Model
                            title="Delete Account"
                            body=""
                            setSubmit={setDelsubmit}
                            visible={openDeletedModel}
                            setVisible={setOpenDeleteModel}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserTable;
