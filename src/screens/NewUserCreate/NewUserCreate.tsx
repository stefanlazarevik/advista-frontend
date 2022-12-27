import CustomerForm from '~/components/CustomerForm';
import UserTable from '~/components/UserTable';
import React from 'react';

const NewUserCreate = () => {
  return (
    <div className="py-10">
      <header>
        <div className="m mx-auto mb-2 flex max-w-7xl flex-wrap justify-center gap-4 px-4 sm:mb-0 sm:flex-nowrap sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Add New User
            </h1>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <CustomerForm mode="create" />;
          </div>
        </div>
      </main>
    </div>
  );
};
export default NewUserCreate;
