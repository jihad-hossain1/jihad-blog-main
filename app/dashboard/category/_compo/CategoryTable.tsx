'use client'

import React from 'react'

const ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    CATEGORIES: 'CATEGORIES',
    SET_ERROR: 'SET_ERROR',
}

const initialState = {
    loading: false,
    error: '',
    categories: []
}

function reducer ( state: any, action: { type: any; payload: any }) {
    switch (action.type) {
        case ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ACTION_TYPES.CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}


const CategoryTable = () => {
    const [ state, dispatch ] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true })
                const data = await fetch('/api/category')
                const json = await data.json()
                dispatch({ type: ACTION_TYPES.CATEGORIES, payload: json.result })
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false })
            } catch (error) {
                console.error(error)
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: (error as Error).message })
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false })
            }
        }

        fetchData()
    }, [])
  return (
    <div>CategoryTable</div>
  )
}

export default CategoryTable

