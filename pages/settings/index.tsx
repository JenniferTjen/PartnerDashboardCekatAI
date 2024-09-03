import { getSmtpList, createNewSmtp, deleteSmtp, editSmtp } from '@/store/smtpSlice';
import { updatePartner, getPartnerDetail } from '@/store/partnerSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import image from '../elements/images.png';
import ToggleButton from '../components/Toggle';
import IconEyeOpen from '@/components/Icon/IconEyeOpen';
import IconEyeClosed from '@/components/Icon/IconEyeClosed';
import IconSettings from '@/components/Icon/IconSettings';
import IconUser from '@/components/Icon/IconUser';
import blankImage from 'components/Icon/blankImage.png';
import { StaticImageData } from 'next/image';
import IconMenu from '@/components/Icon/IconMenu';
import { Button } from '@mantine/core';
import { toggleSidebar } from '@/store/themeConfigSlice';

const SMTP = [
    {
        id: 1,
        title: 'Name',
    },
    {
        id: 2,
        title: 'Host',
    },
    {
        id: 3,
        title: 'Port',
    },
    {
        id: 4,
        title: 'Secure',
    },
    {
        id: 5,
        title: 'User',
    },
    {
        id: 6,
        title: 'Actions',
    },
];

const banks = [
    { bank_code: "bca", bank_name: "PT. BANK CENTRAL ASIA TBK." },
    { bank_code: "mandiri", bank_name: "PT. BANK MANDIRI (PERSERO) TBK." },
    { bank_code: "bni", bank_name: "PT. BANK NEGARA INDONESIA (PERSERO)" },
    { bank_code: "bri", bank_name: "PT. BANK RAKYAT INDONESIA (PERSERO)" },
    { bank_code: "cimb", bank_name: "PT. BANK CIMB NIAGA TBK." },
];

type BankData = {
    name: string;
    url: string;
    show_billing: boolean;
    account_holder_name: string;
    account_number: string;
    bank_name: string;
    logo?: File;
};

const Settings = () => {
    const dispatch = useDispatch();

    const [profilePictureUrl, setProfilePictureUrl] = useState(image);
    const [smtp, setSmtp] = useState<any>({
        host: 'smtp.example.com',
        port: '587',
        user: 'user@example.com',
        name: 'Example SMTP',
    });
    const [bankData, setBankData] = useState<BankData>({
        name: 'John Doe',
        url: 'https://example.com',
        show_billing: true,
        account_holder_name: 'John Doe',
        account_number: '1234567890',
        bank_name: 'bca',
    });

    const [logo, setLogo] = useState<string | StaticImageData>(blankImage);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [smtpId, setSmtpId] = useState('1');

    const [isToggled, setIsToggled] = useState(true);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const [isUpdatingSmtp, setIsUpdatingSmtp] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [IsResettingBankAccount, setIsResettingBankAccount] = useState(false);
    const [isUpdatingBankAccount, setIsUpdatingBankAccount] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchSmtpList = async () => {
        // Simulating API call
        setSmtp({
            host: 'smtp.example.com',
            port: '587',
            user: 'user@example.com',
            name: 'Example SMTP',
        });
        setSmtpId('1');
    };

    const fetchBankAccount = async () => {
        // Simulating API call
        setBankData({
            name: 'John Doe',
            url: 'https://example.com',
            show_billing: true,
            account_holder_name: 'John Doe',
            account_number: '1234567890',
            bank_name: 'bca',
        });
        setLogo(blankImage);
        setIsToggled(true);
    };

    useEffect(() => {
        if (isToggled) {
            setBankData((bankData) => ({
                ...bankData,
                show_billing: true,
            }));
        } else {
            setBankData((bankData) => ({
                ...bankData,
                show_billing: false,
            }));
        }
    }, [isToggled]);

    useEffect(() => {
        fetchSmtpList();
        fetchBankAccount();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSmtp((smtp) => ({
            ...smtp,
            [e.target.name]: e.target.value,
        }));
    };

    const handleInputChangeBankAcc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBankData((bankData) => ({
            ...bankData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setLogo(reader.result as string);
                    setLogoFile(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdatingSmtp(true);
        // Simulating API call
        setTimeout(() => {
            setIsUpdatingSmtp(false);
            showMessage('SMTP updated successfully', 'success');
            fetchSmtpList();
        }, 1000);
    };

    const revertChanges = () => {
        setIsResetting(true);
        fetchSmtpList();
        setIsResetting(false);
    }

    const revertChangeBankAccount = () => {
        setIsResettingBankAccount(true);
        fetchBankAccount();
        setIsResettingBankAccount(false);
    }

    const handleDeleteSmtp = async (id: string) => {
        setIsDeleting(id);
        // Simulating API call
        setTimeout(() => {
            setIsDeleting(null);
            showMessage('SMTP deleted successfully', 'success');
            fetchSmtpList();
        }, 1000);
    };

    const handleSubmitBankAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdatingBankAccount(true);
        // Simulating API call
        setTimeout(() => {
            setIsUpdatingBankAccount(false);
            showMessage('Bank account updated successfully', 'success');
            fetchBankAccount();
        }, 1000);
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

    return (
        <div className="pt-5">
            <Button
                className="flex justify-center text-white bg-secondary rounded-full h-12 w-12 fixed z-[1000] left-7 bottom-8 shadow-md lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
            >
                {React.createElement(IconMenu)}
            </Button>
            <div className="flex justify-center mb-5 flex items-center mt-2">
                <div className="flex gap-3 items-center">
                    <span className="text-secondary">{React.createElement(IconSettings)}</span>
                    <h5 className="text-lg font-semibold dark:text-white-light">Settings</h5>
                </div>
            </div>

            <div className="flex flex-col w-full h-auto md:flex-row md:gap-7">
                <div className="panel md:w-5/12 mt-5 overflow-hidden border-0 p-6 rounded-xl shadow-md">
                    <div className="flex mb-7 font-semibold text-lg border-b-2 pb-2">
                        Bank Account
                    </div>
                    <form onSubmit={handleSubmitBankAccount} onReset={revertChangeBankAccount} className="w-full">
                        <div>
                            <label className="block text-sm font-medium mb-2 ml-1">
                                Name
                            </label>
                            <input
                                name="account_holder_name"
                                onChange={handleInputChangeBankAcc}
                                value={bankData?.account_holder_name}
                                className="form-input font-light ml-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 ml-1">
                                Account Number
                            </label>
                            <input
                                name="account_number"
                                onChange={handleInputChangeBankAcc}
                                value={bankData?.account_number}
                                className="form-input font-light ml-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 ml-1">
                                Bank Name
                            </label>
                            <select
                                name="bank_name"
                                onChange={handleInputChangeBankAcc}
                                value={bankData?.bank_name}
                                className="form-select font-light mt-1 ml-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-12"
                            >
                                {banks?.map((bank: any) => (
                                    <option key={bank.bank_code} value={bank?.bank_code}>{bank?.bank_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center gap-3">
                            <button
                                type="reset"
                                className="inline-flex rounded-md bg-transparent px-4 py-2 text-sm font-medium text-danger border-danger border-2 shadow-sm hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition-colors"
                            >
                                {IsResettingBankAccount ? 'Resetting...' : 'Cancel Changes'}
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdatingBankAccount}
                                className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isUpdatingBankAccount ? 'Updating...' : 'Update Info'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col bg-white w-full mt-5 overflow-hidden border-0 p-6 rounded-xl shadow-md gap-7">
                    <div className="flex font-semibold text-lg border-b-2 pb-2">
                        Profile Settings
                    </div>

                    <div className="flex">
                        <form onSubmit={handleSubmitBankAccount} onReset={revertChangeBankAccount} className="flex flex-col items-center md:flex-row w-full">
                            <div className="xl:w-4/12 md:w-7/12">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col w-full items-center gap-3 font-medium mb-5">
                                        <img
                                            src={logo ? logo : blankImage}
                                            alt="Profile"
                                            className="w-52 h-52 md:w-60 md:h-60 ring-offset-2 border-2 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            className="md:pl-4 w-auto text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-lg file:border-0
                               file:text-sm file:font-semibold
                               file:bg-secondary-light file:text-secondary
                               hover:file:bg-secondary-dark-light pb-7"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="w-full">
                                <div className="h-full w-full pr-3 flex flex-col justify-center">
                                    <div>
                                        <div>
                                            <div className="flex flex-col gap-2 pb-3 text-xl font-semibold">
                                                <div className="ml-1 text-sm font-medium">
                                                    Name
                                                </div>
                                                <input
                                                    name="name"
                                                    onChange={handleInputChangeBankAcc}
                                                    value={bankData.name}
                                                    className="block w-full font-light form-input font-regular ml-1 w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium ml-1">
                                                    URL
                                                </label>
                                                <input
                                                    type="url"
                                                    name="url"
                                                    onChange={handleInputChangeBankAcc}
                                                    value={bankData.url}
                                                    className="form-input font-light ml-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                                                />
                                            </div>
                                            <div className="flex gap-3 ml-1">
                                                <label className="block text-sm font-medium">
                                                    Show Billing
                                                </label>
                                                <button
                                                    onClick={handleToggle}
                                                    className={`font-semibold mb-7 rounded ${isToggled ? 'text-secondary' : 'text-gray-500'}`}
                                                >
                                                    {isToggled ? <IconEyeOpen /> : <IconEyeClosed />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-end">
                                    <button
                                        type="reset"
                                        className="inline-flex rounded-md bg-transparent px-4 py-2 text-sm font-medium text-danger border-danger border-2 shadow-sm hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition-colors"
                                    >
                                        {isCreating ? 'Updating...' : 'Cancel Changes'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {isCreating ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* SMTP Settings */}
            <div className="panel mt-5 overflow-hidden border-0 p-6 rounded-xl shadow-md mb-10">
                <div className="p-2">
                    <form onSubmit={handleSubmit} onReset={revertChanges} className="w-full">
                        <div className="flex mb-7 font-semibold text-lg border-b-2 pb-2">
                            SMTP Settings
                        </div>
                        <div className="flex flex-col md:flex-row first-line:w-full md:gap-10">
                            <div className="flex w-full flex-col">
                                <div>
                                    <label className="block text-sm font-medium mb-2 ml-1">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        onChange={handleInputChange}
                                        value={smtp?.name}
                                        className="form-input font-light ml-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 ml-1">
                                        Host
                                    </label>
                                    <input
                                        name="host"
                                        onChange={handleInputChange}
                                        value={smtp?.host}
                                        className="form-input font-light mt-1 ml-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 ml-1">
                                        Secure?
                                    </label>
                                    <span className="border-2 flex w-full p-2 px-3 rounded-md mb-5">
                                        {smtp?.secure ? 'YES' : 'NO'}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full">
                                <div>
                                    <label className="block text-sm font-medium mb-2 ml-1">
                                        Port
                                    </label>
                                    <input
                                        name="port"
                                        onChange={handleInputChange}
                                        value={smtp?.port}
                                        className="form-input font-light mt-1 ml-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 ml-1">
                                        User
                                    </label>
                                    <input
                                        name="user"
                                        onChange={handleInputChange}
                                        value={smtp?.user}
                                        className="form-input font-light mt-1 ml-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-5"
                                    />
                                </div>
                                <div className="mt-12 flex justify-end gap-3">
                                    <button
                                        type="reset"
                                        className="inline-flex rounded-md bg-transparent px-4 py-2 text-sm font-medium text-danger border-danger border-2 shadow-sm hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition-colors"
                                    >
                                        {isResetting ? 'Resetting...' : 'Cancel Changes'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdatingSmtp}
                                        className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {isUpdatingSmtp ? 'Updating...' : 'Update SMTP'}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </form>
                    {/* <table className="table-striped table-hover w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Host</th>
                                <th className="border px-4 py-2">Port</th>
                                <th className="border px-4 py-2">Secure</th>
                                <th className="border px-4 py-2">User</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {smtpList?.map((smtp: any, index: number) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{smtp?.name}</td>
                                    <td className="border px-4 py-2">{smtp?.host}</td>
                                    <td className="border px-4 py-2">{smtp?.port}</td>
                                    <td className="border px-4 py-2">{smtp?.secure ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2">{smtp?.user}</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteSmtp(smtp?.id)} disabled={isDeleting === smtp?.id}>
                                            {isDeleting === smtp?.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div >
    );
};

export default Settings;
