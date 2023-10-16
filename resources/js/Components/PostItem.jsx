import { Link } from "@inertiajs/react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import PersonIcon from "../Icons/PersonIcon";
import TimeIcon from "../Icons/TimeIcon";

dayjs.extend(relativeTime);
export default function PostItem(props) {
    const newPost = dayjs(new Date()).diff(props.created_at, "d");

    return (
        <Link
            className="card w-full bg-base-100  shadow-sm card-side items-center border my-3 "
            href={"/posts/" + props.slug}
        >
            <div className={`w-24 h-24 ml-3 box-content p-3 ${!props.sidepost&&'max-sm:hidden'} `}>
                <img
                    src={props.thumbnail}
                    alt={props.slug}
                    style={{
                        objectFit: "cover",
                        width: "inherit",
                        maxWidth: "inherit",
                        height: "inherit",
                    }}
                />
            </div>

            <div className={`card-body ${props.sidepost && "p-3" }`}>
                <h2
                    className={`card-title ${
                        props.sidepost && "text-sm" 
                    }`}
                >
                    {props.title}
                    {newPost === 0 && !props.sidepost && (
                        <div className="badge badge-secondary">NEW</div>
                    )}
                </h2>
                {!props.sidepost && <p>{props.excerpt}</p>}
                {/* <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div> */}

                <div
                    className={`flex max-sm:flex-col gap-1`}
                >
                    <span className="text-sm text-slate-600 flex  mr-3">
                        <PersonIcon /> {props.name}{" "}
                    </span>
                    <span className="text-sm text-slate-600 flex">
                        <TimeIcon />
                        {newPost === 0
                            ? dayjs(props.created_at).fromNow()
                            : dayjs(props.created_at).format(
                                  "ddd, DD/MMM/YYYY HH:MM"
                              )}
                    </span>
                </div>
            </div>
        </Link>
    );
}
