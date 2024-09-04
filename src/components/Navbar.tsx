"use client"
import { useState, useEffect, useContext } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
//  MoonIcon, SunIcon
import Link from 'next/link';

const Navbar = () => {
    
    const links = [
        { name: 'Home', link: '/' },
        { name: 'About', link: 'about' },
        { name: 'Projects', link: 'projects' },
        { name: 'Contact me', link: 'contact' },
    ];
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(false); // Close the mobile menu when the component mounts
    }, []);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="w-full max-w-screen fixed top-0 left-0 z-50 backdrop-blur">
            <div className="md:flex items-center justify-center py-4 md:px-10 px-7">


                {/* md: mobile icons */}
                <div
                    onClick={toggleMenu}
                    className="w-7 h-7 right-8 top-6 cursor-pointer md:hidden text-black absolute"
                >
                    {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* navbar */}
                <ul
                    className={`sticky md:flex md:items-center md:pd-0 md:static md:z-auto z-10 left-0 w-full md:w-auto mt-4 md:pl-0 pl-9 bg-slate-400 sm:bg-transparent transition-all duration-500 ease-in-out mobile-menu`}
                >
                    {links.map((item, index) => (
                        <li key={index} className="md:ml-8 md:my-0 my:7 font-semibold">
                            {item.link.startsWith('http') ? (
                                <a
                                    href={item.link}
                                    className="text-black transition-all duration-500 hover:text-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    href={item.link}
                                    className="text-black transition-all duration-500 hover:text-primary"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
