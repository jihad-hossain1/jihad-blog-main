"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { addComment } from "./server-action/add-comment";

const Coment = ({ comment }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [replyContent, setReplyContent] = useState({});
  const [replyLoading, setReplyLoading] = useState({});
  const [showReply, setShowReply] = useState({});

  const replySubmit = async (commentId) => {
    try {
      setReplyLoading((prev) => ({ ...prev, [commentId]: true }));

      const result = await addComment({
        content: replyContent[commentId],
        userId: session?.user?.id,
        parentReplyId: commentId,
      });

      // Update comments state or rerender as needed
      router.refresh();

      setReplyLoading((prev) => ({ ...prev, [commentId]: false }));
      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
      setShowReply((prev) => ({ ...prev, [commentId]: false }));

      console.log(result);
    } catch (error) {
      console.log(error);

      setReplyLoading((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg mb-4">
      {/* Comment content */}
      <p className="text-gray-800">{comment.content}</p>

      {/* Reply button and form */}
      <div className="mt-2">
        <button
          onClick={() =>
            setShowReply((prev) => ({
              ...prev,
              [comment._id]: !prev[comment._id],
            }))
          }
          className="text-sm text-blue-500 focus:outline-none"
        >
          Reply
        </button>
        {showReply[comment._id] && (
          <form className="mt-2">
            <textarea
              value={replyContent[comment._id] || ""}
              onChange={(e) =>
                setReplyContent((prev) => ({
                  ...prev,
                  [comment._id]: e.target.value,
                }))
              }
              placeholder="Add reply"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              cols="3"
              rows="2"
            />
            <button
              onClick={() => replySubmit(comment._id)}
              disabled={replyLoading[comment._id]}
              className="btn mt-2"
            >
              {replyLoading[comment._id] ? "Loading..." : "Add reply"}
            </button>
          </form>
        )}
      </div>

      {/* Replies */}
      {comment?.replies?.length > 0 && (
        <div className="ml-4 mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <div
              key={reply._id}
              className="p-2 bg-gray-100 border border-gray-200 rounded-lg"
            >
              <Coment comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coment;
