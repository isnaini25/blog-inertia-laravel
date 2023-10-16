import { Link, usePage } from "@inertiajs/react";

export default function SideLink(props) {
    const { url } = usePage();

    return (
        <li className="mt-2">
            <Link
                href={props.href}
                className={url === props.href ? "active" : ""}
            >
                {props.icon}
                {props.text}
            </Link>
        </li>
    );
}
