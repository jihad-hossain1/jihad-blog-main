"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { serverAction } from "./server-action";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "./preview.css";

const AddarticlesForm = () => {
    const { status } = useSession();
    const { data: session } = useSession();

    const { toast } = useToast();
    const [isPreview, setPreview] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const [category, setCategory] = useState("");
    const [loading, setloading] = useState(false);

    const [details, setDetails] = useState("");
    const [articleTitle, setarticleTitle] = useState("");
    const [sortContent, setSortContent] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState(null);

    const [photo, setPhoto] = useState("");
    const [image, setimage] = useState(null);

    const handleOnFileUpload = async (e) => {
        e.preventDefault();
        try {
            let data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "images_preset");
            let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;
            const res = await axios.post(api, data);
            let _up = await res?.data?.secure_url;
            setPhoto(_up);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const unAuth = status === "authenticated";
        if (!unAuth) {
            return toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You are not logged in. Please login first.",
                action: (
                    <ToastAction altText='Try again'>Try again</ToastAction>
                ),
            });
        }

        try {
            setloading(true);

            const res = await serverAction({
                articleTitle: articleTitle.trim(),
                articleCategory: category,
                tags: tags,
                author: {
                    name: session?.user?.name,
                    userId: session?.user?.id,
                },
                details: {
                    user: {
                        displayName: session?.user.name,
                        photoURL: session?.user.photoURL,
                        email: session?.user.email,
                    },
                    image: photo,
                    details,
                },
                sortContent: sortContent.trim(),
            });

            if (res?.error) {
                setloading(false);
                return toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: res?.error,
                    action: (
                        <ToastAction altText='Try again'>Try again</ToastAction>
                    ),
                });
            }
            if (res?.result) {
                toast({
                    title: res?.message,
                });
                setloading(false);
                setPreview(true);
                setDetails("");
                setarticleTitle("");
                setSortContent("");
                setPhoto("");
                setimage(null);
                setCategory("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSubData = React.useCallback(async () => {
        try {
            const data = await fetch("/api/category/sub-category");
            const json = await data.json();
            setCategoryData(json);
        } catch (error) {
            console.error(error);
        }
    }, []);

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

    React.useEffect(() => {
        fetchSubData();
    }, [fetchSubData]);

    const handleTags = (e) => {
        setErrors(null);
        if (e?.trim()?.length < 1) return;
        if (e?.trim()?.length > 30)
            return setErrors({
                tag_error: "Tags should be less than 30 characters.",
            });

        if (tags.includes(e?.trim()))
            return setErrors({ tag_error: "Tag Already Exist" });
        setTags([...tags, e]);
        setTag("");
    };

    const modTag = (e) => {
        setTag(e?.trim());
    };

    const removeTag = (e) => {
        setTags(tags.filter((tag) => tag !== e));
    };


    return (
        <div className='max-w-screen-xl mx-auto px-2 py-5 min-h-screen'>
            <h4 className='text-gray-900 font-semibold text-2xl text-center'>
                Create a Blog
            </h4>
            <div className='flex justify-end'>
                <button
                    className='border  px-3 rounded shadow-sm hover:shadow hover:bg-blue-50'
                    onClick={() => setPreview(!isPreview)}
                >
                    Preview
                </button>
            </div>
            <div
                className={
                    isPreview
                        ? "flex flex-col lg:grid lg:grid-cols-2 gap-4"
                        : ""
                }
            >
                <form
                    action=''
                    onSubmit={handleSubmit}
                    className=' p-2 flex flex-col gap-2'
                >
                    {/* blog title section  */}
                    <div className=''>
                        <label className='text-gray-900 font-semibold'>
                            Title
                        </label>
                        <input
                            className='inpt'
                            required
                            placeholder='Title'
                            type='text'
                            name='articleTitle'
                            value={articleTitle}
                            onChange={(e) => setarticleTitle(e.target.value)}
                        />
                    </div>
                    {/* blog category section  */}
                    <select
                        // required
                        onChange={(e) => setCategory(e.target.value)}
                        className='mb-7 w-full inpt'
                    >
                        <option>Select a Category</option>

                        {categoryData?.map((ite) => (
                            <option key={ite._id} value={ite.name}>
                                {ite.name}
                            </option>
                        ))}
                    </select>
                    {/* image uploader section  */}
                    <div className='flex items-center gap-3'>
                        <input
                            className='inpt'
                            // required
                            type='file'
                            name=''
                            accept='image/*'
                            id='image'
                            onChange={(e) =>
                                setimage((prev) => e.target.files[0])
                            }
                        />
                        <button
                            onClick={handleOnFileUpload}
                            className='border p-2 rounded bg-slate-400'
                        >
                            Upload
                        </button>
                    </div>
                    <div>
                        <Textarea
                            onChange={(e) => setSortContent(e.target.value)}
                            value={sortContent}
                            placeholder='sort content'
                            type='text'
                            name='details'
                            maxLength={200}
                        />
                    </div>
                    {/* add tags  */}
                    <div>
                        <label className='text-gray-900 font-semibold'>
                            Tags
                        </label>
                        {errors?.tag_error && (
                            <p className='text-red-500  text-sm'>
                                {errors?.tag_error}
                            </p>
                        )}
                        <div className='relative'>
                            <input
                                className='inpt'
                                placeholder='Tags'
                                type='text'
                                name='tags'
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                            {tag?.length > 0 && (
                                <button
                                    type='button'
                                    onClick={() => handleTags(tag)}
                                    className='flex gap-1 absolute top-6 z-20 left-0 bg-green-100 text-green-600 shadow-sm border p-2 rounded'
                                >
                                    <span>+</span>
                                    {tag}
                                </button>
                            )}
                        </div>
                        {tags?.length > 0 && (
                            <div className='flex gap-4 mt-2 flex-wrap'>
                                {tags?.map((ite) => (
                                    <div
                                        key={ite}
                                        className='bg-green-100  p-1 rounded border border-green-200 relative'
                                    >
                                        <button
                                            type='button'
                                            onClick={() => modTag(ite)}
                                            className='text-green-600'
                                        >
                                            {ite}
                                        </button>
                                        <button onClick={() => removeTag(ite)} type='button' className='shadow rounded absolute top-[-5px] right-[-10px] bg-red-400 p-1 text-white h-4 w-4 flex items-center justify-center'>x</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* blog main content  */}
                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        formats={formats}
                        onChange={setDetails}
                        value={details}
                        className='py-2 w-full '
                    />
                    <div className='mt-4 ml-2'>
                        <button
                            disabled={loading}
                            className='w-fit btn'
                            type='submit'
                        >
                            Add Blog
                        </button>
                    </div>
                </form>

                {/* preview  */}
                {isPreview && (
                    <div>
                        <h4>{articleTitle}</h4>
                        <h4>{category}</h4>
                        {photo && (
                            <Image
                                alt='photo for blog'
                                width={300}
                                height={300}
                                src={photo}
                            />
                        )}
                        <h4>{sortContent}</h4>
                        <div
                            id='preview'
                            dangerouslySetInnerHTML={{ __html: details }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddarticlesForm;
