"use client"
import Image from 'next/image';

interface Props {
    image: string;
    title: string;
    value: number;
    color: string;
}


const DasshCard1 = ({image,
    title,
    value, color}: Props) => {
    return (
        <div className={`flex flex-col space-y-1 p-4 w-full md:w-[300px] h-[150px]  rounded-xl ${color}`}>
                <div className="bg-white w-[40px] h-[40px] rounded-md flex items-center justify-center p-2">
                    <Image src={image} alt="Vue logo" width={40} height={40} />
                </div>

                <h1 className='text-md text-gray-400 font-regular'>{title}</h1>
                <h1 className='text-4xl text-gray-800 font-bold'>{value}</h1>

            </div>
    )
}

export default DasshCard1