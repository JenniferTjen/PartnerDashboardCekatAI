import React, { useEffect, useState, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import DateTimePicker from '../components/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import Loading from '../components/loading';
import IconSettings from '@/components/Icon/IconSettings';
import IconMail from '@/components/Icon/IconMail';
import IconChatNotification from '@/components/Icon/IconChatNotification';
import IconMenu from '@/components/Icon/IconMenu';
import IconBell from '@/components/Icon/IconBell';
import IconPlus from '@/components/Icon/IconPlus';
import IconSend from '@/components/Icon/IconSend';
import { Button } from '@mantine/core';
import { toggleSidebar } from '@/store/themeConfigSlice';

interface ITabProps {
    id: number;
    title: string;
    value: string;
}

interface BroadcastData {
    subject: string;
    content: string;
    delay_time: number | null;
}

const TABS = [
    {
        id: 1,
        title: 'Email Templates',
        value: 'email-template',
        logo: IconMenu,
    },
    {
        id: 2,
        title: 'Email Broadcasts',
        value: 'email-broadcast',
        logo: IconMail,
    },
    {
        id: 3,
        title: 'Whatsapp Broadcasts',
        value: 'whatsapp-broadcast',
        logo: IconChatNotification,
    },
];

const getCategoryGradient = (category: string) => {
    switch (category) {
        case 'BILLING_EXPIRED':
            return 'radial-gradient(circle at right, rgba(231,81,90,0.5) 0%, rgba(255,255,255,0) 20%)';
        case 'SIGNUP':
            return 'radial-gradient(circle at right, rgba(67,97,238,0.5) 0%, rgba(255,255,255,0) 20%)';
        case 'FEW_DAYS_AFTER_BILLING_EXPIRED':
            return 'radial-gradient(circle at right, rgba(226,160,63,0.5) 0%, rgba(255,255,255,0) 20%)';
        case 'BILLING_ALMOST_EXPIRED':
            return 'radial-gradient(circle at right, rgba(128,93,202,0.5) 0%, rgba(255,255,255,0) 20%)';
        default:
            return 'radial-gradient(circle at left, rgba(255,255,255,0) 0%, rgba(255,0,150,0.1) 100%)';
    }
};

const getCategory = (category: string) => {
    switch (category) {
        case 'BILLING_EXPIRED':
            return "Billing Expired";
        case 'SIGNUP':
            return "Sign Up";
        case 'FEW_DAYS_AFTER_BILLING_EXPIRED':
            return "Days After Billing Expired";
        case 'BILLING_ALMOST_EXPIRED':
            return "Billing Almost Expired";
        default:
            return "Null";
    }
}

const getColor = (category: string) => {
    switch (category) {
        case 'BILLING_EXPIRED':
            return '#e7515a';
        case 'SIGNUP':
            return '#4361ee';
        case 'FEW_DAYS_AFTER_BILLING_EXPIRED':
            return '#e2a03f';
        case 'BILLING_ALMOST_EXPIRED':
            return '#805dca';
        default:
            return "Null";
    }
}

const Broadcasts = () => {
    const dispatch = useDispatch();

    const [chosenTemplate, setChosenTemplate] = useState<any>(null);
    const [selectedTab, setSelectedTab] = useState<ITabProps>(TABS[0]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emailTemplate, setEmailTemplate] = useState<any>([
        { id: 1, subject: 'Welcome Email', content: 'Welcome to our service!', category: 'SIGNUP' },
        { id: 2, subject: 'Billing Reminder', content: 'Your bill is due soon.', category: 'BILLING_ALMOST_EXPIRED' },
        { id: 3, subject: 'Expired Notice', content: 'Your subscription has expired.', category: 'BILLING_EXPIRED' },
    ]);
    const [emailHistory, setEmailHistory] = useState<any>([
        { id: 1, subject: 'March Newsletter', content: 'Check out our latest updates!', scheduled_at: '2023-03-15T10:00:00Z' },
        { id: 2, subject: 'April Promotion', content: 'Don\'t miss our special offer!', scheduled_at: '2023-04-01T09:00:00Z' },
    ]);
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        delay_time: '',
    });
    const [formEditData, setFormEditData] = useState({
        subject: '',
        content: '',
        delay_time: '',
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isScheduling, setIsScheduling] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
    const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);
    const [templateFormData, setTemplateFormData] = useState({
        subject: '',
        content: '',
        category: 'SIGNUP',
    });
    const [templateEditData, setTemplateEditData] = useState({
        id: "",
        subject: '',
        content: '',
        category: '',
    });
    const [broadcastData, setBroadcastData] = useState({
        delay_time: null,
        subject: '',
        content: '',
    });
    const [emailEditData, setEmailEditData] = useState({
        id: "",
        subject: '',
        content: '',
    });
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [selectedEditTemplate, setSelectedEditTemplate] = useState<any>(null);
    const [selectedEmail, setSelectedEmail] = useState<any>(null);
    const [waTemplateList, setWaTemplateList] = useState<any>([
        { wa_template_id: 'template1', name: 'Welcome Message', body: 'Welcome, {{1}}!', body_placeholder: ['Name'] },
        { wa_template_id: 'template2', name: 'Order Confirmation', body: 'Your order #{{1}} has been confirmed.', body_placeholder: ['Order Number'] },
    ]);
    const [waFormData, setWaFormData] = useState<any>({
        wa_template_id: '',
        variables: [],
        delay_time: '',
    });

    const toggleTabs = (tab: ITabProps) => {
        setSelectedTab(tab);
    };

    const handleCardClick = (template) => {
        setSelectedEditTemplate(template);
        setTemplateEditData({
            id: template.id,
            subject: template.subject,
            content: template.content,
            category: template.category,
        });
        setIsEditModalOpen(true);
    };

    const fetchEmailBroadcastHistory = async () => {
        // Simulating API call
        setEmailHistory([
            { id: 1, subject: 'March Newsletter', content: 'Check out our latest updates!', scheduled_at: '2023-03-15T10:00:00Z' },
            { id: 2, subject: 'April Promotion', content: 'Don\'t miss our special offer!', scheduled_at: '2023-04-01T09:00:00Z' },
            { id: 3, subject: 'Customer Survey', content: 'We value your feedback!', scheduled_at: '2023-04-15T14:00:00Z' },
        ]);
    };

    const fetchTemplateList = async () => {
        // Simulating API call
        setWaTemplateList([
            { wa_template_id: 'template1', name: 'Welcome Message', body: 'Welcome, {{1}}!', body_placeholder: ['Name'] },
            { wa_template_id: 'template2', name: 'Order Confirmation', body: 'Your order #{{1}} has been confirmed.', body_placeholder: ['Order Number'] },
            { wa_template_id: 'template3', name: 'Appointment Reminder', body: 'Reminder: Your appointment is on {{1}} at {{2}}.', body_placeholder: ['Date', 'Time'] },
        ]);
    };

    const fetchEmailTemplates = async () => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            setEmailTemplate([
                { id: 1, subject: 'Welcome Email', content: 'Welcome to our service!', category: 'SIGNUP' },
                { id: 2, subject: 'Billing Reminder', content: 'Your bill is due soon.', category: 'BILLING_ALMOST_EXPIRED' },
                { id: 3, subject: 'Expired Notice', content: 'Your subscription has expired.', category: 'BILLING_EXPIRED' },
                { id: 4, subject: 'Reactivation Offer', content: 'Special offer to reactivate your account!', category: 'FEW_DAYS_AFTER_BILLING_EXPIRED' },
            ]);
            setIsLoading(false);
        }, 1000);
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setEmailEditData({
            id: email.id,
            subject: email.subject,
            content: email.content,
        });
        setIsEmailModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (selectedTab.value === 'email-template') {
            setTemplateFormData({
                ...templateFormData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (selectedTab.value === 'email-template') {
            setTemplateEditData({
                ...templateEditData,
                [name]: value,
            });
        } else {
            setFormEditData({
                ...formEditData,
                [name]: value,
            });
        }
    };

    const handleBroadcastInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const theTemplate = emailTemplate?.find((template: any) => template.subject === value);
        setChosenTemplate(theTemplate);

        if (selectedTab.value === 'email-broadcast') {
            setBroadcastData({
                ...broadcastData,
                subject: theTemplate.subject,
                content: theTemplate.content,
            });
        } else {
            setFormData({
                ...formEditData,
                [name]: value,
            });
        }
    };

    const broadcastContent = (template) => {
        if (chosenTemplate?.content) {
            return (
                <div className="font-light text-sm rounded-lg border-2 p-4">
                    {chosenTemplate.content}
                </div>)
        } else {
            return (<div className="text-xs font-light italic text-stone-500">
                Select a template to view its content
            </div>)
        }
    }

    const handleWaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
        const { name, value } = e.target;

        if (name === 'variables' && index !== undefined) {
            const updatedVariables = [...waFormData.variables];
            updatedVariables[index] = value;

            let updatedBody = selectedTemplate.body;
            selectedTemplate.body_placeholder.forEach((placeholder, i) => {
                updatedBody = updatedBody.replace(`{{${i + 1}}}`, updatedVariables[i] || `{{${i + 1}}}`);
            });

            const finalBody = updatedVariables.every((v) => v === '') ? selectedTemplate.body : updatedBody;

            setWaFormData({
                ...waFormData,
                variables: updatedVariables,
            });

            setSelectedTemplate({
                ...selectedTemplate,
                dynamicBody: finalBody,
            });
        } else if (name === 'delay_time') {
            setWaFormData({
                ...waFormData,
                delay_time: value,
            });
        }
    };

    const handleTemplateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTemplateId = e.target.value;
        const template = waTemplateList.find((t) => t.wa_template_id === selectedTemplateId);
        setSelectedTemplate(template);

        const initialVariables = template.body_placeholder?.length > 0 ? new Array(template.body_placeholder.length).fill('') : [];

        setWaFormData({
            ...waFormData,
            wa_template_id: selectedTemplateId,
            variables: initialVariables,
        });
    };

    const extractDate = (isoStr: string): string => {
        const date = new Date(isoStr);
        return date.toISOString().split('T')[0];
    }

    const extractTime = (isoStr: string | undefined): string => {
        if (!isoStr) return '';
        const date = new Date(isoStr);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleSendWhatsapp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showMessage('WhatsApp broadcast scheduled successfully');
            setSelectedTemplate(null);
            setWaFormData({
                wa_template_id: '',
                variables: [],
                delay_time: '',
            });
        } catch (error) {
            showMessage('Failed to send WhatsApp broadcast', 'error');
        }
    };

    const handleCreateEmailTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showMessage('Successfully created a new email template');
            setIsModalOpen(false);
            setTemplateFormData({
                subject: '',
                content: '',
                category: 'SIGNUP',
            });
            fetchEmailTemplates();
        } catch (error) {
            showMessage('Failed to create email template', 'error');
        } finally {
            setIsCreating(false);
            setSelectedTemplate(null);
        }
    };

    const handleDateTimeChange = (dateTime: Date | null) => {
        const currentTime = Date.now(); // Current time in milliseconds
        const selectedTime = dateTime ? dateTime.getTime() : null;

        const delay_time = selectedTime !== null ? selectedTime - currentTime : null;

        setBroadcastData({
            ...broadcastData,
            delay_time: delay_time,
        });
    };

    const handleWhatsappDateTimeChange = (dateTime: Date | null) => {
        const currentTime = Date.now(); // Current time in milliseconds
        const selectedTime = dateTime ? dateTime.getTime() : null;

        const delay_time = selectedTime !== null ? selectedTime - currentTime : null;

        setWaFormData({
            ...waFormData,
            delay_time: delay_time,
        });
    };

    const handleEditEmailTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(true);
        try {
            const response = await dispatch<any>(updateEmailTemplate(templateEditData)).unwrap();
            showMessage('Successfully updated an email template');
            setIsModalOpen(false);
            setTemplateFormData({
                subject: '',
                content: '',
                category: 'SIGNUP', // Default value for category
            });
            fetchEmailTemplates();
        } catch (error) {
            showMessage('Failed to update email template', 'error');
        } finally {
            setIsEditing(false);
            setSelectedTemplate(null);
        }
    };

    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsScheduling(true);
        try {
            const response = await dispatch<any>(sendBroadcastEmail(broadcastData)).unwrap();
            showMessage(response?.message);
            setIsBroadcastModalOpen(false);
            fetchEmailBroadcastHistory();
        } catch (error) {
            showMessage('Failed to send email', 'error');
        }
        setIsScheduling(false);
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

    useEffect(() => {
        fetchEmailTemplates();
        fetchTemplateList();
        fetchEmailBroadcastHistory();
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedTemplate(null);
        }
    }, [isModalOpen]);

    useEffect(() => {
        fetchEmailBroadcastHistory();
    }, [dispatch]);

    return (
        <div>
            <Button
                className="flex justify-center text-white bg-secondary rounded-full h-12 w-12 fixed z-[1000] left-7 bottom-8 shadow-md lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
            >
                {React.createElement(IconMenu)}
            </Button>
            <div className="pt-5">
                <div>
                    <ul className="flex items-center justify-center mb-5 overflow-y-auto whitespace-nowrap border-[#ebedf2] font-medium dark:border-[#191e3a] sm:flex pb-3">

                        <div className="bg-white shadow-md p-3 rounded-2xl sm:rounded-lg flex flex-col sm:flex-row w-full sm:w-auto mx-3 sm:mx-0">
                            {TABS?.map((tab: any) => (
                                <div key={tab?.id} className="">
                                    <div
                                        onClick={() => toggleTabs(tab)}
                                        className={`flex sm:flex-row gap-3 items-center justify-center h-full border-b border-transparent p-4 hover:bg-stone-200 hover:rounded-md hover:text-primary ${selectedTab?.value === tab?.value
                                            ? 'text-white bg-secondary rounded-lg font-semibold'
                                            : ''
                                            }`}
                                    >
                                        <span>
                                            {React.createElement(tab?.logo)}
                                        </span>
                                        <span className="text-xs w-full h-auto break-words text-center">
                                            {tab?.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </ul>
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="panel mt-5 overflow-hidden border-0 p-7 lg:p-10 mx-2 lg:mx-10 rounded-3xl">
                        {selectedTab.value === 'email-template' && (
                            <>
                                <div className="flex sm:flex-row flex-col w-full mb-4 sm:mb-6 justify-between items-center pb-6 border-b-2">
                                    <div className="flex flex-col w-full lg:justify-center text-lg pb-5 sm:pb-0">
                                        <span className="font-semibold">Email Templates</span>
                                        <span className="text-xs text-success">Created Templates</span>
                                    </div>
                                    <button
                                        className="btn btn-info w-full sm:w-40 gap-3 bg-secondary border-secondary shadow-md"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <div>{React.createElement(IconPlus)}</div>
                                        <div className="w-full">Add New</div>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {emailTemplate?.map((template: any) => (
                                        <div
                                            key={template?.id}
                                            className="flex flex-col w-full bg-white shadow-md rounded-2xl p-6"
                                            style={{ background: getCategoryGradient(template?.category) }}
                                            onClick={() => handleCardClick(template)}
                                        >
                                            <div className="flex flex-col sm:flex-row w-full items-center gap-1 sm:gap-4 mb-4">
                                                <div className="font-medium text-lg">
                                                    {template?.subject}
                                                </div>
                                                <div
                                                    className="text-gray-500 text-xs flex items-center border-2 rounded-full px-2 mb-2 md:mb-0"
                                                    style={{
                                                        color: getColor(template?.category),
                                                        borderColor: getColor(template?.category),
                                                    }}
                                                >
                                                    {getCategory(template?.category)}
                                                </div>
                                            </div>
                                            <div className="text-gray-700 w-full sm:w-7/12 h-auto">
                                                {template?.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {selectedTab.value === 'email-broadcast' && (
                            <div>
                                <div className="flex flex-col sm:flex-row mb-4 sm:mb-6 justify-between sm:items-center pb-6 border-b-2">
                                    <div className="flex flex-col w-full lg:justify-center text-lg pb-5 sm:pb-0">
                                        <span className="font-semibold">Email Broadcast</span>
                                        <span className="text-xs text-success">Scheduled Emails</span>
                                    </div>
                                    <button
                                        className="btn btn-info w-full sm:w-40 gap-3 bg-secondary border-secondary shadow-md"
                                        onClick={() => setIsBroadcastModalOpen(true)}
                                    >
                                        <div>{React.createElement(IconPlus)}</div>
                                        <div>Add New</div>
                                    </button>
                                </div>
                                <div>
                                    {emailHistory?.map((email: any) => (
                                        <div
                                            key={email.id}
                                            className="flex flex-col w-full bg-white border-b-2 pb-9 p-6"
                                            onClick={() => handleEmailClick(email)}
                                        >
                                            <div className="flex w-full items-center gap-4 mb-4">
                                                <div className="font-medium text-lg">
                                                    {email?.subject}
                                                </div>
                                            </div>

                                            <div className="flex sm:flex-row flex-col justify-between">
                                                <span className="text-gray-700 w-full sm:w-7/12 sm:pb-0 pb-5">{email?.content}</span>
                                                <div className="flex items-center gap-8">
                                                    <div className="flex flex-col font-regular">
                                                        <span>{extractDate(email?.scheduled_at)}</span>
                                                        <span>{extractTime(email?.scheduled_at)} WIB</span>
                                                    </div>
                                                    <span className="text-secondary">{React.createElement(IconSend)}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTab.value === 'whatsapp-broadcast' && (
                            <div className="p-6">
                                <h2 className="mb-4 text-lg font-semibold">Send WhatsApp Broadcast</h2>
                                <form onSubmit={handleSendWhatsapp}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Template</label>
                                        <select
                                            name="wa_template_id"
                                            value={waFormData.wa_template_id}
                                            onChange={handleTemplateSelect}
                                            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="" disabled>Select Template</option>
                                            {waTemplateList.map((template) => (
                                                <option key={template.wa_template_id} value={template.wa_template_id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedTemplate && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Message Body</label>
                                                <div className="rounded-md bg-gray-100 p-2 h-auto break-words">
                                                    {selectedTemplate.dynamicBody || selectedTemplate.body}
                                                </div>
                                            </div>

                                            {selectedTemplate.body_placeholder?.length > 0 &&
                                                selectedTemplate.body_placeholder.map((placeholder: string, index: number) => (
                                                    <div className="mb-4" key={index}>
                                                        <input
                                                            type="text"
                                                            name="variables"
                                                            value={waFormData.variables[index] || ''}
                                                            onChange={(e) => handleWaInputChange(e, index)}
                                                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            placeholder={`Enter value for ${placeholder}`}
                                                        />
                                                    </div>
                                                ))}
                                        </>
                                    )}

                                    <div className="mb-4">
                                        <div>
                                            <DateTimePicker onDateTimeChange={handleWhatsappDateTimeChange} />                                    </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Send WhatsApp Broadcast
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {/* Create New Email Template Modal */}
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
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
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b-2">
                                            New Email Template
                                        </Dialog.Title>
                                        <form className="flex flex-col gap-5" onSubmit={handleCreateEmailTemplate}>
                                            <div className="mt-2 pt-3">
                                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={templateFormData.subject}
                                                    onChange={handleInputChange}
                                                    className="form-input mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                                <textarea
                                                    name="content"
                                                    value={templateFormData.content}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="form-input mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2 pb-14">
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    name="category"
                                                    value={templateFormData.category}
                                                    onChange={handleInputChange}
                                                    className="form-select mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                >
                                                    <option value="SIGNUP">SIGNUP</option>
                                                    <option value="FEW_DAYS_AFTER_BILLING_EXPIRED">FEW_DAYS_AFTER_BILLING_EXPIRED</option>
                                                    <option value="BILLING_ALMOST_EXPIRED">BILLING_ALMOST_EXPIRED</option>
                                                    <option value="BILLING_EXPIRED">BILLING_EXPIRED</option>
                                                </select>
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={isCreating}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    {isCreating ? 'Creating...' : 'Create Template'}
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Edit Template Modal */}
                <Transition appear show={isEditModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
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
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b-2">
                                            Edit Email Template
                                        </Dialog.Title>
                                        <form className="flex flex-col gap-5" onSubmit={handleEditEmailTemplate}>
                                            <div className="mt-2 pt-3">
                                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={templateEditData.subject}
                                                    onChange={handleEditInputChange}
                                                    className="form-input mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                                <textarea
                                                    name="content"
                                                    value={templateEditData.content}
                                                    onChange={handleEditInputChange}
                                                    rows={4}
                                                    className="form-input mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2 pb-14">
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    name="category"
                                                    value={templateEditData.category}
                                                    onChange={handleEditInputChange}
                                                    className="form-select mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                >
                                                    <option value="SIGNUP">SIGNUP</option>
                                                    <option value="FEW_DAYS_AFTER_BILLING_EXPIRED">FEW_DAYS_AFTER_BILLING_EXPIRED</option>
                                                    <option value="BILLING_ALMOST_EXPIRED">BILLING_ALMOST_EXPIRED</option>
                                                    <option value="BILLING_EXPIRED">BILLING_EXPIRED</option>
                                                </select>
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={false}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    {isEditing ? 'Updating...' : 'Update Template'}
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Add Email Broadcast Modal */}
                <Transition appear show={isBroadcastModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsBroadcastModalOpen(false)}>
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
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b-2">
                                            Schedule Email Broadcast
                                        </Dialog.Title>
                                        <form className="flex flex-col gap-5" onSubmit={handleSendEmail}>
                                            <div className="mt-2 pb-5 pt-3 border-b-2">
                                                <label className="block text-sm font-medium text-gray-700">Template</label>
                                                <select
                                                    name="template"
                                                    value={broadcastData.template}
                                                    onChange={handleBroadcastInputChange}
                                                    className="form-select mt-1 block w-full font-light rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    required
                                                >
                                                    {emailTemplate?.map((template: any, index: number) => (
                                                        <option key={index}>
                                                            {template.subject}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                {broadcastContent(broadcastData.template)}
                                            </div>

                                            <div>
                                                <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={false}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    {isScheduling ? 'Scheduling...' : 'Schedule Email'}
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default Broadcasts;
