import mongoose, { Document, Schema } from 'mongoose';

export interface Product extends Document {
    name: string;
    capacity?: string;
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    capacity: String,
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
