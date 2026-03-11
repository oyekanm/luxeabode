import React from 'react'
import { cn } from './cn'

interface Props {
    title: string
    desc: string
    className?: string
}

export default function ServerErrorMessage({ title, desc, className }: Props) {
    return (
        <div className={cn("flex flex-col items-center justify-center h-80", className)}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl">{desc}</p>
        </div>
    )
}