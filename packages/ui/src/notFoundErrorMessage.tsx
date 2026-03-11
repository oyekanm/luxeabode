import React from 'react'
import { cn } from './cn'
import FunctionalButton from './functionalButton'

interface Props {
    title: string
    desc: string
    className?: string
    btnText?: string,
    onClick?: () => void
}

export default function NotFoundErrorMessage({ title, desc, className, btnText, onClick }: Props) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-6 h-80", className)}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl">{desc}</p>
            {btnText && <FunctionalButton text={btnText} click={onClick} />}
        </div>
    )
}