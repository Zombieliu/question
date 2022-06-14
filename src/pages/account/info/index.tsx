import React, {Fragment} from 'react'
import Link from "next/link";
import {useAtom} from "jotai";
import {OpenAvatar, OpenGender, OpenName, PeopleAvatar, PeopleEmail, PeopleGender, PeopleName} from "../../../jotai";
import {Dialog, Transition } from '@headlessui/react';




const Avatar = ()=>{
    const [openAvatar,setOpenAvatar] =useAtom(OpenAvatar)
    //Choose Avatar
    const [,setAvatar] = useAtom(PeopleAvatar)
    const avatar = [
        {img:"https://cdn.discordapp.com/attachments/897398778166906911/950273679881814016/unknown.png"},
        {img:"https://cdn.discordapp.com/attachments/897398778166906911/950273947147059230/unknown.png"},
        {img:"https://cdn.discordapp.com/attachments/897398778166906911/967989384240574484/finish.png"},
    ]
    return(
        <>
            <Transition.Root show={openAvatar} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenAvatar}>
                    <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="flex justify-end text-xl w-72"><button onClick={()=>{setOpenAvatar(false)}} >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button></div>
                                    <div className=" text-center ">
                                        <div className="font-semibold">
                                            SELECT NFT
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 grid grid-cols-5 gap-4">
                                    {avatar.map((item=>(
                                        //Choose Avatar
                                        <button onClick={()=>{setAvatar(item.img) ,setOpenAvatar(false)}} key={item.img}>
                                            <img className=" rounded-full" src={item.img} alt=""/>
                                        </button>
                                    )))}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root></>
    )
}
const Name = ()=>{
    const [,setName] = useAtom(PeopleName)
    const [openName,setOpenName] = useAtom(OpenName)
    const save = ()=>{
        const data = (document.getElementById("Name") as HTMLInputElement).value
        setName(data)
        setOpenName(false)
    }
    return(
        <>
            <Transition.Root show={openName} as={Fragment}>
            <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenName}>
                <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                <div className="flex justify-end text-xl w-72"><button onClick={()=>{setOpenName(false)}} >
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button></div>
                                <div className=" text-center ">
                                    <div className="font-semibold">
                                        Name
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <input type="text"
                                       className="  text-xs md:text-sm   rounded-lg p-2 py-4 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                                       placeholder="Enter Name "
                                       id="Name"
                                />

                                <div className="flex justify-center">
                                <button
                                    onClick={save}
                                    type="button"
                                    className="w-36 flex mt-5  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                                >
                                    SAVE
                                </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

        </>
    )
}

const Gender = ()=>{
    const [,setGender] = useAtom(PeopleGender)
    const [openGender,setOpenGender] = useAtom(OpenGender)
    const gender = [
        {
            img:"fa fa-mars",
            name:"male"
        },
        {
            img:"fa fa-venus",
            name:"famale"
        },
        {
            img:"fa fa-question",
            name:"secret",
        },
    ]
    return(
        <>
            <Transition.Root show={openGender} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenGender}>
                    <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-16 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="flex justify-end text-xl w-72 "><button onClick={()=>{setOpenGender(false)}} >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button></div>
                                    <div className=" text-center ">
                                        <div className="font-semibold">
                                           GENDER
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-14 flex justify-between mx-8 text-3xl">
                                    {gender.map((item=>(
                                        <div  key={item.img} onClick={()=>{setGender(item.name) ,setOpenGender(false)}} className="text-center">
                                            <i className={item.img} aria-hidden="true"></i>
                                            <div className="text-base">
                                                {item.name}
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
const Info = () =>{

    const [name,setName] = useAtom(PeopleName)
    const [email,setEmail] = useAtom(PeopleEmail)
    const [avatar,setAvatar] = useAtom(PeopleAvatar)
    const [gender,setGender] = useAtom(PeopleGender)
    const [,setOpenAvatar] =useAtom(OpenAvatar)
    const [,setOpenName] = useAtom(OpenName)
    const [,setOpenGender] = useAtom(OpenGender)
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="absolute inset-0">
                    <img
                        className=" w-full mx-auto"
                        src="https://cdn.discordapp.com/attachments/876498266550853642/985945859994832917/4ddf533ab992a3d5.png"
                        alt="People working on laptops"
                    />
                </div>
                <Link href="/account">
                    <div className="fixed z-20 inset-x-0 text-2xl text-gray-600 pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </div>
                </Link>
                <div className="max-w-7xl relative px-8 py-16   mx-auto ">
                        {/*avatar*/}
                        <div className="mt-8">
                        <div   className="flex justify-center">
                            <img onClick={()=>setOpenAvatar(true)} className="w-24 rounded-full" src={avatar} alt=""/>
                        </div>
                        <div className="flex justify-center ml-16 -mt-5 text-3xl text-white">
                        <i onClick={()=>setOpenAvatar(true)} className="fa fa-pencil-square-o " aria-hidden="true"></i>
                        </div>
                        </div>
                    {/*email*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                  Email
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="mr-4  text-sm text-black ">
                                {email}
                            </div>
                            <Link href="/account/email">
                            <i className="fa fa-chevron-right " aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                    {/*name*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                    Name
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="mr-4  text-sm text-black ">
                                {name}
                            </div>
                            <button onClick={()=>{setOpenName(true)}}>
                            <i className="fa fa-chevron-right " aria-hidden="true"></i></button>
                        </div>
                    </div>
                    {/*gender*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                    Gender
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="mr-4  text-sm text-black ">
                                {gender}
                            </div>
                            <button onClick={()=>{setOpenGender(true)}}>
                            <i className="fa fa-chevron-right " aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    {/*Password*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                    Password
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <Link href="/account/password">
                            <i className="fa fa-chevron-right " aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Avatar/>
            <Name/>
            <Gender/>
        </div>
    )
}

export default Info
