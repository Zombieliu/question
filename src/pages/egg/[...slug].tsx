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
    const [openSell,setOpenSell] = useState(false)
    const [openSellPrice,setOpenSellPrice] = useState(false)
    const content={
        id:"",
        near_address:"",
        near_pet_eggs_image_url:"",
        near_pet_eggs_index:"",
        near_pet_eggs_type:"",
        near_pet_parents_1:"",
        near_pet_parents_2:""
    }
    const [info,setInfo] = useState(content)
    useEffect(()=>{
        if (router.isReady){
            setOpenload(true)
            const near_pet_eggs_index = router.query.slug[0]
            const fetchUserBounty = async (near_pet_eggs_index) => {
                const data = await axios.get(`http://127.0.0.1:7001/api/near/user/pet_eggs/details?near_pet_eggs_index=${near_pet_eggs_index}`)
                console.log(data.data)
                const info = data.data
                const content={
                    id:info.id,
                    near_address:info.near_address,
                    near_pet_eggs_image_url:info.near_pet_eggs_image_url,
                    near_pet_eggs_index:info.near_pet_eggs_index,
                    near_pet_eggs_type:info.near_pet_eggs_type,
                    near_pet_parents_1:info.near_pet_parents_1,
                    near_pet_parents_2:info.near_pet_parents_2
                }
                setInfo(content)
            }
            fetchUserBounty(near_pet_eggs_index)
            setOpenload(false)
        }
    },[router.isReady])

    const open = async () =>{
        setOpenload(true)
        await axios.post("http://127.0.0.1:7001/api/near/user/open/pet_eggs",{
            near_address,
            near_pet_eggs_index:info.near_pet_eggs_index
        })
        setOpenload(false)
        await router.push(`/pet/${info.near_pet_eggs_index}`)
    }
    const sell = async ()=>{
        setOpenload(true)
        const price =  (document.getElementById("price") as HTMLInputElement).value
        await  axios.post("http://127.0.0.1:7001/api/near/user/sell/pet_eggs_store",{
            near_pet_eggs_index:info.near_pet_eggs_index,
            near_pet_eggs_price:price,
        }).then(async function(response){
            setOpenload(false)
            alert("成功")
            await router.push("/bag")
        }).catch(async function (error){
            setOpenload(false)
            alert("请重试")
        })
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
                                <div className="flex justify-between mt-3">
                                    <button
                                        onClick={() => {setOpenSell(true)}}
                                        type="button"
                                        className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                    >
                                        SELL
                                    </button>

                                    <button
                                        type="button"
                                        className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                    >
                                        TRANSFER
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={open}
                                        type="button"
                                        className="w-full flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2 bg-green-300 text-base font-medium text-black  "
                                    >
                                       OPEN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition.Root show={openSell} as={Fragment}>
                        <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto " onClose={setOpenSell}>
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
                                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div className="flex justify-end text-xl w-72">
                                                <button onClick={() => {
                                                    setOpenSell(false)
                                                }}>
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <div className=" text-center ">
                                                <div className="font-semibold">
                                                    SELL
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 ">
                                            <div className="flex justify-center">
                                                <img className="w-28 " src={info.near_pet_eggs_image_url} alt=""/>
                                            </div>
                                            <div className="text-sm  mt-2 flex justify-center  items-center">
                                                <div
                                                    className={classNames(PetStyle[info.near_pet_eggs_type], "rounded-full px-1.5 py-0.5")}>
                                                    #{info.near_pet_eggs_index}
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <button
                                                    onClick={() => {
                                                        setOpenSell(false)
                                                    }}
                                                    type="button"
                                                    className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                                >
                                                    CANCEL
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenSellPrice(true);
                                                        setOpenSell(false)
                                                    }}
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
                    <Transition.Root show={openSellPrice} as={Fragment}>
                        <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto " onClose={setOpenSellPrice}>
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
                                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div className="flex justify-end text-xl w-72">
                                                <button onClick={() => {
                                                    setOpenSellPrice(false)
                                                }}>
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <div className=" text-center ">
                                                <div className="font-semibold">
                                                    SELL
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 ">
                                            <div className="flex justify-center">
                                                <img className="w-28 " src={info.near_pet_eggs_image_url} alt=""/>
                                            </div>
                                            <div className="text-sm  mt-2 flex justify-center  items-center">
                                                <div
                                                    className={classNames(PetStyle[info.near_pet_eggs_type], "rounded-full px-1.5 py-0.5")}>
                                                    #{info.near_pet_eggs_index}
                                                </div>
                                            </div>
                                            <div className="block text-sm font-medium text-gray-700 mt-5 mb-2 ">Selling
                                                price
                                            </div>
                                            <div className="flex">
                                                <input type="text"
                                                       className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border border-2 border-b-4 border-r-4  focus:border-blue-500 transition duration-300  outline-none"
                                                       id="price"
                                                />
                                                <div className="-ml-12 text-sm flex items-center ">
                                                    NEAR
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <button
                                                    onClick={() => {
                                                        setOpenSellPrice(false)
                                                    }}
                                                    type="button"
                                                    className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                                >
                                                    CANCEL
                                                </button>
                                                <button
                                                    onClick={sell}
                                                    type="button"
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
                <Loading/>
            </div>
        )
    }


export default Egg

