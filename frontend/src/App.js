import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    merchantId: "",
    amount: "",
    currency: "INR"
  });

  useEffect(() => {
    fetchTransactions();

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/transactions", message => {
          const txn = JSON.parse(message.body);
          setTransactions(prev => {
            const filtered = prev.filter(t => t.id !== txn.id);
            return [txn, ...filtered];
          });
        });
      }
    });

    client.activate();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:8080/api/payments/all");
    setTransactions(res.data.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/payments", {
      merchantId: form.merchantId,
      amount: parseFloat(form.amount),
      currency: form.currency
    });

    setForm({ merchantId: "", amount: "", currency: "INR" });
  };

  const getStatusBadge = (status) => {
  const base = "px-4 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case "AUTHORIZED":
      return `${base} bg-emerald-50 text-emerald-600`;
    case "REVIEW":
      return `${base} bg-amber-50 text-amber-600`;
    case "PENDING":
      return `${base} bg-blue-50 text-blue-600`;
    default:
      return `${base} bg-red-50 text-red-600`;
  }
};

  const authorizedCount = transactions.filter(t => t.status === "AUTHORIZED").length;
  const reviewCount = transactions.filter(t => t.status === "REVIEW").length;
  const total = transactions.length;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">💳 Payment Monitoring Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-8 mb-10">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 bg-slate-800 border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          Total Transactions
        </p>
        <p className="text-3xl font-bold mt-2">{total}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 bg-slate-800 border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          Authorized
        </p>
        <p className="text-3xl font-bold mt-2 text-green-600">
          {authorizedCount}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 bg-slate-800 border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          Under Review
        </p>
        <p className="text-3xl font-bold mt-2 text-yellow-600">
          {reviewCount}
        </p>
      </div>
    </div>

      {/* Payment Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 bg-slate-800 border-slate-700">
        <h2 className="text-xl font-semibold mb-4">Create Payment</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Merchant ID"
            value={form.merchantId}
            onChange={e => setForm({ ...form, merchantId: e.target.value })}
            className="p-2 border rounded appearance-none bg-black"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="p-2 border rounded appearance-none bg-black"
            required
          />
          <select
            value={form.currency}
            onChange={e => setForm({ ...form, currency: e.target.value })}
            className="p-2 border rounded appearance-none bg-black" // Ensure background is white
          >
            <option value="">Select Currency</option> {/* Placeholder option */}
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden bg-slate-800 border-slate-700">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <table className="min-w-full bg-slate-800 border-slate-700">
            <thead className="bg-slate-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr className="border-b hover:bg-slate-50 transition">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Merchant</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr
                  key={txn.id}
                  className="border-b hover:bg-slate-50 transition duration-200 ease-in-out"
                >
                  <td className="p-4 text-sm text-gray-600">{txn.id}</td>
                  <td className="p-4">{txn.merchantId}</td>
                  <td className="p-4 font-semibold">₹ {txn.amount}</td>
                  <td className="p-4">
                    <span className={getStatusBadge(txn.status)}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;