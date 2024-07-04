export async function fetchUserBlogs(id) {
  const res = await fetch(
    `http://localhost:3000/api/users/profile/user-blogs?id=${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data;
}
