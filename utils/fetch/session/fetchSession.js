export async function fetchSession() {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/users/session`, {
    cache: "no-store",
  });

  return await res.json();
}
