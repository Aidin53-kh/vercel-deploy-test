"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

import { UserCard } from "~/components/UserCard";
import { api } from "~/utils/api";
import { useAppSelector } from "~/store";

export default function Home() {
    const [username, setUsername] = useState("");
    const counter = useAppSelector((state) => state.counter);
    const users = api.user.findAll.useQuery();

    const createUser = api.user.create.useMutation({
        onSuccess() {
            setUsername("");
            users.refetch();
        },
        onMutate({ username }) {
            if (username.length <= 3) {
                throw new Error("username most be more then 3 charecters");
            }
        },
        onError({ message }) {
            alert(message);
        },
    }); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createUser.mutate({ username });
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-5 flex items-center">
                    <h3 className="flex-1 text-xl">create user {counter.value}</h3>
                    <div className="flex gap-5">
                        <Link href="/" className="text-sm text-blue-500">
                            Go back
                        </Link>
                        <Link href="/settings" className="text-sm text-blue-500">
                            Settings{" "}
                        </Link>
                    </div>
                </div>
                <label htmlFor="username" className="mb-2 block text-sm">
                    username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    className="mb-4 rounded-md bg-gray-100 py-1 px-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button className="ml-2 rounded-lg bg-blue-50 px-5 py-1 text-blue-500 disabled:bg-blue-200" disabled={createUser.isLoading}>
                    Create
                </button>
            </form>

            <section className="max-w-xl">
                <h2>list of users</h2>
                <Suspense fallback={<p>loading...</p>}>
                    {users.data?.map((user) => (
                        <UserCard user={user} key={user.id} />
                    ))}
                </Suspense>
            </section>
        </div>
    );
}
