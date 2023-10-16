import { useEffect, useRef } from "react";
import PersonIcon from "../Icons/PersonIcon";
import TimeIcon from "../Icons/TimeIcon";
import dayjs from "dayjs";

export default function Post({ post }) {
    const content = useRef();

    useEffect(() => {
        content.current.innerHTML = post.content;
    }, [post.content]);
    return (
        <article className="w-1/2 max-sm:w-[90vw] mb-6">
            <div className="my-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <div className="flex">
                    <span className="text-sm text-slate-600 flex">
                        <PersonIcon /> {post.name}
                    </span>
                    <span className="text-sm text-slate-600 flex ml-3">
                        <TimeIcon />
                        {dayjs(post.created_at).format(
                            "ddd, DD/MMM/YYYY HH:MM"
                        )}
                    </span>
                </div>
            </div>
            <div className="max-w-lg my-6">
                <img src={post.thumbnail} />
            </div>
            <div ref={content}></div>
        </article>
    );
}
