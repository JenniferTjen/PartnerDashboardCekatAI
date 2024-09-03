import IconLogout from '@/components/Icon/IconLogout';
import { clearAuthCookies } from '@/utils/auth';
import { supabase } from '@/utils/supabaseClient';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../Dropdown';
import { IRootState } from '@/store';

const isExpired = (dateString) => moment(dateString).isBefore(moment());

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [agentStatus, setAgentStatus] = useState<boolean>(false);
    const [toggleLoading, setToggleLoading] = useState<boolean>(false);

    const { user } = useSelector((state: IRootState) => state.partner);
    console.log(user);

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        clearAuthCookies();
        router.push('/login');
    };

    return (
        <header className={`z-40 `}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="dropdown flex shrink-0 ltr:ml-auto rtl:mr-auto">
                            <Dropdown
                                offset={[0, 8]}
                                btnClassName="relative group block"
                                button={
                                    <div className="hover:shadow-outline flex  items-center space-x-2 rounded-md p-1 text-left transition duration-150 ease-in-out hover:bg-gray-100">
                                        <img className="h-8 w-8 rounded-full object-cover saturate-50 hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="UserProfile" />
                                        <div className="flex flex-col justify-center">
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                }
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="h-10 w-10 rounded-md object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />

                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button onClick={signOutUser} className="!py-3 text-danger">
                                            <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
