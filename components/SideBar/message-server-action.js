"use server";

export const addMessage = async (info) => {
  const response = await fetch(`http://localhost:3000/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...info }),
  });
  const data = await response.json();

  return data;
};
