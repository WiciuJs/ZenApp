import mongoose, { Document, Schema } from 'mongoose';

export interface Supplier extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  nip?: string;
}

const supplierSchema = new Schema<Supplier>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  address: String,
  nip: String,
});

const SupplierModel = mongoose.model<Supplier>('Supplier', supplierSchema);

export default SupplierModel;
