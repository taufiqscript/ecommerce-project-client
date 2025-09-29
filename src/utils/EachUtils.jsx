import React, { Children } from 'react'

const EachUtils = ({ of, render }) => {
    if (!Array.isArray(of) || of.length === 0) return null
    return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>
}

export default EachUtils