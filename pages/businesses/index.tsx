import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { createNewBusiness, getBusinessData, getPartnerDetail } from '@/store/partnerSlice';
import IconUsers from '@/components/Icon/IconUsers';
import IconDollarSign from '@/components/Icon/IconDollarSign';
import IconLaptop from '@/components/Icon/IconLaptop';
import IconMenuApps from '@/components/Icon/Menu/IconMenuApps';
import Swal from 'sweetalert2';
import { supabase } from '../../utils/supabaseClient';
import { FormField } from '@/components/form/types';
import { registerValidationSchema } from '@/components/form/formValidationSchema';
import ReusableForm from '@/components/form/ReusableForm';
import { Dialog, Transition } from '@headlessui/react';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import IconMenuMore from '@/components/Icon/Menu/IconMenuMore';
import IconMenu from '@/components/Icon/IconMenu';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { Button } from '@mantine/core';

type IBusinessData = {
  businessCount: number;
  revenue: number;
  activeBusinessCount: number;
};

type BusinessData = {
  business_name: string,
  name: string,
  email: string,
  password: string,
  country_code: number,
  phone: number,
};

type SortOrder = 'asc' | 'desc' | 'custom';
type SortKey = 'name' | 'createdAt' | 'package';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateBusinessModalOpen, setIsCreateBusinessModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleLocalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(searchQuery);
    }
  };

  const dispatch = useDispatch();

  const [businessData, setBusinessData] = useState<IBusinessData>({
    businessCount: 87,
    revenue: 1234567,
    activeBusinessCount: 76,
  });

  const registerFormFields: FormField[] = [
    {
      name: "business_name",
      label: "Business Name",
      type: "text",
      placeholder: "Business Name",
      className: 'form-input placeholder:text-white-dark'
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      className: 'form-input placeholder:text-white-dark'
    },
    {
      name: "phone",
      label: "Phone Number",
      component: 'phone',
      placeholder: '8123456789',
      className: 'form-input placeholder:text-white-dark flex-grow'
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "name@example.com",
      className: 'form-input placeholder:text-white-dark'
    },
    {
      name: "password",
      label: "Password",
      component: "password",
      className: 'form-input placeholder:text-white-dark'
    },
  ]

  const [businessList, setBusinessList] = useState<any>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [filteredList, setFilteredList] = useState<any>(businessList);
  const [search, setSearch] = useState<string>('');
  const [profileName, setProfileName] = useState<any>({
    name: 'John Doe',
    url: '',
    show_billing: false,
    account_holder_name: '',
    account_number: '',
    bank_name: '',
  });

  const initialValues = {
    business_name: '',
    name: '',
    email: '',
    password: '',
    country_code: '+62',
    phone: 0,
  };

  const searchBusiness = useCallback(() => {
    const searchLower = search.toLowerCase();

    setCurrentPage(1)

    let searchFilteredData = businessList.filter((item: any) => {
      const name = item?.name?.toLowerCase() || '';
      const phoneNum = item?.phone_num || '';
      const email = item?.email?.toLowerCase() || '';

      return (
        name.includes(searchLower) ||
        phoneNum.includes(searchLower) ||
        email.includes(searchLower)
      );
    });

    searchFilteredData.sort((a: any, b: any) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === 'createdAt') {
        return sortOrder === 'asc'
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortKey === 'package') {
        const packageOrder = ['free', 'pro', 'business', 'enterprise'];
        const indexA = packageOrder.indexOf(a.package_type);
        const indexB = packageOrder.indexOf(b.package_type);

        return sortOrder === 'asc'
          ? indexA - indexB
          : indexB - indexA;
      }
      return 0;
    });

    setFilteredList(searchFilteredData);
  }, [businessList, search, sortKey, sortOrder]);

  const fetchBusinessData = async () => {
    // Simulating API call with dummy data
    const dummyData = Array.from({ length: Math.floor(Math.random() * 100) + 1 }, (_, index) => ({
      id: index + 1,
      name: `Business ${index + 1}`,
      phone_num: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: `business${index + 1}@example.com`,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      package_type: ['free', 'pro', 'business', 'enterprise'][Math.floor(Math.random() * 4)],
      is_expired: Math.random() < 0.2,
      total_used_chat_credit_per_month: Math.floor(Math.random() * 1000),
    }));

    setBusinessList(dummyData);
    setFilteredList(dummyData);
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  useEffect(() => {
    searchBusiness();
  }, [search, searchBusiness]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = event.target.value.split(':');
    setSortKey(key as SortKey);
    setSortOrder(order as SortOrder);
  };

  const submitForm = async (values) => {
    setIsCreating(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsCreating(false);
      setIsCreateBusinessModalOpen(false);
      fetchBusinessData();
      showMessage('Business created successfully');
    }, 2000);
  };

  const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      customClass: { container: 'toast' },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(filteredList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="relative flex min-h-screen flex-col gap-6 px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-10 lg:py-14">
      {/* Summary Section */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 lg:flex-row">
        <div className='flex'>
        <Button
                className="flex justify-center text-white bg-secondary rounded-full h-12 w-12 fixed z-[1000] left-7 bottom-8 shadow-md lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
            >
                {React.createElement(IconMenu)}
            </Button>


          <div className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-semibold w-full lg:w-96">
            Hello {profileName.name} 👋🏻
          </div>
        </div>
        <div className="flex flex-col w-full h-auto shadow-md rounded-3xl bg-white">
          <div className="flex flex-col lg:flex-row md:w-full h-auto lg:h-32">
            <div className="flex flex-1 flex-row items-center justify-center gap-3 border-b lg:border-r-2 border-stone-200 p-5">
              <div className="flex bg-warning-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
                <IconUsers className="text-warning w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="w-1/2">
                <h2 className="text-xs sm:text-sm md:text-base">Registered Business</h2>
                <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">{businessData?.businessCount}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-3 border-b lg:border-r-2 border-stone-200 p-5">
              <div className="flex bg-success-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
                <IconDollarSign className="text-success w-8 h-8 lg:w-12 lg:h-12" />
              </div>
              <div className="w-1/2">
                <h2 className="text-xs sm:text-sm md:text-base">Revenue</h2>
                <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">IDR {businessData?.revenue}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-3 p-5">
              <div className="flex bg-primary-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
                <IconLaptop className="text-primary w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="w-1/2">
                <h2 className="text-xs sm:text-sm md:text-base">Active Businesses</h2>
                <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">{businessData?.activeBusinessCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Table */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col lg:flex-row mb-4 sm:mb-6 justify-between md:items-center gap-5">
          <div className="flex items-center gap-5 md:w-full lg:w-auto justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold">All Business</h2>
              <span className="text-xs text-success">Active Members</span>
            </div>
            <button
              className="px-4 py-2 rounded-lg hover:text-white hover:bg-secondary hover:shadow-md border-2 border-secondary text-secondary bg-transparent transition-colors duration-300"
              onClick={() => { setIsCreateBusinessModalOpen(true) }}
            >
              Add Business
            </button>
          </div>
          <div className="flex gap-4 sm:w-full lg:w-5/12">
            <input
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleLocalInputChange}
              onKeyDown={handleKeyDown}
            />
            <select
              onChange={handleSortChange}
              className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="name:asc">Sort by Name (A-Z)</option>
              <option value="name:desc">Sort by Name (Z-A)</option>
              <option value="createdAt:asc">Sort by Creation Date (Oldest)</option>
              <option value="createdAt:desc">Sort by Creation Date (Newest)</option>
              <option value="package:asc">Sort by Package (Free to Enterprise)</option>
              <option value="package:desc">Sort by Package (Enterprise to Free)</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse text-left text-xs">
            <thead>
              <tr className="text-xs font-light">
                <th className="border-b py-2">Business Name</th>
                <th className="border-b py-2">Phone Number</th>
                <th className="border-b py-2">Email</th>
                <th className="border-b py-2">Created At</th>
                <th className="border-b py-2">Subscription</th>
                <th className="border-b py-2">Status</th>
                <th className="border-b py-2">Used Chat Credit This month</th>
                <th className="border-b py-2">Impersonate User</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((business: any, index: number) => (
                <tr key={index}>
                  <td className="border-b py-2">{business.name}</td>
                  <td className="border-b py-2">{business.phone_num}</td>
                  <td className="border-b py-2">{business.email}</td>
                  <td className="border-b py-2">{new Date(business.created_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td className="border-b py-2">
                    <span
                      className={`
                          border-2 px-2 py-1 rounded-md text-xs sm:text-sm
                          ${business.package_type === 'free' ? 'bg-success-light text-success border-success' :
                          business.package_type === 'enterprise' ? 'bg-secondary-light text-secondary border-secondary' :
                            business.package_type === 'business' ? 'bg-warning-light text-warning border-warning' :
                              business.package_type === 'pro' ? 'bg-primary-light text-primary border-primary' :
                                'bg-gray-300 text-gray-700 border-gray-500'
                        }
                        `}
                    >
                      {business.package_type}
                    </span>
                  </td>
                  <td className="border-b py-2">
                    <span className={`
                          border-2 px-2 py-1 rounded-md text-xs sm:text-sm
                          ${business.is_expired ? 'bg-danger-light text-danger border-danger' : 'bg-success-light text-success border-success'}
                        `}>
                      {business.is_expired ? 'Expired' : 'Active'}
                    </span>
                  </td>
                  <td className="border-b py-2 w-72">
                    <span className="w-56">{business.total_used_chat_credit_per_month}</span>
                  </td>
                  <td className="border-b py-2">
                    <a href={`http://chat.cekat.ai/impersonate?impersonate=${business.email}`} target="_blank" rel="noopener noreferrer">
                      <button className='bg-white text-primary border-2 border-primary rounded-full p-2 w-28 text-xs sm:text-sm'>
                        Impersonate
                      </button>
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Transition appear show={isCreateBusinessModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsCreateBusinessModalOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="mb-7 text-lg font-medium leading-6 text-gray-900 pb-4 border-b-2">
                      Add New Business
                    </Dialog.Title>
                    <ReusableForm
                      initialValues={initialValues}
                      formFields={registerFormFields}
                      onSubmit={submitForm}
                      validationSchema={registerValidationSchema}
                      confirmButton={{
                        disabled: !!isCreating,
                        isLoading: !!isCreating,
                        type: "submit",
                        text: !!isCreating ? 'Signing up, please wait...' : 'Sign Up',
                        className: 'btn btn-primary w-full font-bold'
                      }}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>


        {/* Pagination Controls */}
        <div className="mt-4 flex w-full justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Previous
          </button>
          <div className="my-2 sm:my-0">
            Page {currentPage} of {pageNumbers}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
