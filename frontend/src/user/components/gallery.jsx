import { useState } from 'react';
import arrow from '../../assets/logoarrow.svg';
import backarrow from '../../assets/backarrow.svg'
import img1 from '../../assets/highlight_1.jpg'
import img2 from '../../assets/highlight_2.png'
import img3 from '../../assets/highlight_3.png'
import img4 from '../../assets/highlight_4.jpg'

const images = [img1,img2,img3,img4];

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
            <div className="relative w-full pb-[76.25%] sm:pb-[50%] md:pb-[50%] lg:pb-[45%] xl:pb-[39%]">
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
