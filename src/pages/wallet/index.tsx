import React, {useEffect, useState} from 'react'
import Link from "next/link";
import { Tab } from '@headlessui/react';
import {GMTToken, GSTToken, NearAccount, NEARToken} from "../../jotai";
import {useAtom} from "jotai";
import axios from "axios";
import {formatDecimal} from "../../utils";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const InternalInfo = () =>{
    const [GSTtoken,setGSTtoken] = useAtom(GSTToken)
    const [GMTtoken,setGMTtoken] = useAtom(GMTToken)
    const [NEARtoken,setNEARtoken] = useAtom(NEARToken)
    const [near_address,setNear_hex_account] =useAtom(NearAccount)
    useEffect(() =>{
        const fetchUserBounty = async () => {
            console.log(near_address)
            const data= await axios.get("http://127.0.0.1:7001/api/near/query/near_internal_account_balance",{
                params:{
                    near_address
                }
            })
            const near_balance = Number(formatDecimal(data.data,4))
            setNEARtoken(near_balance)
        }
        fetchUserBounty()
    },[])
    return(
        <>
         <div className="max-w-7xl relative px-8 pt-20 pb-10   mx-auto ">
          <div className="flex  justify-between font-semibold text-lg items-center">
            <div>
            Internal Account
              </div>
                 <button className="text-2xl">
                <i className="fa fa-question-circle-o" aria-hidden="true"></i>
              </button>
               </div>
                        <div className="mt-14 border-2 border-gray-500 rounded-xl  border-r-4 border-b-4">
                            <div className="flex justify-between px-4 py-2 border-t border-b border-gray-500 items-center ">
                                <div className="flex items-center">
                                    <div>
                                        <img className="rounded-full w-9"
                                             src="https://s2.coinmarketcap.com/static/img/coins/200x200/18069.png" alt=""/>
                                    </div>
                                    <div className="ml-2 font-semibold">
                                        勋章
                                    </div>
                                </div>
                                <div className="text-left">
                                    {GMTtoken}
                                </div>
                            </div>
                            <div className="flex justify-between px-4 py-2 items-center ">
                                <div className="flex items-center">
                                    <div>
                                        <img className="rounded-full w-9"
                                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU" alt=""/>
                                    </div>
                                    <div className="ml-2 font-semibold">
                                        NEAR
                                    </div>
                                </div>
                                <div className="text-left">
                                    {NEARtoken}
                                </div>
                            </div>

                        </div>

                        <div className="mt-10 mb-56 text-center">
                            NEAR Network
                        </div>
                            <div className="flex justify-center ">
                                <Link href="/wallet/transfer" >
                                    <a className="w-48 flex mt-5  justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white ">
                                    TRANSFER
                                    </a>
                                </Link>
                            </div>


                    </div>



        </>
    )
}


const Wallet = () =>{
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between items-center">
                <Link href="/main">
                    <div className="text-2xl text-gray-600 px-5">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                    </div>
                </Link>
                <div className="flex justify-center items-center border border-gray-500 overflow-hidden rounded-full">
                    <Link href="/wallet">
                        <a className="bg-black text-white px-6 py-2">
                            Internal
                        </a>
                    </Link>
                    <Link href="/wallet/external">
                        <a className="bg-white text-black  px-5 py-2">
                        External
                        </a>
                    </Link>
                </div>
                    <div className="  text-2xl text-gray-600 px-5">
                        <i className="fa fa-cog " aria-hidden="true"></i>
                    </div>
                </div>
                <InternalInfo/>
            </div>
        </div>
    )
}

export default Wallet
