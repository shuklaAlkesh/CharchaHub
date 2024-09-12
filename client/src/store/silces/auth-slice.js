export const createAuthSlice = (set) => ({
    userInfo: undefined, // Initial state for userInfo
    setUserInfo: (userInfo) => set({ userInfo }), // Action to update userInfo
});
