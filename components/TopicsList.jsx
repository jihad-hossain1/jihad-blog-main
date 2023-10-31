import React from "react";
import RemoveBTN from "./RemoveBTN";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";

const getTopics = async () => {
  try {
    // const res = await fetch("/api/topics", {
    //   cache: "no-store",
    // });
    const res = await fetch(
      "https://nextjs-gtcoding-crud-app.vercel.app/api/topics",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading topics:", error);
  }
};

const TopicsList = async () => {
  const { topics } = await getTopics();
  // console.log(topics);
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h4 className="text-center font-semibold my-4">
        total-topics: {topics?.length}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics?.map((topic) => (
          <div
            key={topic?._id}
            className="p-4 border border-slate-300 my-4 flex justify-between"
          >
            <div className="">
              <h2 className="text-xl font-bold">{topic?.title}</h2>
              <div>{topic?.description}</div>
            </div>
            <div>
              <RemoveBTN topic={topic} />
              <Link href={`/editTopic/${topic?._id}`}>
                <BsPencilSquare size={25} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
