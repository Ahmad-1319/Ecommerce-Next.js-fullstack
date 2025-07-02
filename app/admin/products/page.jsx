"use client";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  price: "",
  images: [""],
  category: "",
  inStock: 0,
  featured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/products", {
      headers: { "auth-token": token },
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products);
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageInput = (e, idx) => {
    const newImages = [...form.images];
    newImages[idx] = e.target.value;
    setForm((f) => ({ ...f, images: newImages }));
  };

  const addImageField = () => setForm((f) => ({ ...f, images: [...f.images, ""] }));
  const removeImageField = (idx) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const method = editingId ? "PATCH" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;
    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      await fetchProducts();
      setShowForm(false);
      setForm(initialForm);
      setEditingId(null);
    }
    setSubmitting(false);
  };

  const handleEdit = (product) => {
    setForm({ ...product, price: product.price.toString() });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({ _id }),
    });
    if (res.ok) await fetchProducts();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Products</h1>
        <button
          className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={() => { setShowForm(true); setForm(initialForm); setEditingId(null); }}
        >
          <Plus className="w-5 h-5 mr-2" /> Add Product
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleInput} required className="w-full border rounded px-3 py-2 mb-2" />
            <label className="block font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleInput} required className="w-full border rounded px-3 py-2 mb-2" />
            <label className="block font-medium mb-1">Category</label>
            <input name="category" value={form.category} onChange={handleInput} required className="w-full border rounded px-3 py-2 mb-2" />
            <label className="block font-medium mb-1">In Stock</label>
            <input name="inStock" type="number" value={form.inStock} onChange={handleInput} min={0} className="w-full border rounded px-3 py-2 mb-2" />
            <label className="block font-medium mb-1">Featured</label>
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleInput} className="ml-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input name="price" type="number" value={form.price} onChange={handleInput} required min={0} className="w-full border rounded px-3 py-2 mb-2" />
            <label className="block font-medium mb-1">Images (URLs)</label>
            {form.images.map((img, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input value={img} onChange={e => handleImageInput(e, idx)} className="w-full border rounded px-3 py-2" required />
                <button type="button" onClick={() => removeImageField(idx)} className="ml-2 text-red-500"><X /></button>
              </div>
            ))}
            <button type="button" onClick={addImageField} className="text-blue-500 mt-2">+ Add Image</button>
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"><X className="w-4 h-4 mr-1" /> Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 flex items-center"><Save className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Add"} Product</button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No products found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">In Stock</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-3"><img src={product.images[0]|| product.image} alt={product.title} className="w-14 h-14 object-cover rounded border" /></td>
                  <td className="p-3 font-medium">{product.title}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.inStock}</td>
                  <td className="p-3">{product.featured ? "Yes" : "No"}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline flex items-center"><Edit className="w-4 h-4 mr-1" /> Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline flex items-center"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 