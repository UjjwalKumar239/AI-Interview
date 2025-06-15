"use client";
import React, { useState } from "react";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Interview
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Job Position"
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                placeholder="Job Description"
                rows={3}
                className="w-full border px-4 py-2 rounded"
              ></textarea>
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full border px-4 py-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewInterview;
