import PhotoGallery from './gallery';
import '../../index.css'; // Ensure your Tailwind CSS is imported here
import Ratting from './customRatting';
import reviewTree from '../../assets/reviewtree.svg';
import phone from '../../assets/phone.svg';
import tick from '../../assets/tick.svg';
import ReviewCard from './reviewCard'
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const handleWriteReview = () => {
        navigate('/review')
    }
    return (
        <div className="flex flex-col items-center w-full">
            <div className="container mx-auto px-4 py-3 mt-3">
                <div className="flex flex-col md:flex-row gap-2.5 mt-3 w-full">
                    <div className='flex flex-row order-2 md:order-1 w-full md:w-[70%]'>
                        <div className="flex-1 text-2xl font-semibold leading-10 text-slate-900">
                            Reviews
                        </div>
                        <div className="flex gap-1.5 md:ml-0">
                            <div className="flex gap-1 text-base text-gray-600 whitespace-nowrap">
                                <div className="flex flex-col justify-center rounded-none">
                                    <div className="flex gap-1 items-start py-2 rounded bg-neutral-100">
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                        <div>3</div>
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center rounded-none">
                                    <div className="flex gap-1 items-start py-2 rounded bg-neutral-100">
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                        <div>4</div>
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center rounded-none">
                                    <div className="flex gap-1 items-start py-2 rounded bg-neutral-100">
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                        <div>6</div>
                                        <div className="shrink-0 w-px h-2 bg-gray-50" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-1">
                                <Ratting />
                            </div>
                        </div>
                    </div>
                    <div onClick={handleWriteReview} className="order-1 md:order-2 w-full md:w-[30%] text-base font-semibold leading-6 text-white bg-[#3F79FE] rounded-full flex justify-center items-center py-3 cursor-pointer">
                        Write a Review
                    </div>
                </div>


                {/* about setion */}
                <div className="flex flex-col p-6 mt-2 w-full bg-white rounded-2xl border border-solid shadow-lg border-zinc-200">
                    <div className="flex justify-center items-center px-2.5 w-12 h-12 bg-blue-600 rounded-xl border border-blue-600 border-solid shadow-md rounded-full">
                        <img
                            loading="lazy"
                            src={reviewTree}
                            className="w-full aspect-square"
                        />
                    </div>
                    <div className="mt-2 text-xl font-medium leading-7">
                        <span className="">Price Starts at </span>
                        <span className="font-extrabold text-blue-600">$65</span>
                    </div>
                    <div className="mt-1 text-base leading-7 text-gray-500">
                        We trim/prune tree branches &lt; 25’ high, trim any tree of any
                        height, and remove trees &lt; 40’ high. Serving Seattle, Bothell, Mill
                        Creek, Eastside, and surrounding areas.
                    </div>
                    <div className="flex gap-5 justify-between mt-2 text-sm">
                        <div className="my-auto leading-6 text-gray-500">
                            Tap here to call
                        </div>
                        <div className="flex gap-1 justify-center py-2 pr-3 pl-2 font-medium tracking-widest text-center whitespace-nowrap bg-white border border-solid shadow border-zinc-200 leading-[155%] rounded-[1000px] text-zinc-950">
                            <img
                                loading="lazy"
                                src={phone}
                                className="shrink-0 self-start aspect-[0.95] w-[19px]"
                            />
                            <div>206-321-2510</div>
                        </div>
                    </div>
                    <div className="self-start mt-2 text-sm leading-6 text-gray-500">
                        Ask for Luke:
                    </div>
                    <div className="flex gap-2 justify-between self-start mt-2 text-sm font-medium tracking-normal leading-5 text-center text-zinc-950">
                        <div className="flex gap-3">
                            <img
                                loading="lazy"
                                src={tick}
                                className="shrink-0 self-start aspect-square w-[19px]"
                            />
                            <div>WA State Licensed</div>
                        </div>
                        <div className="flex gap-3 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src={tick}
                                className="shrink-0 self-start aspect-square w-[19px]"
                            />
                            <div>Insured</div>
                        </div>
                    </div>
                </div>
                {/* about setion end */}

                {/* photo gallery section */}
                <PhotoGallery />
                {/* photo gallery section end */}

                {/* review sections */}
                <ReviewCard />
                {/* review sections end */}
            </div>

        </div>
    );
}

export default Home;
