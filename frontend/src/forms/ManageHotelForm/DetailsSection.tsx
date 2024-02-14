import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3 text-blue-700">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          placeholder="Enter hotel name"
          className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full py-1 px-2 font-normal shadow-sm"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm font-bold">
            {errors.name.message}
          </span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            placeholder="Enter city"
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full py-1 px-2 font-normal shadow-sm"
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && (
            <span className="text-red-500 text-sm font-bold">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            placeholder="Enter country"
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full py-1 px-2 font-normal shadow-sm"
            {...register("country", {
              required: "This field is required",
            })}
          />
          {errors.country && (
            <span className="text-red-500 text-sm font-bold">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={8}
          placeholder="Enter description"
          className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full py-1 px-2 font-normal shadow-sm"
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm font-bold">
            {errors.description.message}
          </span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Price Per Night
          <input
            type="number"
            placeholder="Enter price per night"
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full py-1 px-2 font-normal shadow-sm"
            {...register("pricePerNight", {
              required: "This field is required",
              min: {
                value: 1,
                message: "cannot be 0",
              },
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-sm font-bold">
              {errors.pricePerNight.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="appearance-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded w-full p-2 text-gray-700 font-normal shadow-sm bg-white">
            <option value="" className="text-sm font-bold">
              Select a Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-sm font-bold">
              {errors.starRating.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
