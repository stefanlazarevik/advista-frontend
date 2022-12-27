import Datepicker from 'react-tailwindcss-datepicker';
import UserTable from '~/components/UserTable';
import ProductActivity from '~/components/ProductActivity';
import ProductView from '~/components/ProductView';
import { isAdmin, isSuperUser } from '~/lib/auth/authlib';
import useUserHook from '~/hooks/user-hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserManagement = () => {
  const { data: UserData } = useUserHook();
  const router = useNavigate();
  const superuser = isSuperUser(UserData);
  const admin = isAdmin(UserData);
  useEffect(() => {
    if (!superuser && !admin) {
      router('/sign-in');
    }
  }, [superuser, admin]);

  const handleAddUser = () => {
    router('/user/add/');
  };

  return (
    <div className="py-10">
      <header>
        <div className="m mx-auto mb-2 flex max-w-7xl flex-wrap justify-center gap-4 px-4 sm:mb-0 sm:flex-nowrap sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              User List Management
            </h1>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="mt-4 justify-end sm:mt-0 sm:ml-16 sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => handleAddUser()}
            >
              Add user
            </button>
          </div>
          <div className="flex flex-col">
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserManagement;
