"use client";

import axiosInstance from "@/src/lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const BookingPage = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      {step === 1 && <CTA setStep={setStep} />}
      {/* {step === 2 && <VehicleSelector setMainStep={setStep} />} */}
    </>
  );
};

export default BookingPage;

const CTA = ({ setStep }: any) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
      {/* Shop Products */}
      <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
        <div className="flex justify-center items-center gap-1 mb-2 py-1 bg-gray-50 rounded-md w-1/4 mx-auto border-x-1 border-red-500">
          <Image
            src="/shop.webp"
            alt="Shop Icon"
            width={25}
            height={25}
          />
          <h3 className="md:text-sm lg:text-xl text-black font-semibold">
            SHOP
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Shop the best products, then book your install at checkout.
        </p>
        <button
          onClick={() => setStep(2)}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base">
          SHOP PRODUCTS
        </button>
      </div>
      {/* divider */}
      <div className="hidden md:flex  items-center justify-center h-40 my-auto">
        <div className="flex flex-col items-center">
          {/* Top half of the divider */}
          <div className="w-[0.5px] h-16 bg-gray-300" />

          {/* "or" text with spacing */}
          <div className="text-gray-400 text-sm py-1">o&nbsp;r</div>

          {/* Bottom half of the divider */}
          <div className="w-[0.5px] h-16 bg-gray-300" />
        </div>
      </div>

      {/* Schedule Service */}
      <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
        <div className="flex justify-center py-1  items-center gap-1 mb-2 bg-gray-50 rounded-md w-1/3 mx-auto border-x-1 border-red-500">
          <Image
            src="/service.png"
            alt="Service Icon"
            width={25}
            height={25}
          />
          <h3 className="md:text-sm lg:text-xl text-black font-semibold">
            SERVICE
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Schedule an in-store visit for consultation, repair, inspection and
          more.
        </p>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base">
          SCHEDULE SERVICE
        </button>
      </div>
    </div>
  );
};

// const VehicleSelector = ({ setMainStep }: any) => {
//   const [step, setStep] = useState(1);
//   const [vehicle, setVehicle] = useState({
//     year: "",
//     make: "",
//     model: "",
//     trim: "",
//     tireSize: "",
//   });
//   const {
//     data: years,
//     isLoading: isYearsLoading,
//     isError: isYearsError,
//   } = useGetYears({});
//   const {
//     data: makes,
//     isLoading: isMakesLoading,
//     isError: isMakesError,
//   } = useGetMakes({});
//   const {
//     data: models,
//     isLoading: isModelsLoading,
//     isError: isModelsError,
//   } = useGetModels({});
//   const {
//     data: trims,
//     isLoading: isTrimsLoading,
//     isError: isTrimsError,
//   } = useGetTrims({});
//   // Only fetch tire sizes when all previous selections are made
//   const fetchTyreSizes = async (
//     year: any,
//     make: any,
//     model: any,
//     trim: any
//   ) => {
//     // if (!year || !make || !model || !trim) return null;
//     try {
//       const response = await axiosInstance.get(
//         `/tire-size?year=${year}&make=${make}&model=${model}&trim=${trim}`
//       );
//       console.log({ response });
//       return response.data;
//     } catch (error) {
//       console.log({ error });
//     }
//   };
//   const {
//     data: tyreSizes,
//     isLoading: isTyreSizesLoading,
//     isError: isTyreSizesError,
//   } = useQuery({
//     queryKey: [
//       "tyreSizes",
//       vehicle.year,
//       vehicle.make,
//       vehicle.model,
//       vehicle.trim,
//     ],
//     queryFn: async () =>
//       await fetchTyreSizes(
//         vehicle.year,
//         vehicle.make,
//         vehicle.model,
//         vehicle.trim
//       ),
//     enabled:
//       !!vehicle.year && !!vehicle.make && !!vehicle.model && !!vehicle.trim, // Only run when all dependencies are available
//     // enabled: true
//   });

//   const steps = ["Year", "Make", "Model", "Trim", "Tire Size"];

//   const handleStepClick = (stepIndex: number) => {
//     setStep(stepIndex);
//   };

//   const handleSelectChange = (key: string, value: string) => {
//     setVehicle({ ...vehicle, [key]: value });
//     setStep(step + 1);
//   };
//   console.log({ tyreSizes, vehicle });

//   return (
//     <div className="mx-auto mt-10 p-5 border rounded-lg shadow-lg">
//       <div className="flex justify-center items-center gap-3 mb-5">
//         {steps.map((label, index) => (
//           <div
//             key={index}
//             className={`flex items-center cursor-pointer ${
//               step >= index + 1 ? "text-green-500" : "text-gray-400"
//             }`}
//             onClick={() => handleStepClick(index + 1)}>
//             <div
//               className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
//                 step === index + 1
//                   ? "border-orange-500"
//                   : step > index + 1
//                     ? "border-green-500"
//                     : "border-gray-400"
//               }`}>
//               {index + 1}
//             </div>
//             <span className="ml-2 text-sm font-medium">{label}</span>
//           </div>
//         ))}
//       </div>

//       <div className="mt-5">
//         <h2 className="text-xl font-bold mb-4">
//           {vehicle?.year} {vehicle?.make}
//         </h2>
//         <h2 className="text-xl font-bold mb-4">
//           {vehicle?.model} {vehicle?.trim}
//         </h2>
//         <p className="mb-2">
//           What is the
//           <span className="font-bold">
//             {step === 1 && " year "}
//             {step === 2 && " make "}
//             {step === 3 && " model "}
//             {step === 4 && " trim "}
//             {step === 5 && " tire size "}
//           </span>
//           of your vehicle?
//         </p>
//         {step === 1 && (
//           <div>
//             <select
//               className="w-[200px] border border-[#71717ab3] bg-default-50 rounded-md px-2 py-3.5"
//               value={vehicle.year}
//               onChange={(e) => handleSelectChange("year", e.target.value)}>
//               <option value="">*Year</option>
//               {isYearsLoading && <option value="">Loading Years...</option>}
//               {isYearsError && <option value="">Failed to load Years</option>}
//               {years?.data?.map((y: any) => (
//                 <option
//                   key={y?.year?.numeric}
//                   value={y?.year?.numeric}>
//                   {y?.year?.numeric}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <select
//               className="w-[200px] border border-[#71717ab3] bg-default-50 rounded-md px-2 py-3.5"
//               value={vehicle.make}
//               onChange={(e) => handleSelectChange("make", e.target.value)}>
//               <option value="">*Make</option>
//               {isMakesLoading && <option value="">Loading Makes...</option>}
//               {isMakesError && <option value="">Failed to load Makes</option>}
//               {makes?.data?.map((m: any) => (
//                 <option
//                   key={m?.make}
//                   value={m?.make}>
//                   {m?.make}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {step === 3 && (
//           <div>
//             <select
//               className="w-[200px] border border-[#71717ab3] bg-default-50 rounded-md px-2 py-3.5"
//               value={vehicle.model}
//               onChange={(e) => handleSelectChange("model", e.target.value)}>
//               <option value="">*Model</option>
//               {isModelsLoading && <option value="">Loading Models...</option>}
//               {isModelsError && <option value="">Failed to load Models</option>}
//               {models?.data?.map((m: any) => (
//                 <option
//                   key={m?.model}
//                   value={m?.model}>
//                   {m?.model}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {step === 4 && (
//           <div>
//             <select
//               className="w-[200px] border border-[#71717ab3] bg-default-50 rounded-md px-2 py-3.5"
//               value={vehicle.trim}
//               onChange={(e) => handleSelectChange("trim", e.target.value)}>
//               <option value="">*Trim</option>
//               {isTrimsLoading && <option value="">Loading Trims...</option>}
//               {isTrimsError && <option value="">Failed to load Trims</option>}
//               {trims?.data?.map((t: any) => (
//                 <option
//                   key={t?.trim}
//                   value={t?.trim}>
//                   {t?.trim}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {step === 5 && (
//           <div>
//             <select
//               className="w-[200px] border border-[#71717ab3] bg-default-50 rounded-md px-2 py-3.5"
//               value={vehicle.tireSize}
//               onChange={(e) => handleSelectChange("tireSize", e.target.value)}>
//               <option value="">*Tire Size</option>
//               {isTyreSizesLoading && (
//                 <option value="">Loading Tire Sizes...</option>
//               )}
//               {isTyreSizesError && (
//                 <option value="">Failed to load Tire Sizes</option>
//               )}
//               {tyreSizes?.data?.map((t: any) => (
//                 <option
//                   key={t?.tireSize}
//                   value={t?.tireSize}>
//                   {t?.tireSize}
//                 </option>
//               ))}
//               <option value="">Didn't find your tire size?</option>
//             </select>
//           </div>
//         )}
//         {step === 6 && (
//           <div>
//             <button onClick={() => setMainStep(1)}>Back</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
