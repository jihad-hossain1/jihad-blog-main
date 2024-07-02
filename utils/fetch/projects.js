export const fetchProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/projects`, {
      next: { tags: ["project"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
