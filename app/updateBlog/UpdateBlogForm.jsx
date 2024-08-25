"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateBlogForm = ({ id, blog }) => {
    const router = useRouter();
    const [details, setDetails] = useState(blog?.details?.details);
    const [formData, setFormData] = useState({
        newArticleTitle: "",
        newDetails: "",
        newImage: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    articleTitle: formData.newArticleTitle,
                    details: formData.newDetails,
                    image: formData.newImage,
                }),
            });

            const result = await res.json();


            if (result?.result) {
                toast.success("Blog updated successfully", { duration: 3000, position: "bottom-center", icon: '👏', style: {
                  border: '2px solid #713200',
                  padding: '20px',
                  color: '#713200',
                }, });
                router.refresh();
            }

            if (result?.error) {
                toast.error(result?.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (blog) {
            setFormData({
                newArticleTitle: blog?.articleTitle || "",
                newDetails: blog?.details?.details || "",
                newImage: blog?.details?.image || "",
            });
        }
    }, [blog, blog?.articleTitle, blog?.details, blog.image]);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "code-block",
    ];

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video", "code-block"],
            ["clean"],
        ],
    };
    return (
        <div>
            <button onClick={() => router.back()} className='my-5 btn'>
                Back
            </button>
            <form onSubmit={handleSubmit}>
                <div className='mb-7'>
                    <input
                        onChange={(e) => setnewarticletitle(e.target.value)}
                        value={formData.newArticleTitle}
                        className='w-full border border-gray-200 p-3 focus:outline-none'
                        placeholder='Title'
                        type='text'
                        name='title'
                    />
                    <Image
                        alt='image'
                        src={formData.newImage ? formData.newImage : ""}
                        className='max-w-[500px] border border-gray-200 p-3 focus:outline-none'
                        height={200}
                        width={1000}
                    />
                </div>
                <ReactQuill
                    theme='snow'
                    modules={modules}
                    formats={formats}
                    onChange={setDetails}
                    value={details}
                    className='py-2 w-full '
                />

                <button
                    type='submit'
                    className='transition duration-300 border p-4 w-fit bg-yellow-400 text-white rounded hover:bg-yellow-500'
                >
                    update blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlogForm;
