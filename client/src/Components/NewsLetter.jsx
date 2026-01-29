import React from 'react'

function NewsLetter() {
    return (
        <section className="flex flex-col items-center py-10 bg-white">
            <div className="flex flex-col items-center">
                <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 max-w-2xl">
                    Subscribe to our <span className="text-green-600">Newsletter</span>
                </h2>
                <p className="text-center text-gray-500 max-w-lg mt-2 px-4">
                    Get the latest updates on fresh arrivals and exclusive offers.
                </p>
            </div>
            
            <div className="flex items-center justify-center mt-6 border border-gray-200 focus-within:ring-1 focus-within:ring-green-600 text-sm rounded-full h-12 max-w-xl w-[90%] md:w-full bg-gray-50">
                <input 
                    className="bg-transparent outline-none rounded-full px-6 h-full flex-1 text-gray-700 placeholder:text-gray-400" 
                    placeholder="Enter your email address" 
                    type="email" 
                />
                <button className="bg-green-600 hover:bg-green-600 text-white rounded-full h-9 mr-1.5 px-6 flex items-center justify-center hover:brightness-95 active:scale-95 transition-all font-medium">
                    Subscribe
                </button>
            </div>
        </section>
    );
}

export default NewsLetter;