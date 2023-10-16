import { Link, useForm, usePage } from "@inertiajs/react";
import NavLink from "./NavLink";

export default function Navbar() {
    const { auth } = usePage().props;
    const { processing, delete: destroy } = useForm();
    const { data, setData, get } = useForm({
        keyword: ''
    })

    const submit = (e) => {
        e.preventDefault();
        destroy("/logout");
    };

    const search = (e) => {
        e.preventDefault()
        get('/search', {
            keyword: data.keyword
        })
    }
    return (
        <nav className="navbar bg-primary shadow-lg fixed z-20 ">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" href="/">
                    My Blog
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <form action="" onSubmit={search}>
                    <input
                        type="text"
                        placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                            name="keyword"
                            value={data.keyword}
                            onChange={(e) => setData('keyword', e.target.value) }
                    />
                    </form>
                </div>

                {auth.user ? (
                    <>
                        <div className="flex-none sm:hidden">
                            <ul className="menu menu-horizontal px-1">
                                <NavLink
                                    href="/post/create"
                                    text="Create Post"
                                />
                                <NavLink href="/post" text="My Posts" />
                            </ul>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer mr-3">
                                {auth.user.name}
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <form onSubmit={submit}>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <NavLink href="/login" text="Login" />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
