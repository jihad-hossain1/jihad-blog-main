export const fetchBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs`, {
      next: { tags: ["blog"] },
    });

    return res.json();
  } catch (error) {
    console.error("error loading topics:", error);
  }
};
