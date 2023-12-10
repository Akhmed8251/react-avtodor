import React, { useState } from 'react'
import { CKEditor } from 'ckeditor4-react'

const CKEditorUI = ({ onChange, initData = '' }) => {

  return (
    <CKEditor
      config={{
        removePlugins: "image"
      }}
      initData={initData}
      onChange={onChange}
      editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js"
     />
  )
}

export default CKEditorUI