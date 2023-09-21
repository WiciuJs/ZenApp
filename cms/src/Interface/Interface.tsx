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
    onCustomerAdded: (newCustomer: Customer) => void;
    initialCustomer?: Customer; 
    customerToEdit?: Customer;
  }

export interface ActionCustomerProps {
    onCustomerAdded: (newCustomer: Customer) => void;
}