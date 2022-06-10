import React, {Fragment, useEffect, useState} from 'react'
import Link from "next/link";
import Wallet from "../../components/wallet";
import {PetStyle} from "../../constant";
import {Dialog, Transition} from "@headlessui/react";
import axios from "axios";
import router, {useRouter} from "next/router";
import {useAtom} from "jotai";
import {LoadingState, NearAccount} from "../../jotai";
import Loading from "../../components/loading";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Detail = () =>{
    const router = useRouter()
    const [openLevel,setOpenLevel] = useState(false)
    //State_Loading
    const [openload,setOpenload]=useAtom(LoadingState)
    const content={
        id:"",
        near_address:"",
        near_pet_mint_number:"",
        near_pet_charisma_value:"",
        near_pet_health_value:"",
        near_pet_hunger_value:"",
        near_pet_image_url:"",
        near_pet_index:"",
        near_pet_intelligence_value:"",
        near_pet_level:0,
        near_pet_lucky_value:"",
        near_pet_name:"",
        near_pet_price:"",
        near_pet_type:"",
        near_pet_child_1:"",
        near_pet_child_2:"",
        near_pet_child_3:"",
        near_pet_child_4:"",
        near_pet_child_5:"",
        near_pet_child_6:"",
        near_pet_child_7:"",
        near_pet_child_8:"",
        near_pet_child_9:"",
        near_pet_child_10:"",
        near_pet_parents_1:"",
        near_pet_parents_2:""
    }
    const [info,setInfo] = useState(content)
    useEffect(()=>{
        if (router.isReady){
            setOpenload(true)
            const near_pet_index = router.query.slug[0]
            const fetchUserBounty = async (near_pet_index) => {
                const data = await axios.get(`http://127.0.0.1:7001/api/near/user/pet/details?near_pet_index=${near_pet_index}`)
                console.log(data.data)
                const info = data.data
                const content={
                    id:info.id,
                    near_address:info.near_address,
                    near_pet_mint_number:info.near_pet_mint_number,
                    near_pet_charisma_value:info.near_pet_charisma_value,
                    near_pet_health_value:info.near_pet_health_value,
                    near_pet_hunger_value:info.near_pet_hunger_value,
                    near_pet_image_url:info.near_pet_image_url,
                    near_pet_index:info.near_pet_index,
                    near_pet_intelligence_value:info.near_pet_intelligence_value,
                    near_pet_level:info.near_pet_level,
                    near_pet_lucky_value:info.near_pet_lucky_value,
                    near_pet_name:info.near_pet_name,
                    near_pet_price:info.near_pet_price,
                    near_pet_type:info.near_pet_type,
                    near_pet_child_1:info.near_pet_child_1,
                    near_pet_child_2:info.near_pet_child_2,
                    near_pet_child_3:info.near_pet_child_3,
                    near_pet_child_4:info.near_pet_child_4,
                    near_pet_child_5:info.near_pet_child_5,
                    near_pet_child_6:info.near_pet_child_6,
                    near_pet_child_7:info.near_pet_child_7,
                    near_pet_child_8:info.near_pet_child_8,
                    near_pet_child_9:info.near_pet_child_9,
                    near_pet_child_10:info.near_pet_child_10,
                    near_pet_parents_1:info.near_pet_parents_1,
                    near_pet_parents_2:info.near_pet_parents_2
                }
                setInfo(content)
            }
            fetchUserBounty(near_pet_index)
            setOpenload(false)
        }
    },[router.isReady])
    if (info != content) {
        return (
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0    "/>
                <div className=" mx-auto  ">
                    <div className="fixed z-20 inset-x-0 flex justify-between px-5 mx-auto ">
                        <Link href="/main">
                            <div className="text-2xl text-gray-600 ">
                                <i className="fa fa-reply" aria-hidden="true"></i>
                            </div>
                        </Link>
                        <Wallet/>
                    </div>
                    <div className="absolute inset-0">
                        <img
                            className=""
                            src="https://cdn.discordapp.com/attachments/876498266550853642/969529054967529522/5.png"
                            alt=""
                        />
                    </div>
                    <div className="max-w-7xl relative px-8 pt-20 py-10   mx-auto ">

                        <div className="border-2 border-gray-500 border-b-4 border-r-4 rounded-2xl bg-white">
                            <div className="text-center text-xl mt-2 font-semibold text-indigo-400ss">
                                基础通行证
                            </div>

                            {/*Pet*/}
                            <div className="rounded-2xl p-5">
                                <img className="rounded-xl mx-auto" src="https://cdn.discordapp.com/attachments/876498266550853642/981828663366541352/xie.png" alt=""/>
                            </div>

                            {/*Attributes*/}
                            <div className="mx-4 mb-10">
                                <div className="flex justify-center text-xl font-semibold">
                                    PRIVILEGE
                                </div>
                                <div className="text-xl text-center mt-2">
                                    <div>
                                        1...........
                                    </div>
                                    <div>
                                        2...........
                                    </div>
                                    <div>
                                        3...........
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 text-center mt-5">
                                    <div className="">
                                        <div className="flex justify-between items-center text-xs">
                                            <div className="w-56 mr-8 flex items-center">
                                                <img className="w-7 rounded-full mr-2"
                                                     src="https://cdn.discordapp.com/attachments/876498266550853642/972801548558172200/ca72fdb3b0c9c082.png"
                                                     alt=""/>
                                                参与答题
                                            </div>
                                            <div className="w-full bg-gray-200 h-4 rounded-r-full">
                                                <div className="bg-green-400 h-4 rounded-r-full"
                                                     style={{width: Number(30 * 2) + "%"}}></div>
                                            </div>
                                            <div className="pl-4 w-14 flex justify-center text-sm">
                                                30/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="flex justify-between items-center text-xs">
                                            <div className="w-64 mr-5  flex items-center">
                                                <img className="w-7 rounded-full mr-2"
                                                     src="https://cdn.discordapp.com/attachments/876498266550853642/972801548268732496/2df774c723a6c758.png"
                                                     alt=""/>
                                                正确答题数
                                            </div>
                                            <div className="w-full bg-gray-200 h-4 rounded-r-full">
                                                <div className="bg-green-400 h-4 rounded-r-full"
                                                     style={{width: Number(20 * 2) + "%"}}></div>
                                            </div>
                                            <div className="pl-4 w-14 flex justify-center text-sm">
                                                20/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-10">
                                        <div>
                                            通行证到期时间还有:
                                        </div>

                                        <div>
                                            29天22个小时
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" fixed z-20 bottom-0 w-full mx-auto">
                        <div className="flex justify-center  w-full bg-white px-4 pb-4 p-2 border-t-2 border-blue-300 rounded-t-3xl ">
                            <button className="" onClick={() => {
                                setOpenLevel(true)
                            }}>
                                <div className="text-xl ">点击进阶高阶通行证</div>
                            </button>
                        </div>
                    </div>`
                </div>
                <Transition.Root show={openLevel} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto " onClose={setOpenLevel}>
                        <div className="flex items-center justify-center min-h-screen   px-4  text-center ">
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
                                    className="inline-block align-bottom bg-white rounded-lg px-4  pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="flex justify-end text-xl ">
                                            <button onClick={() => {
                                                setOpenLevel(false)
                                            }}>
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <div className=" text-center ">
                                            <div className="font-semibold">
                                                LEVEL
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="flex justify-center">
                                            <img className=" rounded-2xl " src="https://cdn.discordapp.com/attachments/876498266550853642/981828663366541352/xie.png" alt=""/>
                                        </div>
                                        <div className="mx-4 mb-10">
                                            <div className="flex justify-center text-xl font-semibold">
                                                PRIVILEGE
                                            </div>
                                            <div className="text-xl text-center mt-2">
                                                <div>
                                                    1...........
                                                </div>
                                                <div>
                                                    2...........
                                                </div>
                                                <div>
                                                    3...........
                                                </div>
                                            </div>
                                        </div>
                                           <div className="flex justify-between">
                                            <button
                                                onClick={() => {
                                                    setOpenLevel(false)
                                                }}
                                                type="button"
                                                className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                            >
                                                CANCEL
                                            </button>
                                            <button
                                                type="button"
                                                className="w-36 flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                                            >
                                                NEXT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Loading/>
            </div>
        )
    }else {
        return (
            <>
            1</>
        )
    }
}

export default Detail
