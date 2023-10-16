import { Head, Link, useForm } from "@inertiajs/react";

export default function Auth() {
    const { data, setData, errors, processing, post } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register");
    };
    return (
        <>
            <Head title="Register" />
            <div className="hero min-h-[60vh] bg-base-200">
                <div className="hero-content">
                    <div className="card w-screen  max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                {errors.name && (
                                    <span className="label-text-alt text-error">
                                        {errors.name}
                                    </span>
                                )}
                            </div>
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
                                    type="submit"
                                    disabled={processing}
                                >
                                    Register
                                </button>
                                <Link
                                    href="/login"
                                    className="btn btn-mute mt-6"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
