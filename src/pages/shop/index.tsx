import React, {Fragment, useEffect, useState} from 'react'
import Header from "../../components/header";
import {Listbox, Tab, Transition } from '@headlessui/react';
import Navigation from "../../components/navigation";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Link from "next/link";
import axios from "axios";
import {PetStyle} from "../../constant";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Pet = () =>{
    const [pet,setPet]= useState([])
    useEffect(()=>{
        const fetchUserBounty = async () => {
            const data= await axios.get("http://127.0.0.1:7001/api/near/store/desc/all_pet", {

            })
            setPet(data.data)
        }
        fetchUserBounty()
    },[])
    return(
        <>
            <div>

            <div className="grid grid-cols-2 gap-3">
                {/*{season.map((item=>(*/}
                {/*    <Link href={`/shop/detail/${item.near_pet_index}`} key={item.near_pet_index}>*/}
                {/*    <div  className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">*/}
                {/*        <div className=" px-4  border-gray-500">*/}
                {/*            <div className="flex justify-center items-center">*/}
                {/*            </div>*/}
                {/*            <img className="mx-auto  py-3" src={item.near_pet_image_url} alt=""/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <div className=" border-t border-gray-500">*/}
                {/*                <div className=" border-t flex justify-between p-2 mx-2 items-center">*/}
                {/*                <div className="flex  w-full text-sm">*/}
                {/*                    <div>*/}
                {/*                        {item.near_pet_price}*/}
                {/*                    </div>*/}
                {/*                    <div className="ml-0.5">*/}
                {/*                        NEAR*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">*/}
                {/*                    Buy*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*    </Link>*/}
                {/*)))}*/}
                    <Link href="/shop">
                        <div  className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">
                            <div className="  border-gray-500">
                                <img className="mx-auto rounded-t-xl " src="https://cdn.discordapp.com/attachments/876498266550853642/981828663366541352/xie.png" alt=""/>
                            </div>
                            <div>
                                <div className=" border-t border-gray-500">
                                    <div className=" border-t flex justify-between p-2 mx-2 items-center">
                                        <div className="flex  w-full text-sm">
                                            <div>
                                                200
                                            </div>
                                            <div className="ml-0.5">
                                                USDT
                                            </div>
                                        </div>
                                        <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
            </div>
            </div>
        </>
    )
}

const Eggs = () =>{
    const [pet,setPet]= useState([])

    useEffect(()=>{
        const fetchUserBounty = async () => {
            const data= await axios.get("http://127.0.0.1:7001/api/near/store/desc/all_pet_eggs", {

            })
            setPet(data.data)
        }
        fetchUserBounty()
    },[])
    return(
        <>
            <div>
            <div className="grid grid-cols-2 gap-3">
                    <Link href="/shop">
                        <div className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">
                            <div className="  border-gray-500">
                                <img className="mx-auto h-36  rounded-full" src="https://cdn.discordapp.com/attachments/876498266550853642/950965172200165426/7.png" alt=""/>
                            </div>
                            <div>
                                <div className=" border-t border-gray-500">
                                    <div className=" border-t flex justify-between p-2 mx-2 items-center">
                                        <div className="flex  w-full text-sm">
                                            <div>
                                                1
                                            </div>
                                            <div className="ml-0.5">
                                                NEAR
                                            </div>
                                        </div>
                                        <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                {/*{season.map((item=>(*/}
                {/*    <Link href={`/shop/egg/${item.near_pet_eggs_index}`} key={item.near_pet_eggs_index} >*/}
                {/*    <div className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">*/}
                {/*        <div className=" px-4  border-gray-500">*/}
                {/*            <div className="flex justify-center items-center">*/}
                {/*                <div className={classNames(PetStyle[item.near_pet_eggs_type],'rounded-b-xl w-5/6 ')}>*/}
                {/*                    #{item.near_pet_eggs_index}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <img className="mx-auto  py-3" src={item.near_pet_eggs_image_url} alt=""/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <div className=" border-t border-gray-500">*/}
                {/*                <div className=" border-t flex justify-between p-2 mx-2 items-center">*/}
                {/*                    <div className="flex  w-full text-sm">*/}
                {/*                        <div>*/}
                {/*                            {item.near_pet_eggs_price}*/}
                {/*                        </div>*/}
                {/*                        <div className="ml-0.5">*/}
                {/*                            NEAR*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">*/}
                {/*                        Buy*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    </Link>*/}
                {/*)))}*/}
            </div>
            </div>
        </>
    )
}

const NFT = () =>{
    const [pet,setPet]= useState([])

    useEffect(()=>{
        const fetchUserBounty = async () => {
            const data= await axios.get("http://127.0.0.1:7001/api/near/store/desc/all_pet_eggs", {

            })
            setPet(data.data)
        }
        fetchUserBounty()
    },[])
    return(
        <>
            <div>
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/shop">
                        <div className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">
                            <div className="  border-gray-500">
                                <img className="mx-auto rounded-t-xl " src="data:image/jpeg;base64,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" alt=""/>
                            </div>
                            <div>
                                <div className=" border-t border-gray-500">
                                    <div className=" border-t flex justify-between p-2 mx-2 items-center">
                                        <div className="flex  w-full text-sm">
                                            <div>
                                                1
                                            </div>
                                            <div className="ml-0.5">
                                                NEAR
                                            </div>
                                        </div>
                                        <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/*{season.map((item=>(*/}
                    {/*    <Link href={`/shop/egg/${item.near_pet_eggs_index}`} key={item.near_pet_eggs_index} >*/}
                    {/*    <div className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">*/}
                    {/*        <div className=" px-4  border-gray-500">*/}
                    {/*            <div className="flex justify-center items-center">*/}
                    {/*                <div className={classNames(PetStyle[item.near_pet_eggs_type],'rounded-b-xl w-5/6 ')}>*/}
                    {/*                    #{item.near_pet_eggs_index}*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <img className="mx-auto  py-3" src={item.near_pet_eggs_image_url} alt=""/>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <div className=" border-t border-gray-500">*/}
                    {/*                <div className=" border-t flex justify-between p-2 mx-2 items-center">*/}
                    {/*                    <div className="flex  w-full text-sm">*/}
                    {/*                        <div>*/}
                    {/*                            {item.near_pet_eggs_price}*/}
                    {/*                        </div>*/}
                    {/*                        <div className="ml-0.5">*/}
                    {/*                            NEAR*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <button className="px-2 py-0.5  border border-gray-500 border border-r-2 border-b-2 rounded-full text-sm ">*/}
                    {/*                        Buy*/}
                    {/*                    </button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    </Link>*/}
                    {/*)))}*/}
                </div>
            </div>
        </>
    )
}

const Shop = () =>{

    const [title] = useState({
        通行证: [],
        NFT: [],
        道具: [],
    })

    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <Header/>
                <div className="max-w-7xl relative px-4 pt-20 py-10    mx-auto ">
                    <div className="">
                        <Tab.Group>
                            <Tab.List className="   bg-blue-900/20 rounded-xl mx-auto       ">
                                <div className="rounded-full overflow-hidden border border-gray-500 flex items-center">
                                    {Object.keys(title).map((category) => (
                                        <Tab
                                            key={category}
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full  py-2  text-sm  font-medium  ',
                                                    selected ? 'bg-gray-500 text-gray-50' : '')}>
                                            {category}
                                        </Tab>
                                    ))}
                                </div>

                            </Tab.List>
                            <Tab.Panels className=" mt-5">
                                <Tab.Panel className={classNames(
                                    '')}>
                                    <Pet/>
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames('')}>
                                    <Eggs/>
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames('')}>
                                    <NFT/>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
                <Navigation/>
            </div>
        </div>
    )
}

export default Shop
