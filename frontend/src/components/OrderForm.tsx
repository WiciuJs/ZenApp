import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Supplier, Product } from '../Interface/Interface';

function OrderForm() {
    const [productName, setProductName] = useState<string>('');
    const [productList, setProductList] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [supplierName, setSupplierName] = useState<string>('');
    const [supplierList, setSupplierList] = useState<Supplier[]>([]);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const [quantity, setQuantity] = useState<string>('');

    const [step, setStep] = useState<number>(1);

    const [submittedOrder, setSubmittedOrder] = useState<{
        product: Product | null;
        supplier: Supplier | null;
        quantity: string;
    } | null>(null);

    useEffect(() => {
        if (productName) {
            axios
                .get(`http://127.0.0.1:5001/api/product/?name=${productName}`)
                .then((response) => {
                    const products: Product[] = response.data;
                    setProductList(products);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania produktów:', error);
                    setProductList([]);
                });
        } else {
            setProductList([]);
        }
        if (supplierName) {
            axios
                .get(`http://127.0.0.1:5001/api/suppliers/?name=${supplierName}`)
                .then((response) => {
                    const suppliers: Supplier[] = response.data;
                    setSupplierList(suppliers);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania dostawców:', error);
                    setSupplierList([]);
                });
        } else {
            setSupplierList([]);
        }
    }, [productName, supplierName]);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setProductName(product.name);
    };

    const handleSupplierSelect = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setSupplierName(supplier.name);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = {
            product: selectedProduct,
            supplier: selectedSupplier,
            quantity,
        };
        setSubmittedOrder(orderData);

        console.log('Wybrane dane zamówienia:');
        console.log('Produkt:', selectedProduct);
        console.log('Dostawca:', selectedSupplier);
        console.log('Ilość:', quantity);
    };

    return (
        <div>
            <h2>Formularz Zamówienia - Krok {step}</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="form-group">
                        <label>Nazwa Produktu:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <ul>
                            {productList.map((product) => (
                                <li key={product._id} onClick={() => handleProductSelect(product)}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-group">
                        <label>Nazwa Dostawcy:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                        <ul>
                            {supplierList.map((supplier) => (
                                <li key={supplier._id} onClick={() => handleSupplierSelect(supplier)}>
                                    {supplier.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-group">
                        <label>Ilość:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                )}
                {step > 1 && (
                    <button type="button"  onClick={handlePrevStep}>
                        Poprzedni krok
                    </button>
                )}

                {step < 3 && (
                    <button type="button"  onClick={handleNextStep}>
                        Następny krok
                    </button>
                )}

                {step === 3 && (
                    <button type="submit" >
                        Złóż zamówienie
                    </button>
                )}
            </form>

            {submittedOrder && (
                <div>
                    <h3>Podgląd zamówienia:</h3>
                    <p>Produkt: {submittedOrder.product?.name}</p>
                    <p>Dostawca: {submittedOrder.supplier?.name}</p>
                    <p>Ilość: {submittedOrder.quantity}</p>
                </div>
            )}
        </div>
    );
}

export default OrderForm;