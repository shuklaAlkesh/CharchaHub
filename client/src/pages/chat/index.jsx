import React, { useEffect } from 'react';  // Added useEffect import
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppStore } from '@/store';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainers from './components/empty-chat-container';
import ChatContainers from './components/chat-container';

const Chat = () => {
  const { userInfo,selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.error("Please complete your profile to continue.");
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {
        selectedChatType === undefined ? <EmptyChatContainers /> : <ChatContainers />
      }
    </div>
  );
}

export default Chat;
