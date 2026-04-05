'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type * as React from 'react'
import { getQueryClient } from '@/lib/helpers/get-query-client'
import { Toaster } from 'sonner'

export default function QueryClientProviders({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
            <Toaster duration={5000} position="top-right" className='text-base' />
        </QueryClientProvider>
    )
}