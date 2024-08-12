import React, { useState, useEffect } from 'react';
import Rating from './customRatting';
import heart from '../../assets/hearth.svg';
import location from '../../assets/location.svg';
import neighthood from '../../assets/neighbour.svg';
import { getAllReviews } from '../../apiManager/reviewApi';

const emojisList = ['❤️', '😊', '😍', '😲', '😎'];

export default function ReviewCard() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedReviews, setExpandedReviews] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getAllReviews();
                setReviews(data); // Store the fetched reviews in the state
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleToggle = (reviewId) => {
        setExpandedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {reviews.filter(review => review.status === "1").map((review) => {
                const isExpanded = expandedReviews[review.reviewId];
                const isLongReview = review.review.length > 100;
                const reviewText = isExpanded || !isLongReview
                    ? review.review
                    : review.review.substring(0, 140) + '...';

                return (
                    <div
                        key={review.reviewId}
                        className="flex flex-col p-6 mb-4 bg-white rounded-2xl border border-solid shadow-lg border-zinc-200"
                    >
                        <div className="flex gap-2.5 justify-between w-full">
                            <div className="flex gap-2.5 text-xs font-semibold leading-5 text-center text-slate-900">
                                <img
                                    loading="lazy"
                                    src={review.imageUrl}
                                    className="shrink-0 aspect-square w-[34px] h-[34px] rounded-full object-cover"
                                />
                                <div className="my-auto">
                                    {review.firstName} {review.lastName}
                                </div>
                            </div>

                            <div className="flex gap-1 my-auto">
                                <Rating value={review.ratting} />
                            </div>
                        </div>

                        <div className="flex gap-2.5 justify-between mt-2 w-full text-xs leading-4 text-slate-500">
                            <div className="flex gap-1.5 whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src={location}
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div className="my-auto">{review.city}</div>
                            </div>
                            <div className="flex gap-1.5">
                                <img
                                    loading="lazy"
                                    src={neighthood}
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div className="my-auto">{review.neighbourhoodName}</div>
                            </div>
                        </div>

                        <div className="flex gap-2.5 justify-between mt-2">
                            <div className="text-xs font-semibold leading-5 text-center text-green-700">
                                {review.isNextDoorReview === "1" && "Nextdoor review"}
                            </div>
                            <div className="my-auto text-xs leading-4 text-slate-500">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'short',  // "Fri"
                                    year: 'numeric',   // "2024"
                                    month: 'short',    // "Aug"
                                    day: 'numeric'     // "9"
                                })}
                            </div>
                        </div>

                        <div className="mt-2 text-xs leading-5 text-slate-900">
                            {reviewText}
                        </div>

                        {isLongReview && (
                            <div
                                className="text-xs leading-5 text-blue-600 underline cursor-pointer"
                                onClick={() => handleToggle(review.reviewId)}
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </div>
                        )}
                        {review.indexsOfEmoji !='<empty>' && (<div className="flex gap-2 mt-2">
                            <div className="flex text-xs whitespace-nowrap text-zinc-900 relative">
                                {review.indexsOfEmoji.split('').map((index, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-1xl absolute ${idx === 1 ? 'left-2 top-0' : 'left-0 top-0'
                                            }`}
                                    >
                                        {emojisList[index]}
                                    </div>
                                ))}
                                {review.totalNumberOfEmoji > 2 ? (
                                    <div className="my-auto mx-6">+{review.totalNumberOfEmoji}</div>
                                ) : (
                                    <div className="my-auto mx-6">{review.totalNumberOfEmoji}</div>
                                )}
                                
                            </div>
                        </div>)
                       }
                        
                    </div>
                );
            })}
        </>
    );
}
