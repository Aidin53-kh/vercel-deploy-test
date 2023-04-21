"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "~/store";
import { decrement, increment } from "~/store/countSlice";

export default function Settings() {
    const counter = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();

    return (
        <>
            <h1>settings {counter.value}</h1>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <Link href="/">go back</Link>
        </>
    );
}
