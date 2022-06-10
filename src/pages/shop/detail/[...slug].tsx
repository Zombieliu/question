import React, {Fragment, useEffect, useState} from 'react'
import Link from "next/link";
import Wallet from "../../../components/wallet";
import {PetStyle} from "../../../constant";
import {Dialog, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import axios from "axios";
import {useAtom} from "jotai";
import {NearAccount} from "../../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Detail = () =>{
    const router = useRouter()
    const [near_address,] =useAtom(NearAccount)
    const [openBuy,setOpenBuy] = useState(false)
    const [openTransfer,setOpenTransfer] = useState(false)
    const content={
        id:"",
        near_address:"",
        near_pet_charisma_value:"",
        near_pet_health_value:"",
        near_pet_hunger_value:"",
        near_pet_image_url:"",
        near_pet_index:"",
        near_pet_intelligence_value:"",
        near_pet_level:"",
        near_pet_lucky_value:"",
        near_pet_name:"",
        near_pet_price:"",
        near_pet_mint_number:"",
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
            const near_pet_index = router.query.slug[0]
            const fetchUserBounty = async (near_pet_index) => {
                const data = await axios.get(`http://127.0.0.1:7001/api/near/query/pet?near_pet_index=${near_pet_index}`)
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
        }
    },[router.isReady])
    const confirm =async ()=>{
        await axios.post("http://127.0.0.1:7001/api/near/user/buy/pet_store",{
            near_address:near_address,
            near_pet_index:info.near_pet_index,
            near_pet_price:info.near_pet_price,
        }) .then(function (response) {
            setOpenBuy(false)
            alert("成功")
            router.push("/main")
        })
            .catch(function (error) {
                console.log(error);
                setOpenTransfer(true)
            });
    }
    if (info != content){
        return (
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0    " />
                <div className=" mx-auto  ">
                    <div className="fixed z-20 inset-x-0 flex justify-between px-5 mx-auto ">
                        <button onClick={()=>{window.history.back()}}>
                            <div className="text-2xl text-gray-600 ">
                                <i className="fa fa-reply" aria-hidden="true"></i>
                            </div>
                        </button>
                        <Wallet/>
                    </div>
                    <div className="absolute inset-0">
                        <img
                            className="h-screen"
                            src="https://cdn.discordapp.com/attachments/876498266550853642/969529054967529522/5.png"
                            alt=""
                        />
                    </div>
                    <div className="max-w-7xl relative px-8 pt-20 py-10   mx-auto ">
                        <div className="border-2 border-gray-500 border-b-4 border-r-4 rounded-2xl bg-white">
                            <div className="mt-20 mx-14 border border-gray-500 rounded-2xl p-5">
                                <img className="w-36 mx-auto" src={info.near_pet_image_url} alt=""/>
                            </div>

                            <div className="mx-4 my-10" >
                                <div className="flex justify-center text-xl font-semibold">
                                   购买即可获得以下权利
                                </div>
                                <div className="grid grid-cols-1 gap-4 text-center mt-5">
                                    <div  className="">
                                        <div className="flex justify-between items-center text-xs">
                                            <div className=" pr-2 flex items-center">
                                                <img className="w-7 rounded-full mr-2" src="https://cdn.discordapp.com/attachments/876498266550853642/972801548268732496/2df774c723a6c758.png" alt=""/>
                                                第一时间获取项目分析
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className=" fixed z-20 bottom-4 px-4 w-full mx-auto">
                        <div className="flex justify-between items-center  w-full bg-white px-4 p-2 border-2 border-blue-300 rounded-full">
                            <div className="font-semibold text-base">
                                {info.near_pet_price} NEAR / 1 month
                            </div>
                            <button
                                onClick={confirm}
                                type="button"
                                className="w-36 flex   justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                            >
                                BUY NOW
                            </button>

                        </div>
                    </div>
                </div>

                <Transition.Root show={openTransfer} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenTransfer}>
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
                                        <div className="flex justify-end text-xl w-72"><button onClick={()=>{setOpenTransfer(false)}} >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button></div>
                                        <div className=" flex justify-center ">
                                            <div className="text-center">
                                                <div className="font-semibold ">
                                                    INSUFFICIENT SOL
                                                </div>
                                                <div className="flex font-semibold">
                                                    IN
                                                    <div className="text-blue-400 ml-1">
                                                        SPENDING ACCOUNT
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="flex justify-center">
                                            <img className="w-28 " src={info.near_pet_image_url} alt=""/>
                                        </div>
                                        <div className="border border-gray-500 rounded-xl mt-6  bg-gray-100 text-sm px-4 py-4 ">
                                            Don`t worry! Just transfer enough NEAR from
                                            wallet to the spending account and you are
                                            good to go!
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="text-sm text-gray-500">
                                                Cost
                                            </div>
                                            <div className="font-semibold">
                                                {info.near_pet_price} NEAR
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={()=>{setOpenTransfer(false)}}
                                                type="button"
                                                className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                            >
                                                CANCEL
                                            </button>
                                            <Link href="/wallet/ex-transfer">
                                                <a  className="w-36 flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white ">
                                                    TRANSFER
                                                </a>
                                            </Link>
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
    return (
        <>
        1</>

    )
}

export default Detail
