import React, { useState } from "react";
import { RegistrationFormData, Treatment, Customer, RegistrationFormProps } from "../Interface/Interface";
import styles from '../styles/RegistrationForm.module.scss';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegistrationSubmit,
    closeRegistrationModal,
    selectedCustomer,
    treatments
}) => {
    
    const initialFormData: RegistrationFormData = {
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date().toISOString().slice(0, 16),
        treatment: treatments.length > 0 ? treatments[0]._id : "",
        customer: selectedCustomer ? selectedCustomer._id : "",
        duration: 30,
    };

    const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                <label htmlFor="treatment" className={styles.label}>Wybierz zabieg:</label>
                <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    className={styles.registrationSelect}
                >
                    {treatments.map(treatment => (
                        <option key={treatment._id} value={treatment._id}>
                            {treatment.massage} - {treatment.price} zł, Czas: {treatment.time}
                        </option>
                    ))}
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
