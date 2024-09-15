import React from 'react';
import DotNavigation from './Dotnavigation'; // Import the DotNavigation component

function About() {
    return (
        <div>
            <div className='fixed max-w-[1000px] justify-center items-center bottom-0 bg-gray-100 py-7 rounded-3xl flex flex-col gap-6 px-6'>
                <h1 className='text-3xl font-bold text-center'>Fruit.Ai</h1>
                <p className='text-sm text-gray-600 md:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero deserunt esse neque. Neque porro consectetur ducimus, harum, minus deleniti consequuntur optio amet numquam in magnam sit quasi eius ad nihil!</p>
                <button className='px-16 py-1 rounded-xl bg-black text-white max-w-[300px] mb-16 sm:mb-8'>About</button>

            </div>
            <DotNavigation /> {/* Include DotNavigation */}
        </div>
    );
}

export default About;
