import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({ to, title }: { to: string, title: string }) {
    return (
        <Link
            href={to}
            className="inline-flex items-center gap-2 text-base font-medium text-neutral-500 hover:text-primary mb-6 transition-colors group"
        >
            <ChevronLeft className="icon-size group-hover:-translate-x-1 transition-transform" />
            {title}
        </Link>
    )
}