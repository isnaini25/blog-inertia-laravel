import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Auth() {
    const { data, setData, errors, processing, post } = useForm({
        email: "",
        password: "",
    });

    const loginFailed = usePage().props.flash?.message;
    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };
    return (
        <>
            <Head title="Login" />
            <div className="hero min-h-[60vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-screen max-w-sm  shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submit}>
                            {loginFailed && (
                                <span className="label-text-alt text-error">
                                    {loginFailed}
                                </span>
                            )}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <span className="label-text-alt text-error">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <span className="label-text-alt text-error">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Login
                                </button>
                                <Link
                                    href="/register"
                                    className="btn btn-mute mt-6"
                                >
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
