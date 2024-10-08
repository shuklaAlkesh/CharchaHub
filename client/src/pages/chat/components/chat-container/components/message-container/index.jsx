import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store';
import moment from 'moment';
import { apiClient } from '@/lib/api-client.js';
import { GET_ALL_MESSAGES_ROUTES, HOST } from '@/utils/constants.js';
import {MdFolderZip} from "react-icons/md";
import { IoMdArrowRoundDown } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, 
    userInfo, selectedChatMessages,setSelectedChatMessages,
    setFileDownloadProgress,setIsDownloading, isDownloading,
   } = useAppStore();
  const [showImage,setShowImage] = useState(false);
  const [imageURl, setImageURl] = useState(null);
  useEffect(() =>{
    const getMessages = async () =>{
      try{
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          { userId: selectedChatData._id },
          {withCredentials:true},
        );
        if(response.data.messages){
          setSelectedChatMessages(response.data.messages);
        }
      }catch(error){
        console.log({error});
      }
    }
    if(selectedChatData._id){
      if(selectedChatType === "contact"){
        getMessages();
      }
    }
  },[selectedChatData,selectedChatType,setSelectedChatMessages]);



  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]); 


  
   const checkIfImage = (filepath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|svg|bmp|tif|tiff|webp|ico|heic|heif)$/i;
    return imageRegex.test(filepath);
  };

  const renderMessage = () => {
    let lastDate = null;
    return selectedChatMessages.map((message,index) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {
          selectedChatType === "contact" && renderDMMessage(message)}
        </div>
      );
    });
  };

  const renderDMMessage = (message) => {
    return (
    <div className={`${message.sender === selectedChatData._id ? "text-left":"text-right"}`}>
      {
        message.messageType === "text" && (
          <div className={`${
              message.sender !== selectedChatData._id 
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
            {message.content}
          </div>
        )
      }
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div className='cursor-pointer'
            onClick={()=>{
              setShowImage(true);
              setImageURl(message.fileUrl);
            }}>
              <img
                src={`${HOST}/${message.fileUrl}`}
                height={300}
                width={300}
                alt="Message file"
              />
            </div>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <span className='text-white/80 text-3xl bg-black/20 rounded-full p-3'>
                <MdFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span className='text-white/80 bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
              onClick={()=> downloadFile(message.fileUrl)}>
                 <IoMdArrowRoundDown className="text-white" />
              </span>
            </div>
          )}
        </div>
      )
    }

        <div className='text-xs text-gray-600'>
          {moment(message.timestamp).format("LT")}
        </div>
    </div>
    );
  };

  // const downloadFile = async (url) => {
  //   try {
  //     setIsDownloading(true);
  //     setFileDownloadProgress(0);
  //     const response = await apiClient.get(`${HOST}/${url}`, {
  //       responseType: 'blob',
  //       onDownloadProgress:(progressEvent)=>{
  //         const {loaded,total} = progressEvent
  //         const percentageCompleted = Math.round((loaded*100) / total);
  //         setFileDownloadProgress(percentageCompleted);
  //       }
  //     });
  
  //     const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = urlBlob;
  //     link.setAttribute("download", url.split('/').pop()); 
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(urlBlob); 
  //     setIsDownloading(false);
  //     setFileDownloadProgress(0);
  //   } catch (error) {
  //     setIsDownloading(false);
  //     setFileDownloadProgress(0);
  //     console.error("Error downloading file:", error);
  //   }
  // };

  const downloadFile = async (url) => {
    try {
      setIsDownloading(true);
      setFileDownloadProgress(0);
      
      const response = await apiClient.get(`${HOST}/${url}`, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (total !== undefined) {
            const percentageCompleted = Math.round((loaded * 100) / total);
            setFileDownloadProgress(percentageCompleted);
          }
        }
      });
  
      // Create URL for the blob and initiate download
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", url.split('/').pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup after download
      window.URL.revokeObjectURL(urlBlob);
  
      // Reset download state
      setIsDownloading(false);
      setFileDownloadProgress(0);
    } catch (error) {
      setIsDownloading(false);
      setFileDownloadProgress(0);
      console.error("Error downloading file:", error);
    }
  };
  
  

  return (
    <div
      className='flex-1 overflow-y-auto scrollbar-hidden 
      p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] 
      w-full'
    >
      {renderMessage()}
      <div ref={scrollRef} />
      {
        showImage && (<div className='fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col '>
            <div>
              <img src={`${HOST}/${imageURl}`}
              className =  'h-[80vh] w-full bg-cover'/>
            </div>
            <div className="flex gap-5 fixed top-0 mt-5">
              <button className='text-white/80 bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
              onClick={()=>{downloadFile(imageURl)}}>
              <IoMdArrowRoundDown className="text-white" />
              </button>
              <button className='text-white/80 bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
              onClick={()=>{
                setShowImage(false);
                setImageURl(null);
              }}>
              <IoCloseSharp className="text-white" />
              </button>
            </div>

        </div>)
      
      }
    </div>
  );
}


export default MessageContainer;
