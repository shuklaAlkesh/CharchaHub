import React from 'react';
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import {HOST} from '@/utils/constants.js';
import { getColor } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {IoPowerSharp} from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import {LOGOUT_ROUTES} from '@/utils/constants.js';

const ProfileInfo = () => {
  const {userInfo,setUserInfo} = useAppStore();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTES,
        {},
        {withCredentials:true});

        if(response.status === 200){
          navigate('/auth');
          setUserInfo(null);
        }
    }catch(error){
      toast.error("Failed to logout.");
    }
  }

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-center px-10  w-full bg-[#2a2b33] '>
        <div className='flex gap-3 items-center justify-center'>
          <div className='w-12 h-12 relative'>
            <Avatar className="relative h-12 w-12  rounded-full overflow-hidden">
                  {userInfo.image ? (
                    <AvatarImage
                      src={`${HOST}/${userInfo.image}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                        userInfo.color
                      )}`}
                    >
                      {userInfo.firstName ? userInfo.firstName.charAt(0) : userInfo.email.charAt(0)}
                    </div>
                  )}
                </Avatar>
          </div>
          <div>
            {
              userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
            }
          </div>
          <div className='flex gap-5'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2 className="text-purple-500 text-xl font-medium" 
                onClick={()=>navigate('/profile')}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoPowerSharp className="text-red-500 text-xl font-medium" 
                onClick={Logout}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
        </div>
    </div>
  )
}

export default ProfileInfo;