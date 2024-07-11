"use client";

import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "@/helpers/debounce";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = async (page, pageSize, searchTerm, limit) => {
    const res = await fetch(
      `/api/message?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    setMessages(data?.data);
  };

  // Use debounce to handle search input changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMessages = useCallback(
    debounce((page, pageSize, searchTerm, limit) => {
      fetchMessages(page, pageSize, searchTerm, limit);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchMessages(page, pageSize, searchTerm, limit);
  }, [page, pageSize, searchTerm, limit, debouncedFetchMessages]);
  return (
    <div>
      <div className="flex justify-center p-4">
        <input
          className="max-sm:w-11/12 md:w-1/3 p-2 border border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-scroll w-full">
        <table className="overflow-x-scroll w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 py-2 px-4">Name</th>
              <th className="border border-gray-200 py-2 px-4">Email</th>
              <th className="border border-gray-200 py-2 px-4">Subject</th>
              <th className="border border-gray-200 py-2 px-4">Content</th>
              <th className="border border-gray-200 py-2 px-4">actions </th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, _index) => (
              <tr key={_index}>
                <td className="border border-gray-200 py-2 px-4">
                  {message?.name}
                </td>
                <td className="border border-gray-200 py-2 px-4">
                  {message?.email}
                </td>
                <td className="border border-gray-200 py-2 px-4">
                  {message?.subject}
                </td>
                <td className="border border-gray-200 py-2 px-4">
                  {message?.content?.slice(0, 20)}
                </td>
                <td>
                  <button className="border border-gray-200 py-2 px-4">
                    View
                  </button>

                  <button className="border border-gray-200 py-2 px-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <section className="flex justify-end">
        <div className="flex gap-2 md:flex-row flex-col">
          <select
            className="border px-10 py-2 rounded border-gray-200"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={""} disabled>
              Show Message
            </option>
            {[10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center"
          >
            Previous
          </button>
          <h4 className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center">
            {page}
          </h4>
          <button
            disabled={messages?.length < pageSize}
            onClick={() => setPage(page + 1)}
            className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default MessagePage;
