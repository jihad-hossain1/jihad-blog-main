"use client";

import ModalHeadless from "@/components/Modal/ModalHeadless";
import { reducer, initialState, ACTION_TYPES } from "@/reducer/categoryReducer";
import React from "react";
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

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    console.log(state);

    const handleAddCategory = async () => {
        try {
            dispatch({ type: ACTION_TYPES.SET_MODAL_STATE, payload: true });
            const data = await fetch("/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: state.categoryName }),
            })
            const json = await data.json();
           
            if(json.result){
                dispatch({ type: ACTION_TYPES.SET_MODAL_STATE, payload: false });
                dispatch({ type: ACTION_TYPES.SET_CATEGORY_NAME, payload: "" });
                // fetchData();
            }
            if(json.error){
                dispatch({ type: ACTION_TYPES.SET_MODAL_STATE, payload: false });
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: json.error.message });
            }
            // fetchData();
        } catch (error) {
            
        }
    };
    return <div>
        <button onClick={()=>dispatch({type: ACTION_TYPES.SET_MODAL_STATE, payload: true})} >Add Category</button>
            <ModalHeadless isOpen={state.modalState} dispatch={dispatch}>
                <div className="flex flex-col gap-2">
                    <h4 className="text-center text-2xl pb-3 ">Add Category</h4>
                    <input placeholder="Category Name" className="inpt" type="text" name="" value={state.categoryName} onChange={(e)=>dispatch({type: ACTION_TYPES.SET_CATEGORY_NAME, payload: e.target.value})} id="" />
                    <button disabled={!state.categoryName || state.catAddLoading } onClick={handleAddCategory}>Add {state.catAddLoading && <AiOutlineLoading3Quarters className="animate-spin"/>}</button>
                </div>
            </ModalHeadless>
    </div>;
};

export default CategoryTable;
