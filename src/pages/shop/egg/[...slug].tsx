import React, {Fragment, useEffect, useState} from 'react'
import Link from "next/link";
import Wallet from "../../../components/wallet";
import {PetStyle} from "../../../constant";
import {Dialog, Transition} from "@headlessui/react";
import axios from "axios";
import router, {useRouter} from "next/router";
import {useAtom} from "jotai";
import {LoadingState, NearAccount} from "../../../jotai";
import Loading from "../../../components/loading";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Egg = () =>{
    const [openload,setOpenload]=useAtom(LoadingState)
    const router = useRouter()
    const minted = [
        {
            type:"Uncommon",
            img:"/1.png",
            index:"123123",

        },
        {
            type:"Rare",
            img:"/1.png",
            index:"1233",

        },

    ]
    const [near_address,] =useAtom(NearAccount)
    const [openTransfer,setOpenTransfer] = useState(false)
    const content={
        id:"",
        near_address:"",
        near_pet_eggs_image_url:"",
        near_pet_eggs_index:"",
        near_pet_eggs_type:"",
        near_pet_eggs_price:"",
        near_pet_parents_1:"",
        near_pet_parents_2:""
    }
    const [info,setInfo] = useState(content)
    useEffect(()=>{
        if (router.isReady){
            setOpenload(true)
            const near_pet_eggs_index = router.query.slug[0]
            console.log(near_pet_eggs_index)
            const fetchUserBounty = async (near_pet_eggs_index) => {
                const data = await axios.get(`http://127.0.0.1:7001/api/near/query/pet_eggs`,{
                    params:{near_pet_eggs_index}
                })
                console.log(data.data)
                const info = data.data
                const content={
                    id:info.id,
                    near_address:info.near_address,
                    near_pet_eggs_image_url:info.near_pet_eggs_image_url,
                    near_pet_eggs_index:info.near_pet_eggs_index,
                    near_pet_eggs_type:info.near_pet_eggs_type,
                    near_pet_eggs_price:info.near_pet_eggs_price,
                    near_pet_parents_1:info.near_pet_parents_1,
                    near_pet_parents_2:info.near_pet_parents_2
                }
                setInfo(content)
            }
            fetchUserBounty(near_pet_eggs_index)
            setOpenload(false)
        }
    },[router.isReady])

    const confirm = async ()=>{
        await axios.post("http://127.0.0.1:7001/api/near/user/buy/pet_eggs_store",{
            near_address:near_address,
            near_pet_eggs_index:info.near_pet_eggs_index,
            near_pet_eggs_price:info.near_pet_eggs_price,
        }) .then(function (response) {
            alert("成功")
            router.push("/main")
        })
            .catch(function (error) {
                console.log(error);
                setOpenTransfer(true)
            });
    }

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    "/>
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between px-5 mx-auto ">
                    <button onClick={()=>{window.history.back()}}>
                        <div className="text-2xl text-gray-600 ">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </button>
                    <Wallet/>
                </div>

                <div className="max-w-7xl relative px-8 pt-20 py-10   mx-auto ">
                    <div className=" bg-white">
                        <div className="flex  justify-center mx-auto font-semibold text-xl">
                            BUY
                        </div>
                        <div className=" mx-14  p-5">
                            <img className="w-36 mx-auto" src={info.near_pet_eggs_image_url} alt=""/>
                        </div>
                        <div className="flex justify-center  items-center px-4 text-sm">
                            <div className={classNames(PetStyle[info.near_pet_eggs_type], "border rounded-full  w-48 text-center px-2 py-0.5 bg-gray-200")}>
                                {info.near_pet_eggs_type} shoebox
                            </div>
                        </div>
                        <div className="flex justify-center my-3  items-center px-4 text-sm">
                            <div className={classNames(PetStyle[info.near_pet_eggs_type], "border rounded-full text-center px-2 py-0.5 bg-gray-200")}>
                                #{info.near_pet_eggs_index}
                            </div>
                        </div>
                        <div className="border border-black bg-gray-200 flex justify-between p-2 rounded-full ">
                            <div className="text-gray-500">
                                Cost
                            </div>
                            <div className="font-semibold ">
                                {info.near_pet_eggs_price} NEAR
                            </div>

                        </div>
                    </div>
                    <div className=" ">
                        <div>
                            <div className="text-black text-2xl font-semibold">
                                Minted form
                            </div>
                            <div className="flex grid grid-cols-2 gap-10 mt-5">
                                {minted.map((item => (
                                    <div key={item.index}
                                         className=" rounded-2xl   text-center border border-gray-500 border-2 border-b-4 border-r-4">
                                        <div className=" px-4  border-gray-500">
                                            <div className="flex justify-center items-center">
                                                <div className={classNames(PetStyle[item.type], 'rounded-b-xl w-5/6 ')}>
                                                    #{item.index}
                                                </div>
                                            </div>
                                            <img className="mx-auto py-6   w-24" src={item.img} alt=""/>
                                        </div>
                                    </div>
                                )))}
                            </div>
                            <div>
                                <button
                                    onClick={confirm}
                                    type="button"
                                    className="w-full flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2 bg-green-300 text-base font-medium text-black  "
                                >
                                    CONFIRM
                                </button>
                            </div>
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
                                            <img className="w-28 " src={info.near_pet_eggs_image_url} alt=""/>
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
                                                {info.near_pet_eggs_price} NEAR
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
            <Loading/>
        </div>
    )
}


export default Egg
