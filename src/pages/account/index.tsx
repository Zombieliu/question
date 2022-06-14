import Link from 'next/link'
import React, {Fragment, useState} from 'react'
import {CheckIcon, SelectorIcon, StarIcon} from "@heroicons/react/solid";
import {Listbox, Switch, Transition} from '@headlessui/react'
import {useAtom} from "jotai";
import {PeopleAvatar, PeopleEmail, PeopleName, SwitchChain} from "../../jotai";



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
const Account = () =>{
    const [enabled, setEnabled] = useState(false)
    const [name,setName] = useAtom(PeopleName)
    const [email,setEmail] = useAtom(PeopleEmail)
    const [avatar,setAvatar] = useAtom(PeopleAvatar)
    const [selected, setSelected] = useAtom(SwitchChain)
    const  info ={
        credit: 4
    }

    return (
        <div className="relative ">
            <div className="absolute inset-x-0 bottom-0    " />

            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984845613344641054/11b94cf14c61fc08.png"
                    alt="People working on laptops"
                />
            </div>
            <div className=" mx-auto  ">
                <Link href="/main">
                    <div className="fixed z-20 inset-x-0 text-2xl text-gray-600 pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </div>
                </Link>
                <div className="max-w-7xl relative px-8 py-5  mx-auto ">
                    <div className="mt-16">
                        {/*information*/}
                        <div className=" flex  justify-between items-center">
                            <Link href="/account/info">
                            <div className="flex text-white">
                                <img className="w-20 rounded-full" src={avatar} alt=""/>
                                <div className="text-left text-sm  ml-2">
                                    <div className="font-semibold text-xl">
                                        {name}
                                    </div>
                                    <div className="text-gray-200 ">
                                        {email}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        {/* ActivationCode*/}
                        <div className=" flex  justify-between items-center mt-10">
                            <div className="flex items-center ">
                                <div className="text-left   ml-2">
                                    <div className="font-semibold">
                                       Activation code
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-500 text-xl flex items-center">
                                <div className="mr-4  text-base text-black font-semibold">
                                    1
                                </div>
                                <Link href="/account/activation">
                                <i className="fa fa-chevron-right " aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                        {/*  TotalAchievement*/}
                        <div className=" flex  justify-between items-center mt-10">
                            <div className="flex items-center ">
                                <div className="text-left   ml-2">
                                    <div className="font-semibold">
                                        Questions Times
                                    </div>
                                </div>
                            </div>
                            <Link href="account/times">
                                <a  className="text-gray-500 text-xl flex items-center">
                                {/*<div className="mr-4  text-base text-black font-semibold">*/}
                                {/*   */}
                                {/*</div>*/}
                                <i className="fa fa-chevron-right " aria-hidden="true"></i>
                                </a>
                            </Link>
                        </div>
                        {/* Credit*/}
                        <div className=" flex  justify-between items-center mt-10">
                            <div className="flex items-center ">
                                <div className="text-left   ml-2">
                                    <div className="font-semibold">
                                       Credit
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-500 text-xl flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            info.credit > rating ? 'text-yellow-400' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*WorkTime*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                   Work Time
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="  w-48 h-5 rounded-full">
                                <div className=" text-sm text-black text-right font-semibold  ">
                                   2个月
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*QuestionsTimes*/}
                    {/* Multi-ChainSwitch*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                    Multi-Chain Switch
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="mr-4  text-base text-black font-semibold">
                                <div className="flex justify-center">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({open}) => (
                                            <>
                                                <div className=" relative">
                                                    <Listbox.Button className="relative     text-left  ">
                                          <span className="flex items-center">
                                            <span className=" block truncate">{selected.name}</span>
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
                                                            className="absolute z-10 mt-1 w-48  -ml-24 bg-white shadow-lg px-2 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  ">
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
                            </div>
                            <i className="fa fa-chevron-right " aria-hidden="true"></i>
                        </div>
                    </div>
                    {/* Sound*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                    Sound
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer "
                            >
                                <span className="sr-only">Use setting</span>
                                <span aria-hidden="true" className="pointer-events-none absolute bg-white w-full h-full rounded-md" />
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                        'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
                                    )}
                                />
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabled ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
                                    )}
                                />
                            </Switch>
                        </div>
                    </div>
                    {/* Version*/}
                    <div className=" flex  justify-between items-center mt-10">
                        <div className="flex items-center ">
                            <div className="text-left   ml-2">
                                <div className="font-semibold">
                                   Version
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 text-xl flex items-center">
                            <div className="mr-4  text-base text-black font-semibold">
                               0.0.1
                            </div>
                        </div>
                    </div>
                    {/*LOGOUT*/}
                    <div className="flex justify-center mt-20">
                        <button
                            type="button"
                            className="w-44"
                        >
                            <img src="https://cdn.discordapp.com/attachments/876498266550853642/986208220232187954/LOGOUT.png" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
