"use client";

import { addOrder } from "./orders";
export default function Home() {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Broo</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <button
        className="btn mt-3"
        onClick={() => {
          addOrder();
        }}
      >
        Submit
      </button>
    </div>
  );
}
