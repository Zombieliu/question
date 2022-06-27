import React from 'react'
import {useAtom} from "jotai";
import {GMTToken, GSTToken, NEARToken, PeopleAvatar} from "../../jotai";
import Link from "next/link";
import Wallet from "../wallet";
const Header = () =>{

    const [Avatar,]=useAtom(PeopleAvatar)
    return (
        <div className="fixed z-20 inset-x-0 flex justify-between px-5 mx-auto mt-3 ">
            <Link href="/account">
                <a>
                    <img className="rounded-full w-12" src={Avatar} alt=""/>
                </a>
            </Link>
            <Wallet/>

        </div>

    )
}

export default Header
