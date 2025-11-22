import React, { useState } from 'react';

function Contact() {
    var forms={
        name: '',
         email: '',
          message: '' 
    }
  const [form, setForm] = useState(forms);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! Your message has been received.`);
    setForm(forms);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded"/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border rounded"/>
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
};

export default Contact;

