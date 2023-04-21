"use client";

import { useRef, useState } from "react";
import { User } from "@prisma/client";

import { api } from "~/utils/api";

interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    const { username, id, createdAt } = user;

    const inputRef = useRef<null | HTMLInputElement>(null);

    const utils = api.useContext();
    const deleteUser = api.user.deleteById.useMutation({
        onSuccess() {
            utils.user.invalidate();
        },
    });

 

    const editUser = api.user.editById.useMutation({
        onSuccess() {
            utils.user.invalidate();
        },
        onError(error, variables, context) {
            console.log({ error, variables, context });
        },
    });

    const [newUsername, setNewUsername] = useState(username);
    const [editMode, setEditMode] = useState(false);

    const handleDeleteUser = () => {
        const shouldDelete = confirm(`delete user ${username} \n are you sure ?`);

        if (shouldDelete) {
            deleteUser.mutate({ id });
        }
    };

    const handleEditUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        editUser.mutate({ id, username: newUsername });
        setEditMode(false);
    };

    return (
        <div className="m-4 rounded-lg p-4 shadow-md">
            <p className="text-right text-sm text-gray-400">{id}</p>
            <p className="my-2 text-gray-500">
                username: <span className="font-semibold text-gray-900">{username}</span>
            </p>
            <div className="flex gap-6">
                <button className="text-red-500" onClick={handleDeleteUser}>
                    Delete
                </button>
                <button
                    className="text-blue-500"
                    onClick={() => {
                        setEditMode((prev) => !prev);
                        setNewUsername(username);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 1);
                    }}
                >
                    Edit
                </button>
                <p className="flex-1 text-right text-sm text-gray-900">created at: {new Date(createdAt).toLocaleDateString()}</p>
            </div>
            {editMode && (
                <div className="mt-3">
                    <p className="mb-2">Enter new Username</p>
                    <form onSubmit={handleEditUsername}>
                        <input
                            type="text"
                            name="newUsername"
                            className="rounded-md bg-gray-100 py-1 px-3"
                            placeholder="new username"
                            value={newUsername}
                            ref={inputRef}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <button className="ml-2 rounded-md px-3 py-1 text-green-500 hover:bg-green-50">Ok</button>
                    </form>
                </div>
            )}
        </div>
    );
};
