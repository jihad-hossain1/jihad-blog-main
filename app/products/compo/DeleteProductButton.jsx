"use client";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const DeleteProductButton = ({ pid }) => {
  const router = useRouter();
  const deleteTicket = async (idT) => {
    const res = await fetch(`/api/products/${idT}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <button onClick={() => deleteTicket(pid)}>
      <FaTrash />
    </button>
  );
};

export default DeleteProductButton;
