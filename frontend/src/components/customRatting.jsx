
import star from '../assets/ratting.svg'; // Adjust the path as necessary

const Ratting = () => {
  const stars = Array(5).fill(null); // Array with 5 elements representing the stars

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => (
        <img
          key={index} // Use the index as the key
          loading="lazy"
          src={star}
          className="shrink-0 w-3.5 aspect-square"
          alt="Star"
        />
      ))}
    </div>
  );
};

export default Ratting;
