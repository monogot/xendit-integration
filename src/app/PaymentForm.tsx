'use client'; // This is a client component

import React, { useState, useEffect } from 'react';

export const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.xendit.co/v1/xendit.min.js';
    script.onload = () => {
      // @ts-ignore
      Xendit.setPublishableKey('INSERT PUBLIC KEY HERE');
    };
    document.body.append(script);
  }, []);

  const submitFunction = (e) => {
    e.preventDefault();

    const tokenParams = {
      amount: 10000,
      card_number: cardNumber,
      card_exp_month: expirationMonth,
      card_exp_year: expirationYear,
      card_cvn: cvc,
      is_multiple_use: false,
      should_authenticate: true,
    };

    // @ts-ignore
    Xendit.card.createToken(tokenParams, (err: any, token: any) => {
      if (err) {
        console.error('Error');
        console.error(err);
      } else {
        const tokenId = token.id as string;
        console.info('It works');
        console.info(tokenId);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={submitFunction}>
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expirationMonth"
            className="block text-gray-700 font-bold mb-2"
          >
            Expiration Month
          </label>
          <input
            type="text"
            id="expirationMonth"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            value={expirationMonth}
            onChange={(e) => setExpirationMonth(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expirationYear"
            className="block text-gray-700 font-bold mb-2"
          >
            Expiration Year
          </label>
          <input
            type="text"
            id="expirationYear"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            value={expirationYear}
            onChange={(e) => setExpirationYear(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvc" className="block text-gray-700 font-bold mb-2">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
