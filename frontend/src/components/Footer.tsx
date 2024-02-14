const Footer = () => {
  return (
    <div className="bg-blue-950 py-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          FindTheBestSpot.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition-colors duration-200 ease-in-out">
            Term of Service
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
