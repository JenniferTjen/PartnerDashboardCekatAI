// types.ts
import { ReactNode } from 'react';

export interface FormField {
  name: string;
  label: string;
  placeholder?: any;
  type?: string;
  component?: 'input' | 'select' | 'textarea' | 'phone' | 'password' | 'checkbox' | React.ComponentType<any> | React.ElementType;
  options?: Array<{ key: string; value: string }>;
  disabled?: boolean;
  // Any other properties that might be needed by custom components
  [key: string]: any;
}

export interface ReusableFormProps {
  initialValues: { [key: string]: any };
  validationSchema: any;
  onSubmit: (values: { [key: string]: any }) => Promise<void>;
  formFields: FormField[];
  isLoading?: boolean;
  children?: ReactNode; // To optionally include additional children like buttons
  cancelButton?: {
    onClick?: () => void;
    disabled: boolean;
    isLoading: boolean;
    text?: string;
    type?: string;
    className: string;
  };
  confirmButton?: {
    onClick?: () => void;
    disabled: boolean;
    isLoading: boolean;
    text?: string;
    type: string;
    className?: string;
  };
  
}
