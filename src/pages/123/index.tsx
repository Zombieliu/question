import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Test = () =>{
    const [open, setOpen] = useState(true)
    const [num,setnum]=useState(10)
    const test = ()=>{

    }

    return (
        <Transition.Root show={open} as={Fragment}
        >
            <div className="snap-mandatory snap-x flex  w-96  overflow-auto ">
                <div className="snap-center w-96">
                    <img
                        src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"/>
                </div>
                <div className="snap-center w-96">
                    <img
                        src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"/>
                </div>
                <div className="snap-center w-96">
                    <img
                        src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"/>
                </div>
                <div className="snap-center w-96">
                    <img
                        src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"/>
                </div>
            </div>
        </Transition.Root>
    )
}

export default Test
