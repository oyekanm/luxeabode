"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ChangeRoute({ path }: { path: string }) {
    const router = useRouter()

    useEffect(() => {
        router.push(path)
    }, [path])
    return null
}
