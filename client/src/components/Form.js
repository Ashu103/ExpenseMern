import React, { useState } from "react";
import List from "./List";
import { apiSlice } from "../store/apiSlice";

const Form = () => {
  const expenses = {
    name: "",
    type: "",
    amount: 0,
  };

  const [myexpenses, setMyExpenses] = useState(expenses);

  const [addTransaction] = apiSlice.useAddTransactionMutation();

  const handleChange = (e) => {
    setMyExpenses({ ...myexpenses, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!myexpenses) return {};
    //   console.log(myexpenses.transaction);
    await addTransaction(myexpenses).unwrap();

    setMyExpenses({ name: "", type: "", amount: 0 });
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Salary,House Rent,SIP "
              className="form-input"
              onChange={handleChange}
              value={myexpenses.name}
            />
          </div>
          <select
            className="form-input"
            name="type"
            value={myexpenses.type}
            onChange={handleChange}
          >
            <option value="investment" defaultValue>
              Investor
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              name="amount"
              type="text"
              placeholder="Amount"
              className="form-input"
              onChange={handleChange}
              value={myexpenses.amount}
            />
          </div>
          <div className="submit-btn">
            <button
              type="submit"
              className="border py-2 text-white bg-indigo-500 w-full"
            >
              Make Transactions
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
};

export default Form;
