export const getResume = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/resume", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading resume:", error);
  }
};