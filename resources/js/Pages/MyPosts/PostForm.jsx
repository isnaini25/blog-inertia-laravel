import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PostForm() {
    const postData = usePage().props.post;
    const { data, setData, post, patch, errors } = useForm({
        content: postData ? postData.content : "",
        title: postData ? postData.title : "",
    });

    const [preview, setPreview] = useState(postData ? postData.thumbnail : "");

    const [thumbnail, setThumbnail] = useState(null);
    const [oldThumbnail, setOldThumbnail] = useState(null);

    const imageHandler = (e) => {
        const imageFile = e.target.files[0];
        if (e.target.value.length !== 0) {
            setPreview(URL.createObjectURL(imageFile));
            setData("thumbnail", imageFile);
            if (postData) {
                setThumbnail(imageFile);
                setOldThumbnail(postData.thumbnail);
            }
        }
    };
    const removeImage = () => {
        setPreview("");
        setData("thumbnail", "");
        if (postData) {
            setThumbnail(null);
            setOldThumbnail(postData.thumbnail);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (postData) {
            router.post("/post/" + postData.id, {
                _method: "patch",
                content: data.content,
                title: data.title,
                thumbnail,
                oldThumbnail,
            });
        } else {
            post("/post");
        }
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
            ],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    return (
        <>
            <Head title={postData ? "Edit Post" : "Create New Post"} />
            <form
                className="w-2/3 max-sm:w-screen max-sm:p-3 mx-auto mt-6  flex flex-col bg-base-100 p-8 shadow-lg card"
                onSubmit={submit}
            >
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="title"
                        className="input input-bordered"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && (
                        <span className="label-text-alt text-error">
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className="form-control  mx-auto">
                    <div>
                        <img
                            src={preview}
                            style={{
                                width: "30vw",
                                maxHeight: "50vh",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div className="my-6 mx-auto">
                        <input
                            className="hidden"
                            type="file"
                            name="oldThumbnail"
                        />
                        <label
                            className="btn btn-sm btn-accent mr-2 "
                            htmlFor="thumbnail"
                        >
                            <input
                                type="file"
                                name="thumbnail"
                                className="hidden"
                                onChange={imageHandler}
                                accept="image/*"
                                id="thumbnail"
                            />
                            Upload Thumbnail (Max. 2 MB)
                        </label>

                        {errors.thumbnail && (
                            <span className="label-text-alt text-error">
                                {errors.thumbnail}
                            </span>
                        )}
                        {preview && (
                            <button
                                className="btn btn-xs hover:btn-error "
                                onClick={removeImage}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
                <div className="form-control mb-8">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={data.content}
                        onChange={(e) => setData("content", e)}
                        modules={modules}
                        formats={formats}
                    />
                    {errors.content && (
                        <span className="label-text-alt text-error">
                            {errors.content}
                        </span>
                    )}
                </div>
                <div className="h-32">
                    <button
                        className="btn btn-primary w-44 max-w-sm absolute bottom-12 right-12"
                        type="submit"
                    >
                        {postData ? "Save" : "Submit Post"}
                    </button>
                </div>
            </form>
        </>
    );
}
