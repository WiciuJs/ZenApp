import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderForm from '../components/OrderForm';

function OrderView() {
    const [activeTab, setActiveTab] = useState('order');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
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
                        Dodanie Produktu
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/supplies"
                        className={`nav-link ${activeTab === 'addSupplier' ? 'active' : ''}`}
                        onClick={() => handleTabClick('addSupplier')}
                    >
                        Dodanie Dostawcy
                    </Link>
                </li>
            </ul>
            {activeTab === 'order' && <OrderForm />}
     {/*        {activeTab === 'addProduct' && <AddProductForm />}
            {activeTab === 'addSupplier' && <AddSupplierForm />} */}
        </div>
    );
}

export default OrderView;
