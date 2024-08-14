"use client";

import ModalHeadless from "@/components/Modal/ModalHeadless";
import { reducer, initialState, ACTION_TYPES } from "@/reducer/categoryReducer";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryTable = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const fetchData = React.useCallback(async () => {
        try {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
            const data = await fetch("/api/category");
            const json = await data.json();
            dispatch({ type: ACTION_TYPES.CATEGORIES, payload: json });
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
        } catch (error) {
            console.error(error);
            dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
        }
    }, []);

    const fetchSubData = React.useCallback(async () => {
        try {
            dispatch({ type: ACTION_TYPES.SET_SUB_LOADING, payload: true });
            const data = await fetch("/api/category/sub-category");
            const json = await data.json();
            dispatch({ type: ACTION_TYPES.SET_SUB_CATEGORIES, payload: json });
            dispatch({ type: ACTION_TYPES.SET_SUB_LOADING, payload: false });
        } catch (error) {
            console.error(error);
            dispatch({ type: ACTION_TYPES.SET_SUB_ERROR, payload: error.message });
            dispatch({ type: ACTION_TYPES.SET_SUB_LOADING, payload: false });
        }
    }, []);

    React.useEffect(() => {
        if(state.add) fetchData();
    }, [fetchData, state.add]);

    React.useEffect(() => {
        if(state.subAdd) fetchSubData();
    }, [fetchSubData, state.subAdd]);

    const handleAddCategory = async () => {
        try {
            dispatch({ type: ACTION_TYPES.SET_ADD, payload: false });
            dispatch({ type: ACTION_TYPES.SET_MODAL_STATE, payload: true });
            const data = await fetch("/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: state.categoryName }),
            });
            const json = await data.json();

            if (json.result) {
                dispatch({ type: ACTION_TYPES.SET_ADD, payload: true });
                dispatch({
                    type: ACTION_TYPES.SET_MODAL_STATE,
                    payload: false,
                });
                dispatch({ type: ACTION_TYPES.SET_CATEGORY_NAME, payload: "" });
                // fetchData();
            }
            if (json.error) {
                dispatch({
                    type: ACTION_TYPES.SET_MODAL_STATE,
                    payload: false,
                });
                dispatch({
                    type: ACTION_TYPES.SET_ERROR,
                    payload: json.error.message,
                });
            }
            // fetchData();
        } catch (error) {}
    };

    const handleAddSubCategory = async () => {
        try {
            dispatch({ type: ACTION_TYPES.SET_SUB_ADD, payload: false });
            dispatch({ type: ACTION_TYPES.SET_SUB_LOADING, payload: true });
            const data = await fetch("/api/category/sub-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: state.subCategoryName, catId: state.catId }),
            });
            const json = await data.json();

            if (json.result) {
                dispatch({ type: ACTION_TYPES.SET_SUB_ADD, payload: true });
                toast.success('Sub Category Created');
                dispatch({
                    type: ACTION_TYPES.SET_SUB_LOADING,
                    payload: false,
                });
                dispatch({ type: ACTION_TYPES.SET_SUB_CATEGORY_NAME, payload: "" });
                dispatch({ type: ACTION_TYPES.SET_CAT_ID, payload: "" });
                // fetchData();
            }
            if (json.error) {
                toast.error(json.error);
                dispatch({
                    type: ACTION_TYPES.SET_SUB_LOADING,
                    payload: false,
                });
                dispatch({
                    type: ACTION_TYPES.SET_SUB_ERROR,
                    payload: json.error.message,
                });
            }
            // fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {/* category table  */}
            <div className='flex justify-end py-2'>
                <button
                    onClick={() =>
                        dispatch({
                            type: ACTION_TYPES.SET_MODAL_STATE,
                            payload: true,
                        })
                    }
                    className='btn'
                >
                    Add Category
                </button>
            </div>

            <div>
                <table className='w-full border'>
                    <thead>
                        <tr className='bg-gray-300 shadow rounded'>
                            <th className='px-4 py-3 text-start'>Uid</th>
                            <th className='px-4 py-3 text-start'>Name</th>
                            <th className='px-4 py-3 text-start'>Created At</th>
                            <th className='px-4 py-3 text-end'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {state.loading ? [...Array(5)].map((_,ind) => <tr key={ind}><td className='px-4 py-3 text-start h-10 w-full bg-zinc-400/90 border-b border-white  animate-pulse'></td></tr>) :  state.categories?.map((category) => (
                            <tr
                                key={category?._id}
                                className='border-b border-gray-300 hover:bg-gray-100 '
                            >
                                <td className='px-4 py-3 text-start'>
                                    {category?.uid}
                                </td>
                                <td className='px-4 py-3 text-start'>
                                    {category?.name}
                                </td>
                                <td className='px-4 py-3 text-start'>
                                    {new Date(
                                        category?.createdAt,
                                    ).toLocaleDateString("en-US")}
                                </td>
                                <td className='px-4 py-3 text-end'>
                                    <button className='btn'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalHeadless isOpen={state.modalState} type={ACTION_TYPES.SET_MODAL_STATE} dispatch={dispatch}>
                <div className='flex flex-col gap-2 p-5'>
                    <h4 className='text-center text-2xl pb-3 '>Add Category</h4>
                    <input
                        placeholder='Category Name'
                        className='inpt'
                        type='text'
                        name=''
                        value={state.categoryName}
                        onChange={(e) =>
                            dispatch({
                                type: ACTION_TYPES.SET_CATEGORY_NAME,
                                payload: e.target.value,
                            })
                        }
                        id=''
                    />
                    <button
                        className='btn mt-3 w-fit'
                        disabled={!state.categoryName || state.catAddLoading}
                        onClick={handleAddCategory}
                    >
                        Add{" "}
                        {state.catAddLoading && (
                            <AiOutlineLoading3Quarters className='animate-spin' />
                        )}
                    </button>
                </div>
            </ModalHeadless>

            {/* sub category table */}
            <div className='flex justify-end py-2'>
                <button
                    onClick={() =>
                        dispatch({
                            type: ACTION_TYPES.SET_SUB_MODAL_STATE,
                            payload: true,
                        })
                    }
                    className='btn'
                >
                    Add Sub-Category
                </button>
            </div>

            <div>
                <table className='w-full border'>
                    <thead>
                        <tr className='bg-gray-300 shadow rounded'>
                            <th className='px-4 py-3 text-start'>Uid</th>
                            <th className='px-4 py-3 text-start'>Name</th>
                            <th className='px-4 py-3 text-start'>Created At</th>
                            <th className='px-4 py-3 text-start'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {state.subLoading ? [...Array(5)].map((_,ind) => <tr key={ind}><td className='px-4 py-3 text-start h-10 w-full bg-zinc-400/90 border-b border-white  animate-pulse'></td></tr>) :  state.subCategories?.map((category) => (
                            <tr
                                key={category?._id}
                                className='border-b border-gray-300 hover:bg-gray-100 '
                            >
                                <td className='px-4 py-3 text-start'>
                                    {category?.uid}
                                </td>
                                <td className='px-4 py-3 text-start'>
                                    {category?.name}
                                </td>
                                <td className='px-4 py-3 text-start'>
                                    {new Date(
                                        category?.createdAt,
                                    ).toLocaleDateString("en-US")}
                                </td>
                                <td className='px-4 py-3 text-start'>
                                    <button className='btn'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalHeadless isOpen={state.subModalState} type={ACTION_TYPES.SET_SUB_MODAL_STATE} dispatch={dispatch}>
                <div className='flex flex-col gap-2 p-5'>
                    <h4 className='text-center text-2xl pb-3 '>Add Sub-Category</h4>


                    <div className="flex flex-col gap-4">
                    <select className='inpt' value={state.catId} onChange={(e) => dispatch({ type: ACTION_TYPES.SET_CAT_ID, payload: e.target.value })}>
                        <option value="">--- Select Category ---</option>
                        {

                            state.categories?.map((category) => <option key={category?._id} value={category?.uid}>{category?.name}</option>)
                        }
                    </select>
                    <input
                        placeholder='Category Name'
                        className='inpt'
                        type='text'
                        name=''
                        value={state.subCategoryName}
                        onChange={(e) =>
                            dispatch({
                                type: ACTION_TYPES.SET_SUB_CATEGORY_NAME,
                                payload: e.target.value,
                            })
                        }
                        id=''
                    />
                    </div>
                    <button
                        className='btn mt-3 w-fit'
                        disabled={state.subLoading}
                        onClick={handleAddSubCategory}
                    >
                        Add{" "}
                        {state.subLoading && (
                            <AiOutlineLoading3Quarters className='animate-spin' />
                        )}
                    </button>
                </div>
            </ModalHeadless>
        </div>
    );
};

export default CategoryTable;
