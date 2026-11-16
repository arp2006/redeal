import React from "react";

function AboutUs() {
  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm sm:p-8">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">About Us</h1>
      <p className="mb-3">
        Welcome to <span className="font-medium">ReDeal</span> — a modern online
        marketplace built to connect local buyers and sellers effortlessly.
      </p>
      <p className="mb-3">
        Our mission is to provide a secure, intuitive, and sustainable
        environment for people to trade pre-owned goods within their communities.
      </p>
      <p className="mb-3">
        ReDeal was developed to promote reusability, reduce waste, and empower
        small local sellers through a simple and efficient platform.
      </p>
    </article>
  );
}

export default AboutUs;
