import EditTopicform from "@/components/EditTopicform";
import React from "react";

const getTopicById = async (id) => {
  try {
    const res = await fetch(
      `https://nextjs-gtcoding-crud-app.vercel.app/api/topics/${id}`,
      {
        cache: "no-store",
      }
    );
    //
    if (!res.ok) {
      throw new Error("failed to fetch topic");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditTopic = async ({ params }) => {
  const { id } = params;
  // console.log(id);
  const { topic } = await getTopicById(id);
  return (
    <div>
      <EditTopicform id={id} topic={topic} />
    </div>
  );
};

export default EditTopic;
