import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams();

  // Use the useQuery hook to fetch the hotel data from the server
  // The query is only enabled if hotelId is truthy (i.e., not null, undefined, or an empty string)
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  // Use the useMutation hook to define a mutation for updating the hotel
  // The mutate function is used to execute the mutation
  // isLoading is a boolean that indicates whether the mutation is currently in progress
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  // Define a function to handle form submission
  // This function calls mutate with the form data
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  // Render the ManageHotelForm component
  // Pass the handleSave function, the hotel data, and the isLoading state as props
  return (
    <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading} />
  );
};

// Export the EditHotel component as the default export
export default EditHotel;
