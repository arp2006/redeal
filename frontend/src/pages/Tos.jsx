import React from "react";

function Tos() {
  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm sm:p-8">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mb-3">
        By using ReDeal, you agree to these terms. Users must provide accurate
        information and maintain respect within the platform.
      </p>
      <p className="mb-3">
        Posting fraudulent or inappropriate content is prohibited and may
        result in account suspension or removal.
      </p>
      <p className="mb-3">
        ReDeal serves as an intermediary between buyers and sellers. We do not
        hold ownership of listed items or mediate transactions directly.
      </p>
      <p>
        Continued use of our services implies acceptance of updated terms and
        policies available on this page.
      </p>
    </article>
  );
}

export default Tos;
