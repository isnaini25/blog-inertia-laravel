import { useEffect, useRef } from "react";
import PersonIcon from "../Icons/PersonIcon";
import TimeIcon from "../Icons/TimeIcon";
import dayjs from "dayjs";
import Post from "../Components/Post";
import { Head, usePage } from "@inertiajs/react";
import SidePosts from "../Components/SidePosts";

export default function DetailPost({ post, posts }) {
    const url = usePage().url;
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta property="og:title" content={post.title} />
                <meta property="og:site_name" content="My Blog" />
                <meta property="og:url" content={url} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={post.thumbnail} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@so_ourcandy" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.thumbnail}></meta>
            </Head>
            <div className="flex justify-center justify-around  max-sm:flex-col p-4">
                <Post post={post} />
                <SidePosts posts={posts} />
            </div>
        </>
    );
}
