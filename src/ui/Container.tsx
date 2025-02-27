import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isNuit:boolean
};


function Container({ children, isNuit }: Props) {
    console.log("isNuit : ", isNuit)
    

  return (
    // <div className=" bg-white  mt-2 rounded-[22px] px-5 py-7 w-full ">
    // <div className={`mt-2 min-h-screen rounded-[22px] px-5 py-7 w-full transition-colors duration-300 ${
    //     isNuit ? "bg-gray-700 text-white " : "  bg-white text-black"
    //   }`}>

 <div className={` mt-2 min-h-screen rounded-[22px] px-5 py-7 w-full transition-colors duration-300 testM`}> 
        
      {children}
    </div>
  );
}

export default Container;
