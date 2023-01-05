import Profile from '~/components/Profile';
import CustomerForm from '~/components/CustomerForm';
import React from 'react';
import { getUserProfile } from '~/services/user/user';
import useUserHook from '~/hooks/user-hooks';

const ViewProfile = () => {
  const { data: UserData } = useUserHook();
  return (
    <div className="py-10">
      <header>
        <div className="m mx-auto mb-2 flex max-w-7xl flex-wrap justify-center gap-4 px-4 sm:mb-0 sm:flex-nowrap sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Your Profile
            </h1>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            {UserData && <Profile userData={UserData} />}
          </div>
        </div>
      </main>
    </div>
  );
};
export default ViewProfile;
