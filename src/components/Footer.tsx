import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-20">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">YT-DL</h3>
                    <p className="text-gray-400">Download YouTube videos and shorts effortlessly.</p>
                </div>
                <div className="mb-4">
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="text-gray-400">
                    &copy; {new Date().getFullYear()} YT-DL. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
