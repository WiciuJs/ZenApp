export interface Customer {
  _id: string;
  name: string;
  surname: string;
  age: number;
  comments: string;
  mail: string;
  phoneNumber: string;
}

export interface CustomerEditProps {
  customer: Customer;
  onSave: (editedCustomer: Customer) => void;
  onCancel: () => void;
}

export interface CustomerFormProps {
  onCustomerAdded: (newCustomer?: Customer) => void;
  initialCustomer?: Customer;
  customerToEdit?: Customer;
}

export interface ActionCustomerProps {
  onCustomerAdded: (newCustomer: Customer) => void;
}

export interface Product {
  _id: string;
  name: string;
}

export interface Supplier {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  nip?: string;
}

export interface Registration {
  startDate: string;
  endDate: string;
  duration: number;
  treatment: Treatment;
  customer: Customer;
  _id: string;
}
export interface RegistrationFormData {
  startDate: string;
  endDate: string;
  treatment: string;
  customer: string;
  duration: number;
}

export interface Treatment {
  _id: string;
  massage: string;
  price: number;
  time: string;
}

export interface RegistrationFormProps {
  onRegistrationSubmit: (formData: RegistrationFormData) => void;
  closeRegistrationModal: () => void;
  selectedCustomer: Customer | null;
  treatments: Treatment[];
}