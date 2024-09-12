import { create } from "zustand";
import { createAuthSlice } from "./silces/auth-slice.js";
import { createChatSlice } from "./silces/chat-slice.js";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}));

