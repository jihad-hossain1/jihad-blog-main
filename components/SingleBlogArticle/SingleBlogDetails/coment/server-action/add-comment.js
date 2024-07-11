"use server";

export async function addComment(info) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blogCommets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...info }),
    }
  );
  const data = await response.json();

  return data;
}
