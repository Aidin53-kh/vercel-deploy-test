import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "count",
    initialState: { value: 0 },
    reducers: {
        increment(count) {
            count.value++;
        },
        decrement(count) {
            count.value--;
        },
    },
});

export const { decrement, increment } = counterSlice.actions;
export default counterSlice.reducer;
