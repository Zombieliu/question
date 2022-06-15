import React, {Fragment, useState} from 'react'
import {log} from "util";
import {Dialog, Transition} from "@headlessui/react";
import {PetStyle} from "../../../../../../constant";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Send = () =>{
    const [openSend,setOpenSend] = useState(false)
    //transfer address
    const [ToAddress,setToAddress] = useState("")
    const send =()=>{
        setToAddress((document.getElementById("amount") as HTMLInputElement).value)
        setOpenSend(true)
    }

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="absolute inset-0">
                    <img
                        className=" w-full mx-auto"
                        src="https://cdn.discordapp.com/attachments/876498266550853642/986209597545127976/SEND.png"
                    />
                </div>
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}} className="pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                    <div className="text-2xl font-semibold text-white">
                       Send
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4 py-10   mx-auto ">
                    <div className="mt-12">
                        <img className="w-64 mx-auto" src="https://cdn.discordapp.com/attachments/876498266550853642/974566779445727242/1.png" alt=""/>
                    </div>
                    <div className="text-center my-10 text-black font-semibold text-xl">
                        #25381
                    </div>
                    <div className="block text-sm font-medium text-gray-700 mb-2">To Address</div>
                    <div className="flex">
                        <input type="text"
                               className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border border-2 border-b-4 border-r-4  focus:border-blue-500 transition duration-300  outline-none"
                               id="amount"
                        />
                    </div>

                    <div className="flex justify-center mt-48">
                        <button
                            onClick={send}
                            className="w-72 flex mt-5  justify-center rounded-full  "
                        >
                            <img src="https://cdn.discordapp.com/attachments/876498266550853642/986208791781593148/send.png" alt=""/>
                        </button>
                    </div>
                    </div>
            </div>
            <Transition.Root show={openSend} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto " onClose={setOpenSend}>
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
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
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
                            <div
                                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  w-96 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="flex justify-end text-xl ">
                                        <button onClick={() => {
                                            setOpenSend(false)
                                        }}>
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className=" text-center ">
                                        <div className="font-semibold">
                                            SEND
                                        </div>
                                    </div>
                                    <div className="mt-8 text-sm">
                                        <div className="flex justify-between">
                                            <div className="text-gray-400">
                                                Fee
                                            </div>
                                            <div className="text-black font-semibold">
                                                =0.0002 NEAR
                                            </div>
                                        </div>
                                        <div className="flex mt-8 justify-between">
                                            <div className="text-gray-400  w-32 mr-4 ">
                                                Send address
                                            </div>
                                            <div className="text-black font-semibold text-right w-72 break-all ">
                                                {ToAddress}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 ">
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => {
                                                setOpenSend(false)
                                            }}
                                            type="button"
                                            className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            className="w-36 flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                                        >
                                            CONFIRM
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Send
