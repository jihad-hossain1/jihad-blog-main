"use server";

export const serverAction = async (info) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...info }),
  });

  const data = await res.json();

  return data;
};
