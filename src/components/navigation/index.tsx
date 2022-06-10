import Link from 'next/link'
import React from 'react'
import Leaderboard from "../../pages/leaderboard";

const Navigation = () =>{
    return (
            <div className=" fixed z-20 bottom-0 w-full px-8 mx-auto">


        <div className="flex justify-between w-full bg-white px-4 p-2 border-2 border-blue-300 rounded-full">
            {/*home*/}
            <Link href="/main">
                <a className="text-2xl ">
            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                </a>
            </Link>
            {/*bag*/}
            <Link href="/bag">
                <a className="text-2xl">
                <i className="fa fa-cube" aria-hidden="true"></i>
                </a>
            </Link>
            {/*rank*/}
            <Link href="/leaderboard">
                <a className="text-2xl">
                <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                </a>
        </Link>
            {/*shop*/}
            <Link href="/shop">
                <a className="text-2xl">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </a>
            </Link>
        </div>
                </div>
    )
}

export default Navigation
