import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  // 🔍 search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // fetch sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(Array.isArray(res.data.sweets) ? res.data.sweets : []);
    } catch {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // add / update sweet
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/sweets/${editingId}`, {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
      } else {
        await api.post("/sweets", {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
      }

      resetForm();
      fetchSweets();
    } catch {
      alert("Operation failed");
    }
  };

  const handleEdit = (sweet) => {
    setEditingId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      image: sweet.image,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      image: "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  const handleRestock = async (id) => {
    await api.post(`/sweets/${id}/restock`, { amount: 5 });
    fetchSweets();
  };

  // 🔍 apply search & filter
  const filteredSweets = sweets.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || s.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // unique categories
  const categories = [...new Set(sweets.map((s) => s.category))];

  if (loading) return <p className="p-6">Loading admin panel...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      <h2 className="text-4xl font-bold text-pink-600 mb-8">
        Admin Panel – Manage Sweets
      </h2>

      {/* 🔍 Search & Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4 items-center">
        <input
          className="input flex-1"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="input"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("");
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-12">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Sweet" : "Add New Sweet"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input className="input" placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input className="input" placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <input className="input" placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })} />

          <input className="input" type="number" placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <input className="input" type="number" placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} />

          <div className="flex gap-3">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold">
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-lg bg-gray-200 font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {filteredSweets.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-4">{s.name}</td>
                <td className="p-4">₹{s.price} / kg</td>
                <td className="p-4">{s.quantity}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(s)}
                      className="px-4 py-1 bg-purple-500 text-white rounded">
                      Edit
                    </button>
                    <button onClick={() => handleRestock(s._id)}
                      className="px-4 py-1 bg-green-500 text-white rounded">
                      +5
                    </button>
                    <button onClick={() => handleDelete(s._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredSweets.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No sweets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </section>
  );
}
