"use server";

export async function fetchUserBlogs(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/users/profile/user-blogs?id=${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data;
}
