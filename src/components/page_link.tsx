import Link from "next/link";

export default function PageLink({ href, text }: { href: string, text: string }) {
    return (
        <Link href={href} className="btn btn-primary">
          {text}
        </Link>
    )
}