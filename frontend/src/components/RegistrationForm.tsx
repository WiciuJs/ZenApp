import React, { useState } from "react";
import { Customer, RegistrationFormData } from "../Interface/Interface";
import styles from '../styles/RegistrationForm.module.scss';

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
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date().toISOString().slice(0, 16),
        name: "",
        customer: selectedCustomer ? selectedCustomer._id : "",
        duration: 30,
    };

    const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

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
        <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.formGroup}>
                <label htmlFor="startDate" className={styles.label}>Data rozpoczęcia:</label>
                <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={styles.datetimeInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="endDate" className={styles.label}>Data zakończenia:</label>
                <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={styles.datetimeInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Wybierz usługę:</label>
                <select
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.registrationSelect}
                >
                    <option value="masaż">masaż</option>
                    <option value="piling">piling</option>
                </select>
            </div>
            <div className={styles.formActions}>
                <button type="submit" className={styles.registrationButton}>
                    Zapisz
                </button>
                <button
                    type="button"
                    onClick={closeRegistrationModal}
                    className={styles.cancelButton}
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;
