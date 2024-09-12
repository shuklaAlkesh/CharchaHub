import React, { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import Lottie from "react-lottie";
import {animationDefaultOptions} from "@/lib/utils";
import {SEARCH_CONTACTS_ROUTES} from "@/utils/constants.js";
import { apiClient } from '@/lib/api-client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import {HOST} from '@/utils/constants.js';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';

const NewDm = () => {
  const {setSelectedChatType,setSelectedChatData} = useAppStore();
  const [openNewContactModel ,setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const searchContacts = async (searchTerm) =>{
    try { 
      if(searchTerm.length > 0){
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          {searchTerm},
          {withCredentials: true},
        );
        if(response.status === 200 && response.data.contacts){
          setSearchedContacts(response.data.contacts);
        }
      }else{
        setSearchedContacts([]);
      }
    }catch(error){
      console.log(error);
    }
  };
  
  const selectNewContact = (contact)=>{
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  }

  return (
    <>

      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <FaPlus 
          className='text-neutral-400 font-light text-opacity-90 text-start 
          hover:text-neutral-100 cursor-pointer transition-all duration-300 '
          onClick = {()=>setOpenNewContactModel(true)}
          />
        </TooltipTrigger>
        <TooltipContent
          className='bg-[#1c1b1e] border-none mb-2 p-3 text-white'
        >
          <p>Select New Contact</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
    <DialogContent className="bg-[#181920] border-none text-white
     w-[400px] h-[400px] flex flex-col">
      <DialogHeader>
        <DialogTitle>
          Please select a contact
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div>
        <Input placeholder="Search Contacts"
        className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
        onChange = {(e)=>searchContacts(e.target.value)}
        />
      </div>
      {
        searchedContacts.length > 0 && (
          <ScrollArea className="h-[250px]">
            <div className='flex flex-col gap-5'>
        {searchedContacts.map((contacts) => (
          <div key={contacts._id} 
            className='flex gap-3 items-center cursor-pointer'
            onClick={() => selectNewContact(contacts)}
            
          >
                <div className='w-12 h-12 relative'>
                  <Avatar className="relative h-12 w-12  rounded-full overflow-hidden">
                        {contacts.image ? (
                          <AvatarImage
                            src={`${HOST}/${contacts.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contacts.color
                            )}`}
                          >
                            {
                              contacts.firstName ? contacts.firstName.charAt(0) : contacts.email.charAt(0)
                            }
                          </div>
                        )}
                    </Avatar>
                  </div>
                  <div className='flex flex-col'>
                    <span>
                      {
                        contacts.firstName && contacts.lastName
                          ? `${contacts.firstName} ${contacts.lastName}`
                          : contacts.name || contacts.email
                      }
                    </span>
                    <span className='text-xs'>
                      {contacts.email}
                    </span>
                  </div>
              </div>
              ))}

            </div>
          </ScrollArea>
        )
      }
      
      {
        searchedContacts.length <= 0 && <div className="flex-1  mt-5 md:mt-0 md:flex flex-col justify-center items-center duration-1000 transition-all">
        <Lottie isClickToPauseDisabled = {true}
        height = {100}
        width = {100}
        options= {animationDefaultOptions}
        />

        <div className="text-opacity-80 text-white flex
        flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all 
        duration-300 text-center">
            <h3 className="poppins-medium">
                Hi<span className="text-custom-green">! </span>
                Search new
                <span className="text-custom-green"> Contact. </span>
            </h3>
      </div>
    </div>
      }
    </DialogContent>
  </Dialog>


    </>
  )
}

export default NewDm;