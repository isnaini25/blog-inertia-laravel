import PostItem from "./PostItem";

export default function SidePosts({ posts }) {
    return (
        <aside className="w-1/3 max-sm:w-full">
            <h3 className="text-lg font-bold">Other Posts</h3>
            <ul>
                {posts.map((post) => (
                    <PostItem {...post} key={post.id} sidepost={true} />
                ))}
            </ul>
        </aside>
    );
}
