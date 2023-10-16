import { Head } from "@inertiajs/react";
import MyPostItem from "../../Components/MyPostItem";

export default function MyPosts({ posts }) {
    return (
        <>
            <Head title="My Posts" />
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold">My Posts</h1>
                <div style={{ width: "60vw" }}>
                    {posts.map((post) => {
                        return <MyPostItem {...post} key={post.id} />;
                    })}
                </div>
            </div>
        </>
    );
}
