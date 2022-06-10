import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Dialog, Listbox, Menu, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon, SelectorIcon} from "@heroicons/react/solid";
import {useAtom} from "jotai";
import {
    ExternalGMTToken,
    ExternalGSTToken,
    ExternalNEARToken,
    ExternalUSNToken,
    GMTToken,
    GSTToken,
    NearAccount,
    NEARToken,
    SwitchChain
} from "../../../jotai";
import axios from "axios";
import { formatDecimal } from "../../../utils";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokens = [
    {
        id: 1,
        name: 'NEAR',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    },
    {
        id: 2,
        name: 'ETH',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    },
]
const ExternalInfo = () =>{

    // NEAR network is selected by default
    const [selected, setSelected] = useAtom(SwitchChain)
    const [copyStyle,setCopyStyle] =useState(false)
    const [tokenName,SetTokenName] = useState("NEAR")

    //Open Receive popup
    const [openReceive,setOpenReceive] =useState(false)

    //Open External popup
    const [openExternal,setOpenExternal] =useState(false)

    //NEARToken
    const [externalNEARtoken,setExternalNEARtoken] = useAtom(ExternalNEARToken)

    // USNToken
    const [externalUSNtoken,setExternalUSNtoken] = useAtom(ExternalUSNToken)

    const [near_address,setNear_hex_account] =useAtom(NearAccount)
    //cropped address
    const [address,setAddress] = useState('')

    useEffect(()=>{
        const fetchUserBounty = async () => {
            console.log(near_address)
            const data= await axios.get("http://127.0.0.1:7001/api/near/query/near_account_balance",{
                params:{
                    near_address
                }
            })
            const near_balance = Number(formatDecimal(data.data,8))
            setExternalNEARtoken(near_balance)
            const USN = await axios.get("http://127.0.0.1:7001/api/near/query/near_account_usn_balance",
                {
                    params:{
                        near_address
                    }
                })
            const USN_balance =Number(formatDecimal(USN.data/1000000000000000000,8))
            setExternalUSNtoken(USN_balance)
        }
        fetchUserBounty()
        const first = near_address.slice(0,6);
        const last =  near_address.slice(-5,-1)
        setAddress(first+"..."+last)

    },[])
    const Copy = (span) => {
        setCopyStyle(true)
        const spanText = document.getElementById(span).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand('Copy');
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        setTimeout( function (){
            setCopyStyle(false)},2000)
    }
    const Copy1 = (e) => {
        const spanText1 = document.getElementById(e).innerText;
        const oInput1 = document.createElement('input');
        oInput1.value = spanText1;
        document.body.appendChild(oInput1);
        oInput1.select();
        document.execCommand('Copy');
        oInput1.className = 'oInput1';
        oInput1.style.display = 'hidden';
        document.body.removeChild(oInput1);
        console.log(spanText1)
        // setOpenReceive(false)

    }
    return(
        <>
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0    " />
                <div className=" mx-auto  ">
                    <div className="max-w-7xl relative px-8 py-10   mx-auto ">
                        <div className="mt-5">
                            {/*selection box*/}
                            <div className="flex justify-center">
                                <Listbox value={selected} onChange={setSelected}>
                                    {({open}) => (
                                        <>
                                                 <div className="mt-1 relative">
                                                    <Listbox.Button className="relative  bg-white border  border-gray-500 rounded-full shadow-sm  pr-10  text-left cursor-default ">
                                          <span className="flex items-center">
                                            <span className="ml-3 block truncate">{selected.name}</span>
                                          </span>
                                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                          </span>
                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                                        className="absolute z-10 mt-1 w-48  -ml-12 bg-white shadow-lg px-2 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  ">
                                                        {tokens.map((token) => (
                                                            <Listbox.Option
                                                                key={token.id}
                                                                onClick={()=>{}}
                                                                className={({active}) =>
                                                                    classNames('cursor-default select-none relative border border-2 border-r-4 border-b-4  border-gray-500 rounded-xl my-2 py-2 pl-3 pr-9')}
                                                                value={token}>
                                                                {({selected, active}) => (
                                                                    <div className="flex items-center">
                                                                        <img src={token.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full"/>
                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                         {token.name}
                                                                       </span>
                                                                        {selected ? (
                                                                            <span className={classNames(active ? 'text-green-400' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" /></span>) : null}</div>
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

                            {/*Token Number*/}
                            <div className="flex justify-center">
                            <div className="flex justify-center  mt-5 text-xl font-semibold text-white rounded-full px-4 py-0.5 bg-purple-700">
                                <div>{externalNEARtoken}
                                </div>
                                <div className="ml-1 ">
                                    {tokenName}
                                </div>
                            </div>
                            </div>
                            <div className="flex justify-center  mt-5">
                                <button onClick={() => {Copy('address') }} className={copyStyle?"w-6/12 px-4 text-center   bg-white  py-0.5 border-gray-500 border border-2 border-b-4 border-r-4 rounded-full":"w-6/12 px-4 text-center bg-white  py-0.5 border-gray-500 border border-2 border-b-4 border-r-4 rounded-full"}>
                                    {address}
                                </button>
                                <div className="hidden"  id="address">
                                    {near_address}
                                </div>
                            </div>
                            {/*function button*/}
                            <div className="flex justify-between mt-10 px-10 items-center">
                                <button onClick={()=>{setOpenReceive(true)}}>
                                    <div className="-500 flex w-20 items-center p-1 text-2xl    rounded-full">
                                        <img className="" src="https://cdn.discordapp.com/attachments/876498266550853642/984772328221204560/external_receive.png" alt=""/>
                                    </div>
                                    <div className="text-xs text-center text-white mt-1">
                                        Receive
                                    </div>
                                </button>

                                <button onClick={()=>{setOpenExternal(true)}}>
                                    <div className="-500 flex w-20 items-center p-1 text-2xl    rounded-full">
                                        <img className="" src="https://cdn.discordapp.com/attachments/876498266550853642/984772328510590976/external_.png" alt=""/>
                                    </div>
                                    <div className="text-xs text-center text-white mt-1">
                                       External
                                    </div>
                                </button>

                                <Link href="/wallet/trade">
                                    <a>
                                        <div className="-500 flex w-20 items-center p-1 text-2xl    rounded-full">
                                            <img className="" src="https://cdn.discordapp.com/attachments/876498266550853642/984772327982125086/external_trade.png" alt=""/>
                                        </div>
                                        <div className="text-xs text-center text-white mt-1">
                                            Trade
                                        </div>
                                    </a>
                                </Link>
                            </div>

                            <div className="mt-8 text-xl font-semibold text-white flex items-center">
                                Wallet Account
                                <div className="ml-5 text-2xl text-gray-500">
                                    <button>
                                        <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            {/*wallet balance*/}
                            <div className="mt-2 border-2 border-gray-500 rounded-xl  bg-white border-r-4 border-b-4">
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
                                        {externalNEARtoken}
                                    </div>
                                </div>
                                <div className="flex justify-between border-t border-gray-500 px-4 py-2 items-center ">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="rounded-full w-9"
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU" alt=""/>
                                        </div>
                                        <div className="ml-2 font-semibold">
                                            USN
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        {externalUSNtoken}
                                    </div>
                                </div>

                            </div>
                            <div className="mt-5 border-2 border-gray-500 rounded-xl bg-white  border-r-4 border-b-4">
                                <Link href="/wallet/external/pets">
                                <div className="flex justify-between px-4 py-2 items-center ">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="rounded-full w-10"
                                                 src="https://cdn.discordapp.com/attachments/876498266550853642/978935657407860756/Pets.png" alt=""/>
                                        </div>
                                        <div className="ml-2 font-semibold">
                                           勋章
                                        </div>
                                    </div>
                                    <div className="text-left">
                                       0
                                    </div>
                                </div>
                                </Link>
                            </div>

                        </div>


                    </div>
                </div>
                <Transition.Root show={openReceive} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenReceive}>
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
                                <div className="inline-block align-bottom bg-white w-full rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="   flex justify-center ">
                                            <div className="font-semibold text-center">
                                                RECEIVE
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center mt-2">
                                            <div className="rounded-full text-gray-700  text-center w-20 px-3 py-0.5 bg-blue-300 text-sm">
                                                NEAR
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="text-center text-sm text-gray-500">
                                            Scan address to receive payment
                                        </div>
                                        <div className=" flex justify-center  rounded-full border py-0.5 mt-2">
                                            {address}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => {Copy('address')}}
                                                type="button"
                                                className="w-full flex mt-5  justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                                            >
                                              COPY ADDRESS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={openExternal} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpenExternal}>
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
                                <Dialog.Overlay className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                <div className="inline-block align-bottom  bg-white rounded-lg px-10 py-10 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    {tokens.map((item=>(
                                     <Link href={`/wallet/toexternal/${item.name}`} key={item.id}>
                                    <div className="my-2 border-2 w-80 border-gray-500 rounded-xl  border-r-4 border-b-4">
                                        <div className="flex justify-between px-4 py-2 items-center ">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="rounded-full w-9"
                                                         src={item.avatar} alt=""/>
                                                </div>
                                                <div className="ml-2 font-semibold">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                        </Link>
                                        )))}
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </>
    )
}

const External = () =>{

    return (
        <div className="relative">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984772327361351680/external.png"
                    alt="People working on laptops"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />

            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between items-center">
                    <Link href="/main">
                        <img className="w-8 ml-4 " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </Link>
                    <div className="flex justify-center font-semibold text-2xl items-center text-white">
                        <Link href="/wallet/external">
                            <a className="   ">
                                External
                            </a>
                        </Link>
                    </div>
                    <div className="  text-2xl text-white px-5">
                        <i className="fa fa-cog " aria-hidden="true"></i>
                    </div>
                </div>
                <ExternalInfo/>
            </div>
        </div>
    )
}

export default External
