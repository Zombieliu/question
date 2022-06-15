import React from 'react'
import Link from "next/link";

const Email = () =>{


    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto">
                <div className="absolute inset-0">
                    <img
                        className=" w-full mx-auto"
                        src="https://cdn.discordapp.com/attachments/876498266550853642/985945430384861265/email.png"
                         
                    />
                </div>
                <Link href="/account/info">
                    <div className="text-2xl fixed z-20 inset-x-0 text-gray-600 pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </div>
                </Link>
                <div className="max-w-7xl relative px-8 py-10   mx-auto ">
                    <div className="mt-28">
                        <div>New Email</div>
                        <input type="text"
                               className="text-xs  md:text-sm mt-2 rounded-lg p-2 py-3 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                               id="Email"
                        />
                    </div>
                    <div className="mt-5">
                        <div className="mb-2">Verification code</div>
                        <div className="flex">
                            <input type="text"
                                   className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                                   id="code"
                            />
                            <div className="-ml-20 text-sm flex items-center text-yellow-400">
                                Send code
                            </div></div>
                    </div>
                    <div className="mt-5">
                        <div>New Password</div>
                        <input type="text"
                               className="text-xs md:text-sm  mt-2 rounded-lg p-2 py-3 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                               id="Password"
                        />
                    </div>

                    <div className="flex justify-center mt-20">
                        <button>
                            <img className="w-40" src="https://cdn.discordapp.com/attachments/876498266550853642/985945430623932486/emailsave.png" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email
