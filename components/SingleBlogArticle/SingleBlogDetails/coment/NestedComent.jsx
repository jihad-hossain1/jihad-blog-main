"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { addComment } from "./server-action/add-comment";
import { useRouter } from "next/navigation";
import Coment from "./coment";

const NestedComment = ({ blogId, comments }) => {
  console.log("🚀 ~ NestedComment ~ comments:", comments);
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState({});
  const [showReply, setShowReply] = useState({});
  const router = useRouter();

  const commentSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await addComment({
        blogId,
        content,
        userId: session?.user?.id,
      });
      setLoading(false);
      router.refresh();
      setContent("");
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={commentSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add comment"
          className="w-full input"
          cols="3"
          rows="2"
        />
        <button disabled={loading} className="btn" type="submit">
          {loading ? "Loading..." : "Add comment"}
        </button>
      </form>
      <div className="flex flex-col gap-2 mt-4">
        {comments?.map((comment) => (
          <Coment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default NestedComment;
