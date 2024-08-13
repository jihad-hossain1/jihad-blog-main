export const getResume = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/resume`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
