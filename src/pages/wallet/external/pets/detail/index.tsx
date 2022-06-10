import Link from 'next/link'
import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Test = () =>{

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}}>
                        <div className=" text-2xl text-gray-600 px-5">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div className="text-xl font-semibold">
                       #25381
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-8 py-10   mx-auto ">
                    <div className="mt-12">
                        <img className="w-64 mx-auto" src="https://cdn.discordapp.com/attachments/876498266550853642/974566779445727242/1.png" alt=""/>
                        <div className="mt-10 ">
                            <div className="text-black text-xl font-semibold">
                                介绍
                            </div>
                            <div className="mt-2 text-gray-500">
                              在Defi项目中答题次数超过90%！！
                            </div>
                        </div>


                        <div className="flex justify-center mt-64">
                            <Link href="/wallet/external/pets/detail/send">
                                <a className="w-full flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white">
                                    Send
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
