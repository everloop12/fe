import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ condition, children }) {
    if (!condition) {
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected