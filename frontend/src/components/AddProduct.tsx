import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/AddProduct.module.scss';

interface AddProductProps {
    onProductAdded: (product: Product) => void;
    onDeleteProduct: (productId: string) => void;
}

interface Product {
    _id: string;
    name: string;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded, onDeleteProduct }) => {
    const [productName, setProductName] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);

    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5001/api/products', { name: productName });

            if (response.status === 201) {
                const newProduct: Product = response.data;
                onProductAdded(newProduct);
                setProductName('');
                refreshProductList();
            }
        } catch (error) {
            console.error('Błąd podczas dodawania produktu:', error);
        }
    };

    useEffect(() => {
        refreshProductList();
    }, []);

    const refreshProductList = () => {
        axios.get('http://127.0.0.1:5001/api/products')
            .then((response) => {
                const products: Product[] = response.data;
                setProducts(products);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania produktów:', error);
                setProducts([]);
            });
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5001/api/products/${productId}`);
            if (response.status === 200) {
                onDeleteProduct(productId);
                refreshProductList();
            }
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
    };

    return (
        <div className={styles.AddProduct}>
            <h2 className={styles.AddProduct__heading}>Dodaj nowy produkt</h2>
            <form onSubmit={handleSubmit} className={styles.AddProduct__form}>
                <div className={styles.AddProduct__formGroup}>
                    <label htmlFor="productName" className={styles.AddProduct__label}>
                        Nazwa Produktu:
                    </label>
                    <input
                        type="text"
                        id="productName"
                        className={styles.AddProduct__input}
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </div>
                <button type="submit" className={styles.AddProduct__button}>
                    Dodaj produkt
                </button>
            </form>

            <h2 className={styles.AddProduct__heading}>Lista produktów:</h2>
            <ul className={styles.AddProduct__productList}>
                {products.map((product) => (
                    <li key={product._id} className={styles.AddProduct__productItem}>
                        <span className={styles.AddProduct__productName}>{product.name}</span>
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className={styles.AddProduct__deleteButton}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddProduct;