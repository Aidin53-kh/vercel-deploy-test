"use client";

import { UserCard } from "~/components/UserCard";
import { api } from "~/utils/api";

const UsersPage = () => {
    const users = api.user.findAll.useQuery();

    return (
        <p>
            {users.data?.map((user) => (
                <UserCard user={user} key={user.id} />
            ))}
        </p>
    );
};

export default UsersPage;
