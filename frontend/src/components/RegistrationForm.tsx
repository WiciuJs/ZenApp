import React, { useState, useEffect } from "react";
import { RegistrationFormData, Treatment, Customer, RegistrationFormProps } from "../Interface/Interface";
import styles from '../styles/RegistrationForm.module.scss';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegistrationSubmit,
    closeRegistrationModal,
    selectedCustomer,
    treatments
}) => {
    const convertDurationToMinutes = (durationString: string): number => {
        const parts = durationString.split(' ');
        const time = parseInt(parts[0]);
        const unit = parts[1];

        if (unit === 'min') return time;
        if (unit === 'h') return time * 60;
        return 0;
    };

    const initialFormData: RegistrationFormData = {
        startDate: new Date().toISOString().slice(0, 16),
        endDate: "",
        treatment: treatments.length > 0 ? treatments[0]._id : "",
        customer: selectedCustomer ? selectedCustomer._id : "",
        duration: treatments.length > 0 ? convertDurationToMinutes(treatments[0].time) : 0,
    };

    const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

    useEffect(() => {
        if (formData.startDate && formData.duration) {
            const startDate = new Date(formData.startDate);
            const endDate = new Date(startDate.getTime() + formData.duration * 60000);
            setFormData({ ...formData, endDate: endDate.toISOString().slice(0, 16) });
        }
    }, [formData.startDate, formData.duration]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'treatment') {
            const selectedTreatment = treatments.find(t => t._id === value);
            const newDuration = selectedTreatment ? convertDurationToMinutes(selectedTreatment.time) : 0;
            setFormData({ ...formData, [name]: value, duration: newDuration });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="treatment" className={styles.label}>Wybierz zabieg:</label>
                <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    className={styles.select}
                >
                    {treatments.map(treatment => (
                        <option key={treatment._id} value={treatment._id}>
                            {treatment.massage} - {treatment.price} zł, Czas: {treatment.time}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formActions}>
                <button type="submit" className={styles.button}>Zapisz</button>
                <button type="button" onClick={closeRegistrationModal} className={styles.button}>Anuluj</button>
            </div>
        </form>
    );
};

export default RegistrationForm;
