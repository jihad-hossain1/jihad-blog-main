export const getComments = async () => {
  try {
    const res = await fetch(
      "https://jihad-blog-main.vercel.app/api/blogCommets",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading resume:", error);
  }
};

export const getCommentById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};