import { useState } from 'react';
import arrow from '../assets/logoarrow.svg';
import backarrow from '../assets/backarrow.svg'
const images = [
    'https://images.unsplash.com/photo-1444492827838-96343b09c9af?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1520262454473-a1a82276a574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyZWV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFuZHNjYXBlfGVufDB8fDB8fHww',
];

const PhotoGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col items-center px-2 py-10 mt-1 w-full">
            <div className="relative w-full pb-[56.25%] sm:pb-[45%] md:pb-[40%] lg:pb-[35%] xl:pb-[30%]">
                <img
                    loading="lazy"
                    src={images[currentIndex]}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    alt="Gallery"
                />
                <div className="absolute inset-0 flex justify-between items-center px-4">
                    <div
                        onClick={handlePrev}
                        className="flex justify-center items-center px-1.5 w-7 h-7 bg-white rounded-full shadow-[0px_3px_10px_rgba(0,0,0,0.1)] cursor-pointer"
                    >
                        <img
                            loading="lazy"
                            src={backarrow}
                            className="w-4 aspect-square"
                            alt="Previous"
                        />
                    </div>
                    <div
                        onClick={handleNext}
                        className="flex justify-center items-center px-1.5 w-7 h-7 bg-white rounded-full shadow-[0px_3px_10px_rgba(0,0,0,0.1)] cursor-pointer"
                    >
                        <img
                            loading="lazy"
                            src={arrow}
                            className="w-4 aspect-square"
                            alt="Next"
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-1.5 justify-center px-5 mt-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`shrink-0 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-neutral-200'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
