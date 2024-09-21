export const createAuthSlice = (set) => ({
    userInfo: null, 
    setUserInfo: (userInfo) => set({ userInfo }), 
    isLogoutAllowed: false, 
    setIsLogoutAllowed: (isLogoutAllowed) => set({ isLogoutAllowed }), 
    messages: [],
    setMessages: (newMessages) => set({ messages: newMessages }),
    clearMessages: () => set({ messages: [] }),

});
