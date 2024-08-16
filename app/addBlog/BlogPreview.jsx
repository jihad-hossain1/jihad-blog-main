import React from 'react'

import './preview.css'

const BlogPreview = ({details}) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: details}}></div>
  )
}

export default BlogPreview