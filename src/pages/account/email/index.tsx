import React from 'react'
import Link from "next/link";

const Email = () =>{


    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto">
                <Link href="/account/info">
                    <div className="text-2xl fixed z-20 inset-x-0 text-gray-600 px-5">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                    </div>
                </Link>
                <div className="max-w-7xl relative px-8 py-10   mx-auto ">
                    <div className="mt-5">
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
                        <div>Password</div>
                        <input type="text"
                               className="text-xs md:text-sm  mt-2 rounded-lg p-2 py-3 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                               id="Password"
                        />
                    </div>
                    <div className="flex justify-center mt-20">
                        <button
                            type="button"
                            className="w-40"
                        >
                            <img src="https://cdn.discordapp.com/attachments/876498266550853642/969896824569757706/EMAIL_NAME_PASSWORD.png" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email
