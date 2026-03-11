import React from 'react'

interface Props {
    title: string
    desc: string
    className?: string
}

export default function TitleDescContainer({ title, desc, className }: Props) {
    return (
        <div className={className}>
            <h1 className="page-title">
                {title}
            </h1>
            <p className="text-neutral-500 text-base">
                {desc}
            </p>
        </div>
    )
}
