import { useState, useEffect } from "react";
import { createLead } from "../services/leadService";

function LeadForm({
  onLeadAdded,
  editLead,
  onUpdateLead,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

  useEffect(() => {
    if (editLead) {
      setFormData({
        name: editLead.name || "",
        email: editLead.email || "",
        phone: editLead.phone || "",
        company: editLead.company || "",
        status: editLead.status || "New",
        notes: editLead.notes || "",
      });
    }
  }, [editLead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      notes: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editLead) {
        await onUpdateLead(editLead._id, formData);

        alert("Lead Updated Successfully");
      } else {
        await createLead(formData);

        alert("Lead Added Successfully");
      }

      resetForm();

      onLeadAdded();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold">
        {editLead ? "Edit Lead" : "Add Lead"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
        className="w-full border p-3 rounded"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Converted">Converted</option>
        <option value="Lost">Lost</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        rows="4"
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {editLead ? "Update Lead" : "Add Lead"}
      </button>
    </form>
  );
}

export default LeadForm;