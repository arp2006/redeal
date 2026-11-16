import React from "react";

function Privacy() {
  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm sm:p-8">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mb-3">
        ReDeal values your privacy. This policy outlines how we collect, use, and protect your personal information.
      </p>
      <p className="mb-3">
        We collect basic information such as your name and email for account management and communication.
        Your data is stored securely and never shared with third parties without consent.
      </p>
      <p>
        You can request data deletion, updates, or opt out of communications at any time by contacting us directly.
      </p>
    </article>
  );
}

export default Privacy;
