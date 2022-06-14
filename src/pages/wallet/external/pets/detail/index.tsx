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
                <div className="absolute inset-0">
                    <img
                        className=" w-full mx-auto"
                        src="https://cdn.discordapp.com/attachments/876498266550853642/986208791446052914/13dda3348241b58a.png"
                        alt="People working on laptops"
                    />
                </div>
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}} className="pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                    <div className="text-2xl font-semibold text-white">
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
                        <div>
                            ............
                        </div>


                        <div className="flex justify-center mt-64">
                            <Link href="/wallet/external/pets/detail/send">
                                <a className="w-72 flex mt-5  justify-center rounded-full   shadow-sm ">
                                    <img src="https://cdn.discordapp.com/attachments/876498266550853642/986208791781593148/send.png" alt=""/>
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
