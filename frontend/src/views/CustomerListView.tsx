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
import { Customer, RegistrationFormData } from "../Interface/Interface";
import Modal from "react-modal";

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
    <div className="container mt-5">
      {selectedCustomerForRegistration && (
        <Modal
          isOpen={isRegistrationModalOpen}
          onRequestClose={closeRegistrationModal}
          contentLabel="Rejestracja"
          className="modal-dialog"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Formularz rejestracji</h2>
              <button
                type="button"
                className="close"
                onClick={closeRegistrationModal}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <RegistrationForm
                onRegistrationSubmit={handleRegistrationSubmit}
                closeRegistrationModal={closeRegistrationModal}
                selectedCustomer={selectedCustomerForRegistration}
              />
            </div>
          </div>
        </Modal>
      )}

      <CustomerForm onCustomerAdded={handleCustomerAdded} />

      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Wyszukaj użytkownika..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Lista użytkowników</h2>
      <table className="table table-striped">
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
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditCustomer(customer)}
                >
                  <FontAwesomeIcon icon={faDuotoneUserGear} />
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDeleteCustomer(customer._id)}
                >
                  <FontAwesomeIcon icon={faSolidUserXmark} />
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedCustomerForRegistration(customer);
                    openRegistrationModal();
                  }}
                >
                  <FontAwesomeIcon icon={faDuotoneBookmark} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditMode && customerToEdit && (
        <div className="my-4">
          <h3>Edytuj użytkownika</h3>
          <CustomerForm
            onCustomerAdded={handleSaveCustomer}
            customerToEdit={customerToEdit}
          />
        </div>
      )}

      <div className="mt-4">
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              <span className="page-link">{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerListView;