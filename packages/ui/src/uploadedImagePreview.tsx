import { X } from 'lucide-react';
import { useState } from 'react';
import FunctionalButton from './functionalButton';

interface UploadedImagePreviewProps {
    files: { url: string, key: string }[];
    handleRemoveFile: (key: string, removeKey: (key: string) => void) => void;
}

export default function UploadedImagePreview({ files, handleRemoveFile }: UploadedImagePreviewProps) {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const removeKey = (key: string) => {
        setSelectedKeys((prev) => prev.filter((k) => k !== key))
    }

    const handleClick = (key: string) => {
        handleRemoveFile(key, removeKey)
        setSelectedKeys((prev) => [...prev, key])
    }
    return (
        <div className='flex flex-wrap gap-4'>
            {
                files.map((file, idx) => {
                    return (
                        <div key={idx} className="relative aspect-video bg-muted h-[12rem] w-[20rem] rounded-lg overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            {!selectedKeys.includes(file.key) && <FunctionalButton
                                type='button'
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 h-7 w-7 bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
                                click={() => handleClick(file.key)}
                            >
                                <X className="icon-size" />
                            </FunctionalButton>}
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                <img src={file.url} alt={file.url} className='w-full h-full object-cover' />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}
