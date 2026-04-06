import { signOutAction } from '@/app/actions/authAction';
import FunctionalButton from '@repo/ui/functionalButton';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleLogout = async () => {
        await signOutAction()
        // await queryClient.invalidateQueries({ queryKey: ['account', 'me'] })
        queryClient.removeQueries({ queryKey: ['account'] })
        // router.push("/")
    }
    return (
        <form action={handleLogout}>
            <FunctionalButton type="submit" size="lg">
                <LogOut className='icon-size' /> Logout
            </FunctionalButton>
        </form>
    )
}
