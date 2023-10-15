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
    name: string;
    customer: Customer;
    _id: string;
  }
  export interface RegistrationFormData {
    startDate: string;
    endDate: string;
    name: string;
    customer: string;
    duration: number;
  }
  