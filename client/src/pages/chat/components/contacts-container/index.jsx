import chachahubLogo from '@/assets/CharchaHub-logo1.png'
import ProfileInfo from './components/profile-info';
import NewDm from './components/new-dm/index.jsx';
const ContactsContainer = () => {
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
        </div>


        <div className='my-5'>
            <div className='flex items-center justify-between pr-10'>
                 <Title text="Channels" />
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