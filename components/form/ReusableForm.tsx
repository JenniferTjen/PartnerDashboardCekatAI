import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReusableFormProps } from './types';
import CustomButton from '../CustomButton';
import worldDialCode from 'public/DialCode/worldDialCode.json';
import IconEyeOpen from '../Icon/IconEyeOpen';
import IconEyeClosed from '../Icon/IconEyeClosed';
import Image from 'next/image';

// Helper function to check if all form fields are empty
const areAllFieldsEmpty = (values) => {
    return Object.values(values).every((value) => {
        if (Array.isArray(value)) {
            return value.length === 0; // Check if the array is empty
        }
        return value === '' || value == null; // Check if the value is an empty string or null
    });
};

const Checkbox = ({ name, value, label }) => {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <div className="flex items-center">
                    <label className="inline-flex items-center">
                        <input
                            {...field}
                            type="checkbox"
                            checked={field.value.includes(value)}
                            onChange={() => {
                                const set = new Set(field.value);
                                if (set.has(value)) {
                                    set.delete(value);
                                } else {
                                    set.add(value);
                                }
                                form.setFieldValue(name, Array.from(set));
                                form.setFieldTouched(name, true);
                            }}
                        />
                        <span className="ml-2">{label}</span>
                    </label>
                </div>
            )}
        </Field>
    );
};

// Custom Password Field with show/hide toggle
const PasswordField = ({ name }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <Field name={name} type={showPassword ? 'text' : 'password'} placeholder="Password" className="form-input placeholder:text-white-dark" />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: 'absolute',
                    right: '10px',
                    alignSelf: 'center',
                    height: '100%',
                    cursor: 'pointer',
                }}
            >
                {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
            </button>
        </div>
    );
};

const PhoneField = ({ field }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Find the index of the Indonesian country code
    const indonesiaIndex = worldDialCode.findIndex((country) => country.dial_code === '+62');

    // Create country options array with labels
    const countryOptions = worldDialCode.map((country) => ({
        value: country,
        label: `${country.dial_code} ${country.flag} ${country.name} `,
    }));

    const handleBlur = () => {
        setIsExpanded(false);
    };

    const handleFocus = () => {
        setIsExpanded(true);
    };

    // Find the Indonesian option
    const indonesianOption = countryOptions.find(option => option.value.code === 'ID');

    return (
        <div className="flex flex-row">

            <Field as="select" name="country_code" className="form-input w-20 p-2" onBlur={handleBlur} onFocus={handleFocus}>
                <option key={indonesianOption.value.code} value={indonesianOption.value.dial_code}>
                    {isExpanded ? `${indonesianOption.value.flag} ${indonesianOption.value.dial_code} - ${indonesianOption.value.name}` : `${indonesianOption.value.flag} ${indonesianOption.value.dial_code}`}
                </option>
                {countryOptions.filter(option => option.value.code !== 'ID').map((option) => (

                    <option key={option.value.code} value={option.value.dial_code}>
                        {isExpanded
                            ? `${option.value.flag} ${option.value.dial_code} - ${option.value.name}`
                            : `${option.value.flag} ${option.value.dial_code}`}
                    </option>
                ))}
            </Field>
            <Field
                name="phone"
                placeholder={field.placeholder}
                className="form-input flex-grow placeholder:text-white-dark"
            />
        </div>
    );
};

// Reusable Form
const ReusableForm: React.FC<ReusableFormProps> = ({ initialValues, validationSchema, onSubmit, formFields, children, cancelButton, confirmButton }) => {
    const [filePreviews, setFilePreviews] = useState({});

    React.useEffect(() => {
        if (initialValues.file_url) {
            setFilePreviews({ ...filePreviews, file: initialValues.file_url });
        }
    }, [initialValues?.file_url]);

    const groupFieldsByComponent = (fields) => {
        return fields.reduce((acc, field) => {
            const { component } = field;
            if (!acc[component]) {
                acc[component] = [];
            }
            acc[component].push(field);
            return acc;
        }, {});
    };

    const groupedFields = groupFieldsByComponent(formFields);

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, values, errors }) => {
                const allFieldsEmpty = areAllFieldsEmpty(values) || Object.keys(errors).length > 0;

                return (
                    <Form>
                        {Object.keys(groupedFields).map((component) => {
                            const fields = groupedFields[component];
                            const outerDivClassName = fields[0]?.outerDivClassName || '';

                            return (
                                <div key={component} className={`mb-5 ${outerDivClassName} text-sm font-medium`}>
                                    {fields.map((field) => (
                                        <div key={field.name} className="mb-5 text-sm font-medium">
                                            <label htmlFor={field.name} className="text-sm font-medium">{field.label}</label>

                                            {(() => {
                                                if (field.component === 'select') {
                                                    return (
                                                        <Field as="select" name={field.name} disabled={field.disabled || isSubmitting} className={`${field.className} text-sm font-medium`}>
                                                            {field.options?.map((option) => (
                                                                <option key={option.value} value={option.value} className="text-sm font-medium">
                                                                    {option.key}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    );
                                                }

                                                if (field.component === 'checkbox') {
                                                    return (
                                                        <div className={`flex flex-wrap ${field.innerDivClassName} text-sm font-medium`}>
                                                            {field.options?.map((option) => (
                                                                <Checkbox key={option.value} name={field.name} value={option.value} label={option.key} />
                                                            ))}
                                                        </div>
                                                    );
                                                }

                                                if (field.component === 'password') {
                                                    return <PasswordField name="password" className="text-sm font-medium" />;
                                                }

                                                if (field.component === 'phone') {
                                                    return <PhoneField field={field} className="text-sm font-medium" />;
                                                }

                                                if (field.component === 'textarea') {
                                                    return <Field name={field.name} component="textarea" placeholder={field.placeholder} className={`${field.className} text-sm font-medium`} />;
                                                }

                                                if (field.component === 'input' && field.type === 'file') {
                                                    return (
                                                        <Field name={field.name}>
                                                            {({ field, form: { setFieldValue } }) => {
                                                                const handleFileChange = (event) => {
                                                                    const file = event.target.files?.[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setFilePreviews((prev) => ({
                                                                                ...prev,
                                                                                [field.name]: reader.result,
                                                                            }));
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                        setFieldValue(field.name, file);
                                                                    } else {
                                                                        setFilePreviews((prev) => {
                                                                            const newState = { ...prev };
                                                                            delete newState[field.name];
                                                                            return newState;
                                                                        });
                                                                        setFieldValue(field.name, null);
                                                                    }
                                                                };

                                                                const handleRemoveFile = () => {
                                                                    setFilePreviews((prev) => {
                                                                        const newState = { ...prev };
                                                                        delete newState[field.name];
                                                                        return newState;
                                                                    });
                                                                    setFieldValue(field.name, null);
                                                                };

                                                                return (
                                                                    <div className="font-medium">
                                                                        <input name={field.name} type="file" className={`${field.className} text-sm font-medium`} onChange={handleFileChange} accept="image/*" />
                                                                        {filePreviews[field.name] && (
                                                                            <div>
                                                                                <Image src={filePreviews[field.name]} alt="Preview" className="mt-2 h-full w-full font-medium" width={200} height={200} />
                                                                                <button type="button" onClick={handleRemoveFile} className="text-sm font-medium">
                                                                                    X
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Field>
                                                    );
                                                }

                                                return (
                                                    <Field
                                                        id={field.name}
                                                        name={field.name}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        disabled={field.disabled || isSubmitting}
                                                        className={`${field.className} font-medium`}
                                                    />
                                                );
                                            })()}

                                            <ErrorMessage name={field.name} component="div" className="text-sm text-red-500 font-medium" />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                        {children}

                        <div className="mt-5 flex items-center justify-end pt-3">
                            <CustomButton
                                onClick={cancelButton?.onClick}
                                className={`${cancelButton?.className} font-medium`}
                                type={cancelButton?.type}
                                text={cancelButton?.text}
                                disabled={cancelButton?.disabled || isSubmitting}
                                isLoading={cancelButton?.isLoading}
                            />
                            <CustomButton
                                className={`${confirmButton?.className} font-medium`}
                                type={confirmButton?.type}
                                text={confirmButton?.text}
                                disabled={confirmButton?.disabled || allFieldsEmpty || isSubmitting}
                                isLoading={confirmButton?.isLoading}
                            />
                        </div>
                    </Form>

                );
            }}
        </Formik>
    );
};

export default ReusableForm;