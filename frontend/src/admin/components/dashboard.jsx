// import { useState } from 'react';

// const emojisList = ['❤️','😊', '😍', '😲', '😎'];

// export default function Dashboard() {
//   const [emojiCount, setEmojiCount] = useState(1);
//   const [selectedEmojis, setSelectedEmojis] = useState([]);
//   const [selectedIndicesString, setSelectedIndicesString] = useState('');

//   const handleEmojiSelection = (emoji, index) => {
//     let newSelectedEmojis = [...selectedEmojis];
//     let newSelectedIndicesString = selectedIndicesString;

//     if (selectedEmojis.includes(emoji)) {
//       newSelectedEmojis = selectedEmojis.filter((e) => e !== emoji);
//       newSelectedIndicesString = newSelectedIndicesString.replace(index.toString(), '');
//     } else if (selectedEmojis.length < 2) {
//       newSelectedEmojis.push(emoji);
//       newSelectedIndicesString += index.toString();
//     }

//     setSelectedEmojis(newSelectedEmojis);
//     setSelectedIndicesString(newSelectedIndicesString);
//   };

//   const handleEmojiCountChange = (e) => {
//     const newCount = parseInt(e.target.value);
//     setEmojiCount(newCount);
//     if (selectedEmojis.length > newCount) {
//       const newSelectedEmojis = selectedEmojis.slice(0, newCount);
//       const newSelectedIndicesString = newSelectedEmojis.map((emoji) => emojisList.indexOf(emoji)).join('');
//       setSelectedEmojis(newSelectedEmojis);
//       setSelectedIndicesString(newSelectedIndicesString);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <div className="p-4 bg-white shadow rounded">
//         <div className="mb-4">
//           <label htmlFor="emojiCount" className="block text-sm font-medium text-gray-700">
//             Select the number of emojis
//           </label>
//           <input
//             type="number"
//             id="emojiCount"
//             value={emojiCount}
//             onChange={handleEmojiCountChange}
//             min="1"
//             max={emojisList.length}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Select up to {emojiCount} emoji(s)
//           </label>
//           <div className="flex space-x-2 mt-2">
//             {emojisList.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => handleEmojiSelection(emoji, index)}
//                 className={`text-2xl ${selectedEmojis.includes(emoji) ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded-full`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="mt-4">
//           <h3 className="text-lg font-medium">Selected Emojis</h3>
//           <div className="flex space-x-2 mt-2">
//             {selectedEmojis.map((emoji, index) => (
//               <span key={index} className="text-2xl">
//                 {emoji}
//               </span>
//             ))}
//           </div>
//           <div className="mt-2">
//             <h3 className="text-lg font-medium">Selected Indices String</h3>
//             <span>{selectedIndicesString}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import Ratting from '../../user/components/customRatting';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEyeSlash, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons library
import heart from '../../assets/hearth.svg';
import location from '../../assets/location.svg';
import neighthood from '../../assets/neighbour.svg';

function Dashboard() {
  const navigate = useNavigate();

  const handleWriteReview = () => {
      navigate('/review')
  }

  return (
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
                              <Ratting />
                          </div>
                      </div>
                  </div>
                  <div onClick={handleWriteReview} className="order-1 md:order-2 w-full md:w-[30%] text-base font-semibold leading-6 text-white bg-[#3F79FE] rounded-full flex justify-center items-center py-3 cursor-pointer mb-3 md:mb-0">
                        Write a Review
                    </div>
              </div>

              {/* Review sections */}
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
                  <div className="flex gap-2.5 justify-between mt-4 w-full text-xs leading-4 text-slate-500">
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

                  {/* Action buttons */}
                  <div className="flex justify-end space-x-3 mt-4">
                      <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                          <FaEdit />
                      </button>
                      <button className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
                          <FaEyeSlash />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                          <FaTrash />
                      </button>
                  </div>
              </div>
              {/* Review sections end */}
          </div>
      </div>
  );
}

export default Dashboard;
