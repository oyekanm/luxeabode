import { signOutAction } from '@/app/actions/authAction';
import { authClient } from '@/lib/auth-client';
import FunctionalButton from '@repo/ui/functionalButton';
import { LogOut } from 'lucide-react';
import React from 'react'

export default function LogoutBtn() {
    return (
        <form action={signOutAction}>
            <FunctionalButton type="submit" size="lg">
                <LogOut className='icon-size' /> Logout
            </FunctionalButton>
        </form>
    )
}
