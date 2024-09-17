export const createChatSlice = (set,get)  =>({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages : [],
    directMessagesContacts:[],
    isUploading:false,
    isDownloading:false,
    fileUploadingProgress:0,
    fileDownloadingProgress:0,
    setIsUploading:(isUploading) => set({isUploading}),
    setIsDownloading:(isDownloading) => set({isDownloading}),
    setFileUploadProgress:(fileUploadingProgress) => set({fileUploadingProgress}),
    setFileDownloadProgress:(fileDownloadingProgress) => set({fileDownloadingProgress}),
    
    setSelectedChatType:(selectedChatType) =>set({selectedChatType}),
    setSelectedChatData:(selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages:(selectedChatMessages) => set({selectedChatMessages}),
    setDirectMessagesContacts:(directMessagesContacts) => set({directMessagesContacts}),
    closeChat:()=>set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages : [],
    }),

    addMessage:(message) => {
        const selectedChatMessage = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages:[
                ...selectedChatMessage,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel" 
                        ? message.recipient 
                        : message.recipient._id,
                    sender:
                        selectedChatType === "channel" 
                        ? message.sender 
                        : message.sender._id,
                }
            ]
        })
    }
});