import { Link } from "@inertiajs/react";
import SideLink from "./SideLink";
import HomeIcon from "../Icons/HomeIcon";
import PostIcon from "../Icons/PostIcon";

export default function Sidebar() {
    return (
        <aside className="h-screen bg-base-100 w-56  fixed z-30">
            <div className="flex justify-center mt-6 mb-8">
                <Link className="font-bold text-2xl">My Blogs</Link>
            </div>
            <ul className="menu">
                <Link className="btn btn-primary" href={route("post.create")}>
                    New Post
                </Link>
                <SideLink text="Home" href="/" icon={<HomeIcon />} />
                <SideLink text="My Post" href="/post" icon={<PostIcon />} />
            </ul>
        </aside>
    );
}
