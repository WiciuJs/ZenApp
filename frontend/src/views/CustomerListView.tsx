import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerForm from "../components/CustomerForm";
import RegistrationForm from "../components/RegistrationForm";
import {
  faUserXmark as faSolidUserXmark,
  faBookmark as faDuotoneBookmark,
  faUserGear as faDuotoneUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Customer, RegistrationFormData, Treatment } from "../Interface/Interface";
import Modal from "react-modal";
import styles from "../styles/CustomerListView.module.scss";

Modal.setAppElement("#root");

const CustomerListView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCustomerForRegistration, setSelectedCustomerForRegistration] =
    useState<Customer | null>(null);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const handleRegistrationSubmit = (formData: RegistrationFormData) => {
    axios
      .post("http://127.0.0.1:5001/api/registrations/", {
        ...formData,
        customer: selectedCustomerForRegistration?._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Błąd podczas rejestracji:", error);
      });
  };

  const openRegistrationModal = () => {
    setRegistrationModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setRegistrationModalOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm]);

  const fetchCustomers = () => {
    if (searchTerm) {
      axios
        .get(
          `http://127.0.0.1:5001/api/customer?search=${searchTerm}&page=${currentPage}`
        )
        .then((res) => {
          setSearchResults(res.data.customers);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
          console.error("Błąd podczas wyszukiwania użytkowników:", error);
        });
    } else {
      axios
        .get(`http://127.0.0.1:5001/api/customer?page=${currentPage}`)
        .then((res) => {
          setCustomers(res.data.customers);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
          console.error("Błąd podczas pobierania użytkowników:", error);
        });
    }

  };

  const fetchTreatments = () => {
    axios.get("http://127.0.0.1:5001/api/treatments")
      .then(response => {
        setTreatments(response.data);
      })
      .catch(error => {
        console.error("Błąd podczas ładowania zabiegów:", error);
      });
  };


  const handleCustomerAdded = () => {
    fetchCustomers();
  };

  const handleDeleteCustomer = (customerId: string) => {
    axios
      .delete(`http://127.0.0.1:5001/api/customer/${customerId}`)
      .then(() => {
        setCustomers(
          customers.filter((customer) => customer._id !== customerId)
        );
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania użytkownika:", error);
      });
  };

  const handleEditCustomer = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsEditMode(true);
  };

  const handleSaveCustomer = (updatedCustomer: Customer | undefined) => {
    if (!updatedCustomer) {
      return;
    }

    axios
      .put(
        `http://127.0.0.1:5001/api/customer/${updatedCustomer._id}`,
        updatedCustomer
      )
      .then(() => {
        fetchCustomers();
        setCustomerToEdit(null);
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error("Błąd podczas aktualizacji użytkownika:", error);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedCustomers = searchTerm ? searchResults : customers;

  return (
    <div className={styles.customerListViewContainer}>
      {selectedCustomerForRegistration && (
        <Modal
          isOpen={isRegistrationModalOpen}
          onRequestClose={closeRegistrationModal}
          contentLabel="Rejestracja"
          className={styles.modalDialog}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Formularz rejestracji</h2>
              <button
                type="button"
                className={styles.close}
                onClick={closeRegistrationModal}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <RegistrationForm
                onRegistrationSubmit={handleRegistrationSubmit}
                closeRegistrationModal={closeRegistrationModal}
                selectedCustomer={selectedCustomerForRegistration}
                treatments={treatments}
              />
            </div>
          </div>
        </Modal>
      )}

      <CustomerForm onCustomerAdded={handleCustomerAdded} />
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.formControl}
          placeholder="Wyszukaj użytkownika..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={styles.customerListViewTable}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Wiek</th>
            <th>E-mail</th>
            <th>Numer telefonu</th>
            <th>Komentarze</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.surname}</td>
              <td>{customer.age}</td>
              <td>{customer.mail}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.comments}</td>
              <td className={styles.actions}>
                <button onClick={() => handleEditCustomer(customer)} className={styles.btnAction}>
                  <FontAwesomeIcon icon={faDuotoneUserGear} />
                </button>
                <button onClick={() => handleDeleteCustomer(customer._id)} className={styles.btnAction}>
                  <FontAwesomeIcon icon={faSolidUserXmark} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCustomerForRegistration(customer);
                    openRegistrationModal();
                  }}
                  className={styles.btnAction}
                >
                  <FontAwesomeIcon icon={faDuotoneBookmark} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditMode && customerToEdit && (
        <CustomerForm
          onCustomerAdded={handleSaveCustomer}
          customerToEdit={customerToEdit}
        />
      )}
      <div className={styles.paginationContainer}>
        <ul className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`${styles.pageItem} ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <a className={`${currentPage === index + 1 ? 'active' : ''}`}>
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerListView;
