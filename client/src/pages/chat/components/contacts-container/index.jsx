import React, { useEffect } from 'react';
import chachahubLogo from '@/assets/CharchaHub-logo1.png'
import ProfileInfo from './components/profile-info';
import NewDm from './components/new-dm/index.jsx';
import { apiClient } from '@/lib/api-client.js';
import { GET_DM_CONTACTS_ROUTES } from '@/utils/constants.js';
import { useAppStore } from '@/store';
import ContactList from '@/components/ui/contact-list';
import CreateChannels from './components/create-channel';

const ContactsContainer = () => {

  const {setDirectMessagesContacts,directMessagesContacts} = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
          withCredentials: true,
        });
        if (response.data.contacts) {
          setDirectMessagesContacts(response.data.contacts);
        }
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-r-[#2f303b] w-full ">
        <div className='pt-3'>
            <Logo />
        </div>
        <div className='my-5'>
            <div className='flex items-center justify-between pr-10'>
                <Title text="Direct Messages" />
                <NewDm />
            </div>
            <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
              <ContactList contacts={directMessagesContacts} />
            </div>
        </div>


        <div className='my-5'>
            <div className='flex items-center justify-between pr-10'>
                 <Title text="Channels" />
                 <CreateChannels />
            </div>
        </div>
        <ProfileInfo />
    </div>
 )
}
// md:w-[35vw] lg:w-[30vw] xl:w-[20vw]
// md:w-[45vw] lg:w-[35vw] xl:w-[25vw]



export default ContactsContainer

const Logo = () => {
    return (
      <div className="flex p-5 justify-start items-center gap-2">
        <img
          src={chachahubLogo}
          alt="ChachaHub Logo"
          // width="78"
          // height="32"
          className="md:w-[20vw] lg:w-[15vw] xl:w-[10vw] h-auto"
        />
        {/* <span className="text-3xl font-semibold">CharchaHub</span> */}
      </div>
    );
  };


  const Title = ({text}) =>{
    return (
        <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>
            {text}
        </h6>
    )
  }