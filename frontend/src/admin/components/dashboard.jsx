
import React, { useState, useEffect } from 'react';
import Rating from '../../user/components/customRatting';
import heart from '../../assets/hearth.svg';
import location from '../../assets/location.svg';
import neighthood from '../../assets/neighbour.svg';
import { getAllReviews, unPublishReviewById,publishBackReviewById,deleteReviewById } from '../../apiManager/reviewApi';
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EditDateModal from './editDateModal';
import EditReview from './editReview';

const emojisList = ['❤️', '😊', '😍', '😲', '😎'];

export default function Dashboard() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved');
    setIsModalOpen(false);
  };


  const navigate = useNavigate();

  const handleWriteReview = () => {
    navigate('/review')
  }

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

  const upPublishReviewById = async (reviewId) => {
    try {
      setLoading(true);
      const response = await unPublishReviewById(reviewId);
      console.log(response);
      setReviews((prevReviews) => prevReviews.map(review => 
        review.reviewId === reviewId ? {...review, status: "0"} : review
      ));
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handlePublish = async (reviewId) => {
    try {
      setLoading(true);
      const response = await publishBackReviewById(reviewId);
      console.log(response);
      setReviews((prevReviews) => prevReviews.map(review => 
        review.reviewId === reviewId ? {...review, status: "1"} : review
      ));
      
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      setLoading(true);
      const response = await deleteReviewById(reviewId);
      console.log(response);
      setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
  }}

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="container mx-auto px-4 py-3 mt-1">
          <div className="flex flex-col md:flex-row gap-2.5 mt-3 w-full">
            <div className='flex flex-row order-2 md:order-1 w-full md:w-[70%] items-center'>
              <div className="flex-1 text-2xl font-semibold leading-10 text-slate-900 pl-4 md:mt-4">
                Reviews
              </div>
              <div className="flex gap-1.5 md:ml-0 pr-4 items-center">
                <div className="flex gap-1 text-base text-gray-600 whitespace-nowrap items-center">
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
                <div className="flex gap-1 items-center">
                  <Rating value={'5'} />
                </div>
              </div>
            </div>
            <div onClick={handleWriteReview} className="order-1 md:order-2 w-full md:w-[30%] text-base font-semibold leading-6 text-white bg-[#3F79FE] rounded-full flex justify-center items-center py-3 cursor-pointer mb-3 md:mb-0">
              Write a Review
            </div>
          </div>
        </div>
      </div>
      {reviews.map((review) => {
        const isExpanded = expandedReviews[review.reviewId];
        const isLongReview = review.review.length > 100;
        const reviewText = isExpanded || !isLongReview
          ? review.review
          : review.review.substring(0, 140) + '...';

        return (
          <div className="flex flex-col items-center w-full">
            <div className="container mx-auto px-4 py-1 mt-1">
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
                  <div className="flex gap-2 justify-start items-center">
                    <div className="my-auto text-xs leading-4 text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',  // "Fri"
                        year: 'numeric',   // "2024"
                        month: 'short',    // "Aug"
                        day: 'numeric'     // "9"
                      })}
                    </div>
                    <button onClick={handleEditClick} className="p-1  text-black rounded-full">
                      <FaEdit />
                    </button>
                    {/* Add the EditModal component */}
                    <EditDateModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveChanges} />
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
                {review.indexsOfEmoji != '<empty>' && (<div className="flex gap-2 mt-2">
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

                {/* Action buttons */}

                <div className="flex justify-end space-x-3 mt-1">
                  <button onClick={() => navigate(`/admin/edit/review/${review.reviewId}`)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <FaEdit />
                  </button>
                  {review.status === "1" ? (
                    <button onClick={() => upPublishReviewById(review.reviewId)} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
                      <FaEyeSlash />
                    </button>
                  ) :
                    (
                      <button 
                      onClick={() => handlePublish(review.reviewId)} 
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                      <FaEye />
                  </button>
                  )}
                  <button onClick={() => handleDeleteReview(review.reviewId)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
