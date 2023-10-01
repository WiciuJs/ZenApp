import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import AddProduct from '../components/AddProduct';

function OrderView() {
  const [activeTab, setActiveTab] = useState('order');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log(`Usunięto produkt o ID: ${productId}`);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/supplies"
            className={`nav-link ${activeTab === 'order' ? 'active' : ''}`}
            onClick={() => handleTabClick('order')}
          >
            Zamówienie
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/supplies"
            className={`nav-link ${activeTab === 'addProduct' ? 'active' : ''}`}
            onClick={() => handleTabClick('addProduct')}
          >
            Produkty
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/supplies"
            className={`nav-link ${activeTab === 'addSupplier' ? 'active' : ''}`}
            onClick={() => handleTabClick('addSupplier')}
          >
            Dostawcy
          </Link>
        </li>
      </ul>
      {activeTab === 'order' && <OrderForm />}
      {activeTab === 'addProduct' && <AddProduct onProductAdded={(product) => console.log(product)} onDeleteProduct={handleDeleteProduct} />}
      {/* activeTab === 'addSupplier' && <AddSupplierForm /> */}
    </div>
  );
}

export default OrderView;