import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="min-h-screen bg-primary place-content-center">
      <section className="flex flex-col items-center justify-center space-y-8">
        <h1 className="font-semibold text-8xl">Oops!</h1>
        <p className="text-lg font-semibold">404 Page Not Found...</p>
        <p className="font-semibold ">
          <Link to="/" className="text-white hover:text-slate-800">
            Back To Home
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Error;
