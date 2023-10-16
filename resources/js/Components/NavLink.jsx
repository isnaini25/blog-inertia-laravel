import { Link, usePage } from "@inertiajs/react";

export default function NavLink(props) {
    const { url } = usePage();
    return (
        <li>
            <Link
                href={props.href}
                className={url === props.href ? "active" : ""}
            >
                {props.text}
            </Link>
        </li>
    );
}
