import CommentForm from "./CommentForm";
// const getResume = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/resume", {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("failed to fatch");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("error loading resume:", error);
//   }
// };
const Comments = ({ bid }) => {
  return (
    <div className="mt-20 text-xl ">
      <h3>Comments-Box: </h3>
      <div className="border border-slate-300 w-full h-96">
        <CommentForm bid={bid} />
      </div>
    </div>
  );
};

export default Comments;
