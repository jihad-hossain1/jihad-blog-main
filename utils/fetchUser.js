export const getUser = async () => {
  try {
    const res = await fetch("https://jihad-blog-main.vercel.app/api/user", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading product:", error);
  }
};