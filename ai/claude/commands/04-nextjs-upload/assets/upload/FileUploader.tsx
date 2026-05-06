"use client";

import { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import Uppy, { type UppyFile } from '@uppy/core'
import ImageEditorPlugin from '@uppy/image-editor'
import XHR from '@uppy/xhr-upload';

import '@uppy/react/css/style.css'
import '@uppy/react/css/image-editor.css'

import {
  Dropzone,
  FilesGrid,
  UppyContextProvider,
} from '@uppy/react'

import ImageEditor from './ImageEditor'

import { RemoteSource } from './sources/RemoteSource'
import ScreenCapture from './sources/ScreenCapture'
import Webcam from './sources/Webcam'

export interface FileUploaderRef {
  getFiles: () => UppyFile<any, any>[]
  getUppy: () => Uppy
}

const FileUploader = forwardRef<FileUploaderRef>(function FileUploader(props, ref) {

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [modalPlugin, setModalPlugin] = useState<'webcam' | 'dropbox' | 'screen-capture' | 'image-editor' | null> (null)
  const [selectedFile, setSelectedFile] = useState<UppyFile<any, any> | null>(
    null,
  )

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
      },
      allowMultipleUploads: true,
      debug: true,
      meta: {
        // filename: "test"
      }
    })
    .use(ImageEditorPlugin)

    //.use(Tus, { endpoint: '/api/tus' })
    .use(XHR, { endpoint: '/api/xhr' })
  )

  // Expose uppy methods via ref
  useImperativeHandle(ref, () => ({
    getFiles: () => {
      const files = uppy.getFiles()
      return files
    },
    getUppy: () => uppy,
  }))

  function openImageEditorModal(file: UppyFile<any, any>) {
    // https://github.com/transloadit/uppy/issues/6148
    if (!file.type.startsWith('image/')) return
    setSelectedFile(file)
    setModalPlugin('image-editor')
    dialogRef.current?.showModal()
  }

  function closeModal() {
    setModalPlugin(null)
    setSelectedFile(null)
    dialogRef.current?.close()
  }


  return (
    <UppyContextProvider uppy={uppy}>

      <article>
        <h2 className="text-2xl my-4">File Upload</h2>
        <Dropzone />
        <FilesGrid columns={3} editFile={openImageEditorModal} />
      </article>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-gray-500/50 rounded-lg shadow-xl p-0 fixed inset-0 m-auto"
      >
        {(() => {
          switch (modalPlugin) {
            case 'webcam':
              return <Webcam close={() => closeModal()} />
            case 'dropbox':
              return <RemoteSource id="Dropbox" close={() => closeModal()} />
            case 'screen-capture':
              return <ScreenCapture close={() => closeModal()} />
            case 'image-editor':
              return selectedFile ? (
                <ImageEditor file={selectedFile} close={() => closeModal()} />
              ) : null
            default:
              return null
          }
        })()}
      </dialog>
    </UppyContextProvider>
  );
})

export default FileUploader
