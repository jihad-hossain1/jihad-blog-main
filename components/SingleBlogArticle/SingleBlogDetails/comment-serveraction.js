"use server";

export const createComment = async (data) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/blogCommets?blogId=${data?.info?.blogId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    }
  );
  const data2 = await res.json();
  return data2;
};
