import * as Yup from 'yup';

export const templateValidationSchema = Yup.object().shape({
    name: Yup.string().required('*Template Name is required'),
    inbox_id: Yup.string().required('*Inbox is required'),
    category: Yup.string().required('*Category is required'),
    language: Yup.string().required('*Language is required'),
    template_body_value: Yup.string().required('*Template Body is required'),
    file: Yup.string().notRequired(),
});

export const campaignValidationSchema = Yup.object().shape({
    name: Yup.string().required('Campaign name is required'),
    sender: Yup.string().required('Sender is required'),
    // ... add other fields
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('*Invalid email address').required('*Email is required'),
    password: Yup.string().required('*Password is required'),
});

export const registerValidationSchema = Yup.object().shape({
    business_name: Yup.string().required('*Business Name is required'),
    name: Yup.string().required('*Name is required'),
    email: Yup.string().email('*Invalid email address').required('*Email is required'),
    password: Yup.string().min(6, '*Password must be at least 6 characters').max(12, '*Password must be at most 12 characters').required('*Password is required'),
    phone: Yup.string().required('*Phone Number is required'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email('*Invalid email address').required('*Email is required'),
});

export const updatePasswordValidationSchema = Yup.object().shape({
    password: Yup.string().min(6, '*Password must be at least 6 characters').max(12, '*Password must be at most 12 characters').required('*Password is required'),
});

export const addAgentValidationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    email: Yup.string().email('*Invalid email address').required('*Email is required'),
    password: Yup.string().min(6, '*Password must be at least 6 characters').max(12, '*Password must be at most 12 characters').required('*Password is required'),
});

export const addDivisionValidationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    agents_ids: Yup.array().of(Yup.string().required('Agent ID is required')).min(1, 'At least one agent must be selected').required('Selected agents is required'),
});

export const UpdateContactValidationSchema = Yup.object().shape({
    display_name: Yup.string().required('*Name is required'),
});

export const addChatbotValidationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    prompt: Yup.string().required('*Prompt is required'),
    plugin_type: Yup.string().required('*Type is required'),
});
