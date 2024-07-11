"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, []);

  const insertComment = async (commentId, content) => {
    try {
      const newComment = {
        content,
        votes: 0,
        timestamp: new Date().toISOString(),
        replies: [],
      };

      const response = await axios.post("/api/comments", newComment);
      if (commentId) {
        // Add logic to insert reply into the tree structure
      } else {
        setComments((prevComments) => [response.data.data, ...prevComments]);
      }
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const editComment = async (commentId, content) => {
    try {
      const response = await axios.put(`/api/comments/${commentId}`, {
        content,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? response.data.data : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;

// "use client";

// import { useState } from "react";

// const useCommentTree = (initialComments) => {
//   const [comments, setComments] = useState(initialComments);

//   const insertNode = (tree, commentId, content) => {
//     return tree.map((comment) => {
//       if (comment.id === commentId) {
//         return {
//           ...comment,
//           replies: [...comment.replies, content],
//         };
//       } else if (comment.replies && comment.replies.length > 0) {
//         return {
//           ...comment,
//           replies: insertNode(comment.replies, commentId, content),
//         };
//       }
//       return comment;
//     });
//   };

//   const insertComment = (commentId, content) => {
//     const newComment = {
//       id: Date.now(),
//       content,
//       votes: 0,
//       timestamp: new Date().toISOString(),
//       replies: [],
//     };

//     if (commentId) {
//       setComments((prevComments) =>
//         insertNode(prevComments, commentId, newComment)
//       );
//     } else {
//       setComments((prevComments) => [newComment, ...prevComments]);
//     }
//   };

//   const editNode = (tree, nodeId, content) => {
//     return tree.map((node) => {
//       if (node.id === nodeId) {
//         return {
//           ...node,
//           content: content,
//           timestamp: new Date().toISOString(),
//         };
//       } else if (node.replies && node.replies.length > 0) {
//         return {
//           ...node,
//           replies: editNode(node.replies, nodeId, content),
//         };
//       }
//       return node;
//     });
//   };

//   const editComment = (commentId, content) => {
//     setComments((prevComments) => editNode(prevComments, commentId, content));
//   };

//   const deleteNode = (tree, nodeId) => {
//     return tree.reduce((acc, node) => {
//       if (node.id === nodeId) {
//         return acc;
//       } else if (node.replies && node.replies.length > 0) {
//         node.replies = deleteNode(node.replies, nodeId);
//       }
//       return [...acc, node];
//     }, []);
//   };

//   const deleteComment = (commentId) => {
//     setComments((prevComments) => deleteNode(prevComments, commentId));
//   };

//   return {
//     comments,
//     insertComment,
//     editComment,
//     deleteComment,
//   };
// };

// export default useCommentTree;
