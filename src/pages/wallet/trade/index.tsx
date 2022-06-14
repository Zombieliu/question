import React, {Fragment, useState} from 'react'
import Link from "next/link";
import {Listbox, Transition} from "@headlessui/react";
import {Constant} from "../../../constant";
import axios from "axios";
import {useAtom} from "jotai";
import {LoadingState, NearAccount} from "../../../jotai";
import BN from 'bn.js';
import {formatDecimal} from "../../../utils";
import Loading from "../../../components/loading";
import {log} from "util";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokens1 = [
    // {
    //     id: 1,
    //     name: 'GST',
    //     avatar: "https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png",
    // },
    // {
    //     id: 2,
    //     name: 'GMT',
    //     avatar: "https://s2.coinmarketcap.com/static/img/coins/200x200/18069.png"
    // },
    {
        id: 3,
        name: 'NEAR',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    },
    // {
    //     id: 4,
    //     name: 'USN',
    //     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    // },
]
const tokens2 = [
    // {
    //     id: 1,
    //     name: 'GST',
    //     avatar: "https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png",
    // },
    // {
    //     id: 2,
    //     name: 'GMT',
    //     avatar: "https://s2.coinmarketcap.com/static/img/coins/200x200/18069.png"
    // },
    {
        id: 4,
        name: 'USN',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    },
]
const Trade = () =>{
    //import function
    const tokenInfo = Constant()
    //Top token
    const [selected, setSelected] = useState(tokens1[0])
    //Bottom token
    const [selected1, setSelected1] = useState(tokens2[0])
    //State loading
    const [openload,setOpenload]=useAtom(LoadingState)
    const [near_address,setNear_hex_account] =useAtom(NearAccount)
    //exchange token
    const exchange = ()=>{
        setSelected(selected1),
        setSelected1(selected)
    }
    const all = ()=>{
       (document.getElementById("amount") as HTMLInputElement).value =  classNames(tokenInfo.ExternalData[selected.name])
    }
    //Check how much
    const Check_TokenNumber =async ()=>{
        const data = (document.getElementById("amount") as HTMLInputElement).value
        const b = Number(data)
        const a = new BN(b).mul(new BN('10000000000000000000000000000')).toString()
        await axios.get("http://127.0.0.1:7001/api/near/user/swap/tokenA_to_usn_number",{
            params:{
                near_address,
                amount_in: a
            }
        }).then((data)=>{
       (document.getElementById("to") as HTMLInputElement).value = Number(formatDecimal(data.data/100000000000000000,2)).toString()
            console.log(data.data/100000000000000000)
             })
    }
    //trade
    const trade = async ()=>{
        setOpenload(true)
        setTimeout(()=>{
            setOpenload(false)
        },2000)
        const b = Number(classNames(tokenInfo.ExternalData[selected.name]))
        const amount_in = new BN(b).mul(new BN('10000000000000000000000000000')).toString()
        await axios.post("http://127.0.0.1:7001/api/near/user/swap/tokenA_to_usn",{
            near_address,amount_in
        })
    }

    return (
        <div className="relative">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984773293338947614/Trade.png"
                    alt="People working on laptops"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <Link href="/wallet/external">
                        <img className="w-8 h-12 ml-5 " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </Link>
                    <div className="text-xl mt-32 text-white text-2xl font-semibold">
                        TRADE
                    </div>
                    <div>
                        <div className="text-2xl text-white px-5">
                            <i className="fa fa-repeat" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative pt-56 px-4 py-10   mx-auto ">
                    <div>
                        <div className="py-6  px-4 border-gray-500 rounded-2xl border-2 border-r-4 border-b-4">
                            <div className="flex justify-between text-gray-500 text-sm items-center">
                                <div>
                                    From
                                </div>
                                <div className="flex text-xs mt-1">
                                    Balance:
                                    <div className="ml-0.5">
                                        {classNames(tokenInfo.ExternalData[selected.name])}
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="flex">
                                    <input type="text"
                                           className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700  transition duration-300  outline-none"
                                           id="amount"
                                           placeholder="0.00"
                                           onKeyUp={Check_TokenNumber}
                                    />
                                    <button onClick={all} className=" text-xs flex items-center text-yellow-400 ">
                                        MAX
                                    </button>
                                </div>
                                <div>
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({open}) => (
                                            <>
                                                <div className="mt-1 relative">
                                                    <Listbox.Button
                                                        className="relative w-full bg-white    border-gray-500 rounded-md  pl-3 pr-10 py-2 text-left cursor-default ">
                  <span className="flex items-center">
                    <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full"/>
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                                                        <span
                                                            className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
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
                                                            className="absolute z-10 mt-1 w-40 bg-white shadow-lg px-2 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  ">
                                                            {tokens1.map((token) => (
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
                            </div>

                        </div>

                        <div className="flex justify-center py-3">
                        <button onClick={exchange}  className="p-2  rounded-full flex justify-center items-center ">
                            <img className="w-10" src="https://cdn.discordapp.com/attachments/876498266550853642/984773293909377064/Trade.png" alt=""/>
                        </button>
                        </div>

                        <div className="py-6  px-4 border-gray-500 rounded-2xl border-2 border-r-4 border-b-4">
                            <div className="flex justify-between text-gray-500 text-sm items-center">
                                <div>
                                    To
                                </div>
                                {/*Check how much*/}
                                <button onClick={Check_TokenNumber} className=''>
                                    Check
                                </button>

                            </div>
                            <div className="flex mt-4">
                                <div className="flex">
                                    <input type="text"
                                           className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700  transition duration-300  outline-none"
                                           id="to"
                                           readOnly={true}

                                    />
                                </div>

                                <div className="ml-7">
                                    <Listbox value={selected1} onChange={setSelected1}>
                                        {({open}) => (
                                            <>
                                                <div className="mt-1 relative">
                                                    <Listbox.Button
                                                        className="relative w-full bg-white    border-gray-500 rounded-md  pl-3 pr-10 py-2 text-left cursor-default ">
                  <span className="flex items-center">
                    <img src={selected1.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full"/>
                    <span className="ml-3 block truncate">{selected1.name}</span>
                  </span>
                                                        <span
                                                            className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
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
                                                            className="absolute z-10 mt-1 w-40 bg-white shadow-lg px-2 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  ">
                                                            {tokens2.map((token) => (
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
                            </div>

                        </div>

                        <div className="flex justify-center mt-10 ">
                            <button onClick={trade} className=" flex mt-10  justify-center rounded-full  px-4 py-2  text-base font-medium  ">
                                <img className="w-72" src="https://cdn.discordapp.com/attachments/876498266550853642/984773293649297408/Trade.png" alt=""/>
                            </button>
                        </div>

                    </div>
                </div>
                <Loading/>
            </div>
        </div>
    )
}

export default Trade
