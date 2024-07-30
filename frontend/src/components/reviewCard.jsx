import Ratting from './customRatting';
import heart from '../assets/hearth.svg';
import location from '../assets/location.svg';
import neighthood from '../assets/neighbour.svg';

export default function ReviewCard() {
    return (
        <div className="flex flex-col p-6 mt-2 w-full bg-white rounded-2xl border border-solid shadow-lg border-zinc-200">
            <div className="flex gap-2.5 justify-between w-full">
                <div className="flex gap-2.5 text-xs font-semibold leading-5 text-center text-slate-900">
                    <img
                        loading="lazy"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                        className="shrink-0 aspect-square w-[34px] h-[34px] rounded-full object-cover"
                    />
                    <div className="my-auto">Christa Olson</div>
                </div>

                <div className="flex gap-1 my-auto">
                    <Ratting />
                </div>

            </div>
            <div className="flex gap-2.5 justify-between mt-2 w-full text-xs leading-4 text-slate-500">
                <div className="flex gap-1.5 whitespace-nowrap">
                    <img
                        loading="lazy"
                        src={location}
                        className="shrink-0 w-5 aspect-square"
                    />
                    <div className="my-auto">Portalnd</div>
                </div>
                <div className="flex gap-1.5">
                    <img
                        loading="lazy"
                        src={neighthood}
                        className="shrink-0 w-5 aspect-square"
                    />
                    <div className="my-auto">Fare Harbor</div>
                </div>
            </div>
            <div className="flex gap-2.5 justify-between mt-2">
                <div className="text-xs font-semibold leading-5 text-center text-green-700">
                    nextdoor review
                </div>
                <div className="my-auto text-xs leading-4 text-slate-500">
                    Wed Dec 14, 2022
                </div>
            </div>
            <div className="mt-2 text-xs leading-5 text-slate-900">
                Luke was very knowledgeable and friendly. He met my expectations and
                in a timely manner. Prices were ...{" "}
            </div>
            <div className="flex gap-2">
                <div className="text-xs leading-5 text-blue-600 underline">
                    <span className="font-bold text-blue-600 underline">read more</span>{" "}
                </div>
                <div className="flex text-xs whitespace-nowrap text-zinc-900">
                    <img
                        loading="lazy"
                        src={heart}
                        className="shrink-0 aspect-[1.64] w-[33px]"
                    />
                    <div className="my-auto">+4</div>
                </div>
            </div>
        </div>
    )
}
