import React, { useState } from "react";
import axios from "axios";
import bgImage from "../contact.png";

function Contact() {
  const forms = { name: "", email: "", message: "" };
  const [form, setForm] = useState(forms);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/contact", form);
      alert(res.data.message);
      setForm(forms);
    } catch (err) {
      console.error("Error sending contact:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
    style={{
    backgroundImage: `url(${bgImage})`,
  }}
    >
      <div className="min-h-screen bg-black/40 flex flex-col justify-center">
        <div className="p-8 max-w-md mx-auto bg-white/80 rounded shadow">
          <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;

