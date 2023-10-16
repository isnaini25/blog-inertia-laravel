import { Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DotsIcon from "../Icons/DotsIcon";

dayjs.extend(relativeTime);
export default function MyPostItem(props) {
    const deletePost = () => {
        router.delete("/post/" + props.id);
    };
    return (
        <div className="flex  bg-base-100 rounded-lg shadow-md border p-3 w-full my-3">
            <Link className="flex w-full" href={"/post/my/" + props.slug}>
                <div className="w-24 h-24">
                    <img
                        src={props.thumbnail}
                        alt={props.slug}
                        style={{
                            objectFit: "cover",
                            width: "inherit",
                            height: "inherit",
                        }}
                    />
                </div>
                <div className="p-3 w-11/12 flex flex-col justify-between">
                    <h2> {props.title}</h2>
                    <p className="text-xs">
                        Published at :{" "}
                        {dayjs(props.created_at).format("DD MMM YYYY HH:mm")}
                    </p>
                </div>
            </Link>
            <div className="relative  ">
                <div className="dropdown absolute right-0  ">
                    <label tabIndex={0} className="hover:cursor-pointer">
                        <DotsIcon />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                    >
                        <li>
                            <button
                                onClick={deletePost}
                                className="hover:btn-error"
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
