export const fetchBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs`, {
      next: { tags: ["blog"] },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("error loading topics:", error);
  }
};
