import BlankLayout from '@/components/Layouts/BlankLayout';
import ReusableForm from '@/components/form/ReusableForm';
import { loginValidationSchema } from '@/components/form/formValidationSchema';
import { FormField } from '@/components/form/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';

const LoginBoxed = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const router = useRouter();

    const submitForm = async (values) => {
        setIsLoading(true);
        const email = values?.email;
        const password = values?.password;

        try {
            // Dummy login logic
            if (email === 'test@mail.com' && password === '123456') {
                // Simulate successful login
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
                await router.push('/home');
            } else {
                showMessage('Invalid email/password', 'error');
            }
        } catch (err) {
            console.log(err, 'err');
        } finally {
            setIsLoading(false);
        }
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, []);

    const { t, i18n } = useTranslation();

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const loginFormField: FormField[] = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            className: 'form-input placeholder:text-white-dark',
            placeholder: 'name@example.com',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            component: 'password',
            className: 'form-input',
            placeholder: '******',
        },
    ];

    const initialValues = {
        email: '',
        password: '',
    };

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-10 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[870px] rounded-md bg-white p-2">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-10 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                        <div className="mx-auto mb-5 flex w-full max-w-[440px] flex-col">
                            <div className="mb-7 flex flex-col items-start">
                                <Image src={`/assets/images/cekat3.png`} alt="cekat logo" width={100} height={100} style={{ height: 'auto', width: 'auto' }} className="mb-2" priority />
                                <p className="text-2xl font-extrabold !leading-snug text-primary md:text-2xl">Welcome back!</p>
                            </div>
                            <ReusableForm
                                initialValues={initialValues}
                                formFields={loginFormField}
                                onSubmit={submitForm}
                                validationSchema={loginValidationSchema}
                                confirmButton={{
                                    disabled: !!isLoading,
                                    isLoading: !!isLoading,
                                    text: !!isLoading ? 'Signing In...' : 'Sign In',
                                    type: 'submit',
                                    className: 'btn btn-primary w-full font-bold',
                                }}
                            >
                            </ReusableForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
LoginBoxed.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default LoginBoxed;
