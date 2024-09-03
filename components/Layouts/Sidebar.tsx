import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconMenuChat from '@/components/Icon/Menu/IconMenuChat';
import IconOpenBook from '@/components/Icon/IconOpenBook';
import IconUsersGroup from '@/components/Icon/IconUsersGroup';
import IconLogout from '../Icon/IconLogout';
import IconInbox from '../Icon/IconInbox';
import IconTag from '../Icon/IconTag';
import IconMenuChatbot from '../Icon/Menu/IconMenuChatbot';
import IconDollarSignCircle from '../Icon/IconDollarSignCircle';
import { clearAuthCookies } from '@/utils/auth';
import IconMessage from '../Icon/IconMessage';
import IconReply from '../Icon/IconReply';
import { supabase } from '@/utils/supabaseClient';
import IconSettings from '../Icon/IconSettings';
import IconChart from '../Icon/IconChart';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconHome from '../Icon/IconHome';
import IconBook from '../Icon/IconBook';

// dataArray is data from db
const dataArray = [
    { id: 1, platform: 'wasap' },
    { id: 2, platform: 'tokped' },
    { id: 3, platform: 'shopee' },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        clearAuthCookies();
        router.push('/login');
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('Cekat.AI')}</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-medium">
                            {/* DASHBOARD */}
                            <li className="menu nav-item">
                                <Link href="/home" className={`${currentMenu === 'home' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('home')}>
                                    <div className="flex items-center">
                                        <IconHome className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Home')}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="menu nav-item">
                                <Link href="/businesses" className={`${currentMenu === 'businesses' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('businesses')}>
                                    <div className="flex items-center">
                                        <IconBook className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Businesses')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/broadcasts" className={`${currentMenu === 'broadcasts' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('broadcasts')}>
                                    <div className="flex items-center">
                                        <IconMenuApps className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Broadcasts')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/settings" className={`${currentMenu === 'settings' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('settings')}>
                                    <div className="flex items-center">
                                        <IconSettings className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Partner Settings')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`nav-link group w-full`} onClick={signOutUser}>
                                    <div className="flex items-center">
                                        <IconLogout className="shrink-0 rotate-90 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Logout')}</span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
