import { Head, Link } from "@inertiajs/react";
import PostItem from "../Components/PostItem";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import PersonIcon from "../Icons/PersonIcon";
import TimeIcon from "../Icons/TimeIcon";

dayjs.extend(relativeTime);
export default function Home({ posts }) {
    const keyword = new URLSearchParams(window.location.search).get('keyword')
    const allPosts = keyword ? posts: posts.slice(1)
    if (posts.length < 1 &&keyword) {
       return <>
            <Head title="Search" />
           <p>Can't find post that contains '{keyword }'</p>
            </>
    }
    return (
        <>
            <Head title="Home" />
            {!keyword &&
            <div
                className="flex justify-center mt-4 max-w-[70vw] max-sm:max-w-[90vw]"
               
            >
                    <Link
                        className="card bg-base-100 shadow-md border "
                        href={"/posts/" + posts[0].slug}
                    >
                        <figure style={{ maxHeight: "50vh", height: "100%" }}>
                            <img src={posts[0].thumbnail} alt={posts[0].slug} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {posts[0].title}{" "}
                                <div className="badge badge-warning">Latest</div>
                            </h2>
                            <p>{posts[0].excerpt}</p>
                            <div className="card-actions justify-end">
                                <span className="text-sm text-slate-600 flex">
                                    <PersonIcon /> {posts[0].name}{" "}
                                </span>
                                <span className="text-sm text-slate-600 flex ml-3">
                                    <TimeIcon />

                                    {dayjs(posts[0].created_at).fromNow()}
                                </span>
                            </div>
                        </div>
                    </Link>
            </div>
                    }
            <div className="grid  justify-items-center mt-4 w-9/12 max-sm:w-[90vw]">
                {allPosts.map((post) => (
                    <PostItem {...post} key={post.id} />
                ))}
            </div>
        </>
    );
}
