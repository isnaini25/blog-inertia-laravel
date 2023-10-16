import { usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    return (
        <>
            <Navbar />
            <main className="flex bg-base-200  ">
                {auth.user && <Sidebar />}
                <div className={`flex flex-col items-center w-full pt-32 min-h-screen mb-8 ${auth.user&&'ml-56'}`}>
                    {children}
                </div>
            </main>
        </>
    );
}
