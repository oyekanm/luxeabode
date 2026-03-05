import { Upload } from 'lucide-react'
import React from 'react'
import Dropzone from 'react-dropzone';
import { Spinner } from './spinner';


interface UploadImageCompProps {
    handleFileUpload: (file: File[]) => void;
    isUploading: boolean;
    multiple?: boolean;
    title?: string;
    description?: string;
    maxSize?: number;
}

export default function UploadImageComp(props: UploadImageCompProps) {
    const { handleFileUpload, isUploading, multiple = true, title, description, maxSize } = props
    return (
        <Dropzone
            // maxSize={!multiple ? 1 : undefined}
            accept={{ "image/*": [".jpeg", ".png", ".jpg"] }}
            onError={(err: Error) => console.log(err)}
            onDrop={(acceptedFiles) => {
                console.log("acceptedFiles", acceptedFiles);
                handleFileUpload(acceptedFiles);
            }}
            noDrag
            multiple={multiple}
            disabled={isUploading}
            maxSize={maxSize}
        >
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} disabled={isUploading} />
                        <div className="border-2 border-dashed border-border rounded-xl py-16 p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                            {isUploading ? (
                                <Spinner className="size-8!" />
                            ) : (
                                <>
                                    <Upload className="size-16 text-neutral-500 mx-auto" />
                                    <div className='space-y-1'>
                                        <p className="text-lg text-neutral-900 font-medium ">{title}</p>
                                        {description && <p className="text-sm text-neutral-500">{description}</p>}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}


