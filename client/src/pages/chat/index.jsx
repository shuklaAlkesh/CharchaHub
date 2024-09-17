import React, { useEffect } from 'react';  // Added useEffect import
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppStore } from '@/store';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainers from './components/empty-chat-container';
import ChatContainers from './components/chat-container';

const Chat = () => {
  const { userInfo,selectedChatType,
    isUploading,
    isDownloading,
    fileUploadingProgress,
    fileDownloadingProgress, } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.error("Please complete your profile to continue.");
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      {
        isUploading && (
          <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
            <h5 className='text-5xl animate-pulse'>Uploading file</h5>
            {fileUploadingProgress}%
          </div>
        )
      }

      {
        isDownloading && (
          <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
            <h5 className='text-5xl animate-pulse'>Downloding file</h5>
            {fileDownloadingProgress}%
          </div>
        )
      }
      <ContactsContainer />
      {
        selectedChatType === undefined ? <EmptyChatContainers /> : <ChatContainers />
      }
    </div>
  );
}

export default Chat;
