import React, {Fragment, useEffect, useState} from 'react'
import Link from "next/link";
import {PetStyle, PetTextStyle} from "../../constant";
import {useRouter} from "next/router";
import axios from "axios";
import {useAtom} from "jotai";
import {NearAccount} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Mint = () =>{
    const router = useRouter()
    const [near_address,] =useAtom(NearAccount)
    const [openSelect,setOpenSelect] = useState(false)
    const [select,setSelect] = useState(false)
    const [near_pet_type,setNear_pet_type]=useState("")
    const [near_pet_index,setNear_pet_index]=useState("")
    const [near_pet_mint_number,setNear_pet_stamina_value]=useState("")
    const [near_pet_image_url,setNear_pet_image_url]=useState("")
    const [near_pet_type2,setNear_pet_type2]=useState("")
    const [near_pet_index2,setNear_pet_index2]=useState("")
    const [near_pet_mint_number2,setNear_pet_mint_number2]=useState("")
    const [near_pet_image_url2,setNear_pet_image_url2]=useState("")
    const [selectUrl,setSelectUrl] =useState("")
    const [selectID,setSelectID] =useState("")
    const [selectLevel,setSelectLevel] =useState("")
    const [selectType,setSelectType] =useState("")
    const [selectMint,setSelectMint] =useState("")
    const [pet_price,setPet_price] =useState(0)
    const [Pet,setPetList] = useState([])
    useEffect(()=>{
        if (router.isReady){
            setNear_pet_type(router.query.slug[0])
            setNear_pet_index(router.query.slug[1])
            setNear_pet_stamina_value(router.query.slug[2])
            setNear_pet_image_url(router.query.slug[3] +"//"+router.query.slug[4]+"/"+router.query.slug[5]+"/"+router.query.slug[6]+"/"+router.query.slug[7]+"/"+router.query.slug[8])
            const fetchUserBounty = async () => {
                const data= await axios.get("http://127.0.0.1:7001/api/near/user/pet/mint",{
                    params:{
                        near_address,
                        near_pet_index:router.query.slug[1]
                    }}
                )
                setPetList(data.data)
            }
            fetchUserBounty()
        }
    },[router.isReady])
    const selectPet = (e) => {
        setSelectUrl(e[0])
        setSelectID(e[1])
        setSelectLevel(e[2])
        setSelectType(e[3])
        setSelectMint(e[4])
    }
    const confirm = async () =>{
        setOpenSelect(false)
        setSelect(true)
        setNear_pet_type2(selectType)
        setNear_pet_index2(selectID)
        setNear_pet_image_url2(selectUrl)
        setNear_pet_mint_number2(selectMint)
       const price = await axios.get("http://127.0.0.1:7001/api/near/pet/mint_price",{
            params:{
                near_pet_index1:near_pet_index,
                near_pet_index2:selectID,
            }
        })
        setPet_price(price.data)

    }
    const mint =async () =>{
        await axios.post("http://127.0.0.1:7001/api/near/mint/pet_eggs",{
             near_address,
             near_pet_index1:near_pet_index,
             near_pet_index2:selectID,
        }).then(function (response) {
            axios.post("http://127.0.0.1:7001/api/near/pet/mint_number",{
                near_address,
                near_pet_index1:near_pet_index,
                near_pet_index2:selectID,
            })
                alert("Mint Done")
                router.push("/bag")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0"/>
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                        <div onClick={()=>{window.history.go(-1)}
                        } className=" text-2xl text-gray-600 pl-5">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    <div className="text-xl font-semibold">
                       SHOE MINT
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4 py-10   mx-auto ">
                    <div className="flex justify-between mt-10">
                    <div className=" rounded-2xl w-7/12 mr-5 text-center border border-gray-500 border-2 border-b-4 border-r-4">
                        <div className=" px-4  border-gray-500">
                            <div className="flex justify-center items-center">
                                <div className={classNames(PetStyle[near_pet_type],'rounded-b-xl text-sm w-5/6 ')}>
                                    #{near_pet_index}
                                </div>
                            </div>
                            <img className="mx-auto   py-3" src={near_pet_image_url} alt=""/>
                            <div className="flex justify-center text-sm  font-semibold pb-2">
                                <div>
                                    Mint:{near_pet_mint_number}
                                </div>
                            </div>
                        </div>
                    </div>
                        <button onClick={()=>{setOpenSelect(true)}} className={select?"rounded-2xl  w-7/12   text-center border border-gray-500 border-2 border-b-4 border-r-4":"hidden"}>
                            <div className=" px-4  border-gray-500">
                                <div className="flex justify-center items-center">
                                    <div className={classNames(PetStyle[near_pet_type2],'rounded-b-xl text-sm w-5/6 ')}>
                                        #{near_pet_index2}
                                    </div>
                                </div>
                                <img className="mx-auto  py-3" src={near_pet_image_url2} alt=""/>
                                <div className="flex justify-center text-sm  font-semibold pb-2">
                                    <div>
                                        Mint: {near_pet_mint_number2}
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button  onClick={()=>{setOpenSelect(true)}} className={select?"hidden":"rounded-2xl  w-7/12  flex justify-center items-center text-center border-dotted border-gray-500 border-2"}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="flex justify-between px-4 py-3  mt-20 rounded-xl   border-gray-500 border-2 border-b-4 border-r-4">
                        <div className="text-gray-500 text-sm">
                            Token consumption
                        </div>
                        <div className="text-sm">
                            {pet_price} GST
                        </div>
                    </div>
                    <div className="flex justify-center mt-20">
                        <button
                            type="button"
                            onClick={mint}
                            className="w-36 flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                        >
                            Mint
                        </button>
                    </div>
                </div>
            </div>
            <Transition.Root show={openSelect} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0  " onClose={setOpenSelect}>
                    <div className="flex items-center justify-center min-h-screen    px-4  text-center ">
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
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left    transform transition-all w-full">
                                <div>
                                    <div className="flex justify-end text-xl w-72">
                                        <button onClick={() => {
                                            setOpenSelect(false)
                                        }}>
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                    <div className=" text-center -mt-5">
                                        <div className="font-semibold">
                                           MATCHING EGGS
                                        </div>
                                    </div>
                                </div>
                                <div className="flex  justify-center my-5 h-32 ">
                                    <img className="w-28 " src={selectUrl} alt=""/>
                                </div>

                                <div className="overflow-auto py-2">
                                    <div className="flex  min-w-max">
                                    {Pet.map((item=>(
                                        <div key={item.near_pet_index} className="border border-gray-400 mr-5 p-1 ml-2 rounded-xl  transform hover:border-black hover:scale-105" onClick={()=>selectPet([item.near_pet_image_url,item.near_pet_index,item.near_pet_level,item.near_pet_type,item.near_pet_mint_number])} >
                                            <img className="flex items-center w-14 " src={item.near_pet_image_url} alt=""/>
                                        </div>
                                    )))}
                                    </div>
                                </div>

                                <div className="mt-5 w-80">
                                    <div className="border border-gray-500 rounded-xl mt-6 text-gray-400 text-xs px-4 py-4 grid grid-cols-2 ">
                                        <div className="mb-6">
                                            ID
                                            <div className={classNames(PetTextStyle[selectType],"text-black bg-white font-semibold text-sm")}>
                                                #{selectID}
                                            </div>
                                        </div>
                                        <div className="pl-10">
                                            Level
                                            <div className="text-black font-semibold text-sm">
                                            {selectLevel}
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            Type
                                            <div className="text-black font-semibold text-sm">
                                            {selectType}
                                            </div>
                                        </div>
                                        <div className="pl-10">
                                            Shoe mint
                                            <div className="text-black font-semibold text-sm">
                                                {selectMint}/10
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => {setOpenSelect(false)}}
                                            type="button"
                                            className="w-36 flex mt-5 mr-2  justify-center rounded-full border border-gray-500 border-b-4 border-r-4 shadow-sm px-4 py-2  text-base font-medium text-black  "
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            onClick={confirm}
                                            className="w-36 flex mt-5  justify-center rounded-full border border-gray-600 border-b-4 border-r-4  shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white ">
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

export default Mint
