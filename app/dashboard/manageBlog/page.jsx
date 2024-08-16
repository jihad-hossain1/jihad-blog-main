"use client";

import { reducer, ACTION_TYPES, initialState } from "@/reducer/blogReducer";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useReducer } from "react";
import { PiEyeLight, PiTrashSimpleLight } from "react-icons/pi";
import { VscEdit } from "react-icons/vsc";
import { revalidate } from "@/helpers/revalidate";

const ManageBlogPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { toast } = useToast();

    const fetchBlogs = useCallback(async () => {
        const query = new URLSearchParams({
            page: state.page,
            pageSize: state.pageSize,
            searchTerm: state.searchTerm,
            limit: state.limit,
            sortBy: "createdAt",
            sortOrder: "desc",
        });

        try {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });

            const res = await fetch(
                `/api/blogs/pagination?${query.toString()}`,
                {
                    cache: "no-store",
                },
            );

            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });

            if (!res.ok) {
                dispatch({
                    type: ACTION_TYPES.SET_ERROR,
                    payload: res.statusText,
                });
            } else {
                const data = await res.json();
                dispatch({ type: ACTION_TYPES.SET_BLOGS, payload: data?.data });
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: null });
            }
        } catch (error) {
            dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error?.message });
        }
    }, [state.page, state.pageSize, state.searchTerm, state.limit]);

    useEffect(() => {
       if(state.isAdd) fetchBlogs();
    }, [fetchBlogs, state.isAdd]);

    const handleDeleteItme = async (id) => {
        const confirmed = confirm("are you sure?");

        if (confirmed) {
            dispatch({ type: ACTION_TYPES.SET_IS_ADD, payload: false });
            const res = await fetch(`/api/blogs?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                dispatch({ type: ACTION_TYPES.SET_IS_ADD, payload: true });
                revalidate("blog");
                toast({
                    title: "blog delete successfull",
                });
                router.refresh();
            }
        }
    };
    return (
        <div>
            <div className='flex justify-center p-4'>
                <input
                    className='max-sm:w-11/12 md:w-1/3 p-2 border border-gray-300 focus:outline-none'
                    type='text'
                    placeholder='Search...'
                    value={state.searchTerm}
                    onChange={(e) =>
                        dispatch({
                            type: ACTION_TYPES.SET_SEARCH_TERM,
                            payload: e.target.value,
                        })
                    }
                />
            </div>

            {state.error && <div>Error: {state.error}</div>}

            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th className='text-start px-4 py-3'>Title</th>
                            <th className='text-start px-4 py-3'>Category</th>
                            <th className='text-start px-4 py-3'>
                                Short Content
                            </th>
                            <th className='text-start px-4 py-3'>Created At</th>
                            <th className='text-start px-4 py-3'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {state.loading
                            ? [...Array(10)].map((key) => (
                                  <tr key={key}>
                                      <td className='text-start px-4 py-2 border-b border-white animate-pulse bg-zinc-400 w-full h-10 '></td>
                                      <td className='text-start px-4 py-2 border-b border-white animate-pulse bg-zinc-400 w-full h-10 '></td>
                                      <td className='text-start px-4 py-2 border-b border-white animate-pulse bg-zinc-400 w-full h-10 '></td>
                                      <td className='text-start px-4 py-2 border-b border-white animate-pulse bg-zinc-400 w-full h-10 '></td>
                                      <td className='text-start px-4 py-2 border-b border-white animate-pulse bg-zinc-400 w-full h-10 '></td>
                                  </tr>
                              ))
                            : state.blogs?.map((blog, _index) => (
                                  <tr key={_index} className='hover:bg-white'>
                                      <td className='text-start px-4 py-2 border-b border-gray-200'>
                                          {blog?.articleTitle?.slice(0, 20)}
                                      </td>
                                      <td className='text-start px-4 py-2 border-b border-gray-200'>
                                          {blog?.articleCategory}
                                      </td>
                                      <td className='text-start px-4 py-2 border-b border-gray-200'>
                                          {blog?.sortContent?.slice(0, 20)}
                                      </td>
                                      <td className='text-start px-4 py-2 border-b border-gray-200'>
                                          {new Date(
                                              blog?.createdAt,
                                          ).toLocaleDateString()}
                                      </td>
                                      <td className='text-start px-4 py-2 border-b border-gray-200'>
                                          <td>
                                              <div className='flex itms-center space-x-4 justify-end'>
                                                  <button
                                                      onClick={() =>
                                                          handleDeleteItme(
                                                              blog?._id,
                                                          )
                                                      }
                                                  >
                                                      <PiTrashSimpleLight className='text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300' />
                                                  </button>
                                                  <Link
                                                      href={`/updateBlog/${blog?._id}`}
                                                  >
                                                      <VscEdit className='text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300' />
                                                  </Link>
                                                  <button>
                                                      <PiEyeLight className='text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300' />
                                                  </button>
                                              </div>
                                          </td>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <section className='flex justify-end mt-6'>
                <div className='flex gap-2 md:flex-row flex-col'>
                    <select
                        className='border px-10 py-2 rounded border-gray-200'
                        value={state.pageSize}
                        onChange={(e) =>
                            dispatch({
                                type: ACTION_TYPES.SET_PAGE_SIZE,
                                payload: Number(e.target.value),
                            })
                        }
                    >
                        <option value={""} disabled>
                            Show Blogs
                        </option>
                        {[10, 20, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={state.page === 1}
                        onClick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_PAGE,
                                payload: state.page - 1,
                            })
                        }
                        className='border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center'
                    >
                        Previous
                    </button>
                    <h4 className='border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center'>
                        {state.page}
                    </h4>
                    <button
                        disabled={state.blogs?.length < state.pageSize}
                        onClick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_PAGE,
                                payload: state.page + 1,
                            })
                        }
                        className='border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center'
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ManageBlogPage;
