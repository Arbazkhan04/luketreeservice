import star from '../../assets/ratting.svg'; // Adjust the path as necessary

const Ratting = ({ value }) => {
  // Ensure value is a number and falls within a safe range
  const numStars = Math.min(Math.max(parseInt(value, 10) || 0, 0), 5);
  const stars = Array(numStars).fill(null);

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
