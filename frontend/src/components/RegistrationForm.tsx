import React, { useState } from "react";
import { Customer, RegistrationFormData } from "../Interface/Interface";


interface RegistrationFormProps {
    onRegistrationSubmit: (formData: RegistrationFormData) => void;
    closeRegistrationModal: () => void;
    selectedCustomer: Customer | null;
}


const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegistrationSubmit,
    closeRegistrationModal,
    selectedCustomer,
}) => {
    const initialFormData: RegistrationFormData = {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        name: "",
        customer: selectedCustomer ? selectedCustomer._id : "",
        duration: 30,
    };

    const [formData, setFormData] = useState<RegistrationFormData>(
        initialFormData
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegistrationSubmit(formData);
        closeRegistrationModal();
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <label>
                Data rozpoczęcia:
                <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Data zakończenia:
                <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Wybierz usługę:
                <select
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="registration-select"
                >
                    <option value="masaż">masaż</option>
                    <option value="piling">piling</option>
                </select>
            </label>
            <button type="submit" className="registration-button">
                Zapisz
            </button>
            <button
                type="button"
                onClick={closeRegistrationModal}
                className="registration-button"
            >
                Anuluj
            </button>
        </form>
    );
};

export default RegistrationForm;