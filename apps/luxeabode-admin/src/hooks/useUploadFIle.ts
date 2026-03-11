import type { ApiResponse } from '@repo/services/types'
import { useState } from 'react'

export default function useUploadFile() {
  const [isUploading, setIsUploading] = useState(false)
  const handleUpload = async (
    files: File[],
    onUploadSuccess: (file: { url: string; key: string }) => void,
  ) => {
    setIsUploading(true)
    try {
      //   const loadingToast = toast.loading("Uploading file...", {
      //     id: "loading-file-upload",
      //   });

      // Process each file sequentially
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'buildings')

        // console.log(file, formData.get("file"));

        const result = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!result.ok) {
          throw new Error('Failed to upload file')
        }

        const response: { url: string; key: string } = await result.json()

        // console.log(response)

        onUploadSuccess(response)
      }
    } catch (error: any) {
      console.error('Upload failed:', error)
      //   toast(error?.data?.error || "Upload failed. Please try again.", {
      //     duration: 5000,
      //     position: "top-right",
      //     id: "loading-file-upload",
      //   });
    } finally {
      setIsUploading(false)
    }
  }
  const handleDeleteFile = async (key: string, removeFile: () => void) => {
    try {
      const result = await fetch('/api/upload', {
        method: 'DELETE',
        body: JSON.stringify({ key }),
      })

      console.log(result)
      if (!result.ok) {
        const response: ApiResponse<null> = await result.json()
        console.log(response)
        throw new Error('Failed to delete file')
      }
      const response: ApiResponse<null> = await result.json()
      console.log(response)
      removeFile()
    } catch (error: any) {
      console.error('Delete failed:', error)
    }
  }

  return { handleUpload, isUploading, handleDeleteFile }
}
