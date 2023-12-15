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
      editorUrl="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"
     />
  )
}

export default CKEditorUI
