import React, {Fragment, useState} from 'react'
import Link from "next/link";
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import {Dialog, Listbox, Transition} from '@headlessui/react';
import {useAtom} from "jotai";
import {GMTToken, GSTToken, LoadingState, NearAccount, NEARToken} from "../../../jotai";
import {Constant} from "../../../constant";
import axios from "axios";
import router from 'next/router';
import Loading from "../../../components/loading";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokens = [
    {
        id: 1,
        name: 'GST',
        avatar: "https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png",
    },
    {
        id: 2,
        name: 'GMT',
        avatar: "https://s2.coinmarketcap.com/static/img/coins/200x200/18069.png"
    },
    {
        id: 3,
        name: 'NEAR',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    },
]
const Internal={
    icon:"fa fa-external-link",
    name:"Internal",
    exhibit:"TokenData"
}
const External ={
    icon:"fa fa-sign-out",
    name:"External",
    exhibit:"ExternalData"
}

const Transfer = () =>{
    const tokenInfo = Constant()
    const [openload,setOpenload]=useAtom(LoadingState)
    const [selected, setSelected] = useState(tokens[2])
    const [internal,setInternal] = useState(Internal)
    const [external,setExternal] = useState(External)
    const [near_address,setNear_hex_account] =useAtom(NearAccount)
    const [openTransfer,setOpenTransfer] = useState(false)
    const [amount,setAmout] = useState("")
    const exchange = ()=>{
        setInternal(external)
        setExternal(internal)}
    const all = ()=>{
        (document.getElementById("amount") as HTMLInputElement).value =  classNames(tokenInfo[internal.exhibit][selected.name])
    }
    const transfer = async () =>{
        setOpenload(true)
        const amount =  (document.getElementById("amount") as HTMLInputElement).value
        if(external.exhibit=="ExternalData"){
            console.log("外到内")
            await axios.post("http://127.0.0.1:7001/api/near/admin/transfer/near",{
                receiverId:near_address
                ,amount
            }).then(async function(response){
                setOpenload(false)
                alert("成功")
                await router.push("/wallet/external")
            }).catch(async function (error){
                setOpenload(false)
                alert("请重试")
            })
            setOpenload(false)
           }
        else {
            console.log("外到内")
            await axios.post("http://127.0.0.1:7001/api/near/user/transfer/near",{
                near_address,
                receiverId:"c26017bdca4bb94ee8622c5bf9c4f4425bf4d0f0709b1e35a05e309764c20b8f"
                ,amount
            }).then(async function(response){
                setOpenload(false)
                alert("成功")
                await router.push("/wallet/external")
            }).catch(async function (error){
                setOpenload(false)
                alert("请重试")
            })
        }
    }
    const openTransfers = ()=>{
        setOpenTransfer(true)
        setAmout((document.getElementById("amount") as HTMLInputElement).value)
    }
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <Link href="/wallet">
                        <div className="text-2xl text-gray-600 px-5">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </Link>
                    <div className="text-xl font-semibold">
                        TRANSFER
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-8 pt-16 pb-10   mx-auto ">
                    <div>
                        <div className="border border-2 border-r-4 border-b-4 border-gray-500 rounded-2xl ">
                            <div>
                                <div className="flex justify-between items-center  w-2/3 px-4  pt-5 pb-2">
                                    <div className="flex items-center text-xl">
                                        <i className={classNames(`${internal.icon}`,"")} aria-hidden="true"></i>
                                        <div className="ml-2 mr-8 text-gray-400 text-xs ">
                                            From
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        {internal.name}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pl-4 pr-6">
                                    <div className="flex border-t w-full ">
                                    </div>
                                    <button onClick={exchange} className="p-2 border rounded-full flex items-center transform rotate-90">
                                        <i className="fa fa-exchange" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center px-4   w-2/3  pt-2 pb-5">
                                    <div className="flex items-center text-xl">
                                        <i className={classNames(`${external.icon}`,"")} aria-hidden="true"></i>
                                        <div className="ml-2 mr-8 text-gray-400 text-xs ">
                                            TO
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        {external.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <div className="mt-16">
                            <Listbox value={selected} onChange={setSelected}>
                                {({open}) => (
                                    <>
                                        <Listbox.Label
                                            className="block text-sm font-medium text-gray-700 mb-2">Asset</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button
                                                className="relative w-full bg-white border border-2 border-r-4 border-b-4  border-gray-500 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default ">
                  <span className="flex items-center">
                    <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full"/>
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                                                <span
                                                    className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                  </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options
                                                    className="absolute z-10 mt-1 w-full bg-white shadow-lg px-2 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  ">
                                                    {tokens.map((token) => (
                                                        <Listbox.Option
                                                            key={token.id}
                                                            onClick={()=>{}}
                                                            className={({active}) =>
                                                                classNames('cursor-default select-none relative border border-2 border-r-4 border-b-4  border-gray-500 rounded-xl my-2 py-2 pl-3 pr-9')}
                                                            value={token}>
                                                            {({selected, active}) => (
                                                                <div className="flex items-center">
                                                                    <img src={token.avatar} alt=""
                                                                         className="flex-shrink-0 h-6 w-6 rounded-full"/>
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                         {token.name}
                                                                       </span>
                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        <div className="mt-8">
                            <div className="block text-sm font-medium text-gray-700 mb-2">Amount</div>
                            <div className="flex">
                                <input type="text"
                                       className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border border-2 border-b-4 border-r-4  focus:border-blue-500 transition duration-300  outline-none"
                                       id="amount"

                                />
                                <div onClick={all} className="-ml-12 text-xs flex items-center text-yellow-400">
                                    MAX
                                </div></div>
                            <div className="flex text-xs mt-1">
                                Balance:
                                <div className="ml-0.5">
                                    {classNames(tokenInfo[internal.exhibit][selected.name])}
                                </div>
                                <div className="ml-0.5">
                                    {selected.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <button  onClick={openTransfers} className="w-10/12 flex mt-10  justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white ">
                                CONFIRM TRANSFER
                            </button>
                        </div>
                    </>
                </div>
            </div>
            <Transition.Root show={openTransfer} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenTransfer}>
                    <div className="flex items-center justify-center min-h-screen     text-center ">
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
                                    <div className=" text-center ">
                                        <div className="font-semibold">
                                           CONFIRM TRANSFER
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 ">

                                    <div className="border border-gray-500 rounded-xl mt-6 text-gray-400 text-xs px-4 py-4">

                                        <div className="flex justify-between mb-5">
                                            <div>
                                                From
                                            </div>
                                            <div>
                                                To
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-black font-semibold">
                                            <div>
                                                {internal.name}
                                            </div>
                                            <div>
                                                {external.name}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-4 mx-1">
                                        <div className="flex text-xs justify-between">
                                            <div className="text-gray-400">
                                                Fee
                                            </div>
                                            <div className="font-semibold">
                                                0.1 GST
                                            </div>
                                        </div>
                                        <div className="flex text-xs justify-between">
                                            <div className="text-gray-400">
                                                You will transfer
                                            </div>
                                            <div className="font-semibold">
                                                {amount}   {selected.name}
                                            </div>
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
                                        <button
                                            onClick={transfer}
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
            <Loading/>
        </div>
    )
}

export default Transfer
