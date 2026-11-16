import React, { useState } from "react";

function Contact() {
  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm sm:p-8">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Contact Us</h1>
      <div className="mt-6">
        <p>Email: support@redeal.com</p>
        <p>Phone: +91-9876543210</p>
        <p>Address: ReDeal Labs, Chapra, Bihar, India</p>
      </div>
    </article>
  );
}

export default Contact;
