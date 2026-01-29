import React from 'react';
import { footerLinks } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-gray-50">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-300 text-gray-600">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                        Shopcart
                    </h2>
                    <p className="max-w-[410px] mt-6 text-sm leading-6">
                        We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
                    </p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[60%] gap-8">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="min-w-[120px]">
                            <h3 className="font-semibold text-base text-gray-900 mb-5">
                                {section.title}
                            </h3>
                            <ul className="text-sm space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a 
                                            href="#" 
                                            className="hover:text-green-600 transition-colors duration-200"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <p className="py-6 text-center text-sm text-gray-500">
                Copyright 2026 © <span className="font-medium text-gray-700">Shopcart</span> All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;