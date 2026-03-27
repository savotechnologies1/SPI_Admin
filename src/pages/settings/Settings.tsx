import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { deleteProfile, getProfile, updateProfile } from "./https/profileApi";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

const IMAGE_URL = import.meta.env.VITE_SERVER_URL;

interface SelectOption {
  label: string;
  value: string;
}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: SelectOption | null;
  state: SelectOption | null;
  city: SelectOption | null;
  zipCode: string;
  about: string;
  profileImg: string;
}

const Settings = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<File | string | null>(null);
  const [isFile, setIsFile] = useState<boolean>(false);

  const {
    reset,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      country: null,
      city: null,
      state: null,
      zipCode: "",
      about: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsFile(true);
      setProfileImg(file); // Yahan File store hoga
      setPhoto(URL.createObjectURL(file));
    }
  };

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const countryOptions: SelectOption[] = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const stateOptions: SelectOption[] = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    : [];

  const cityOptions: SelectOption[] =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
          (ci) => ({
            value: ci.name,
            label: ci.name,
          }),
        )
      : [];
  const onSubmit = async (data: FormValues) => {
    try {
      await updateProfile(
        {
          ...data,
          country: data.country?.label || "",
          state: data.state?.label || "",
          city: data.city?.label || "",
        },
        profileImg as any,
        isFile,
      );
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getProfile();
        const data = res.data;

        if (data?.profileImg) {
          const imageUrl = `${IMAGE_URL}/uploads/profileImg/${data.profileImg}`;
          setPhoto(imageUrl);
          setProfileImg(data.profileImg);
        }

        const countries = Country.getAllCountries();
        const foundCountry = countries.find((c) => c.name === data.country);
        const countryOption = foundCountry
          ? { label: foundCountry.name, value: foundCountry.isoCode }
          : null;

        let stateOption: SelectOption | null = null;
        let cityOption: SelectOption | null = null;

        if (countryOption) {
          const states = State.getStatesOfCountry(countryOption.value);
          const foundState = states.find((s) => s.name === data.state);
          stateOption = foundState
            ? { label: foundState.name, value: foundState.isoCode }
            : null;

          if (stateOption) {
            const cities = City.getCitiesOfState(
              countryOption.value,
              stateOption.value,
            );
            const foundCity = cities.find((ci) => ci.name === data.city);
            cityOption = foundCity
              ? { label: foundCity.name, value: foundCity.name }
              : null;
          }
        }

        reset({
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          zipCode: data.zipCode || "",
          about: data.about || "",
          country: countryOption,
          state: stateOption,
          city: cityOption,
        });
      } catch (error) {
        console.error("Fetch profile error", error);
      }
    };

    fetchUserData();
  }, [reset]);

  const deletProfileApi = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteProfile();
        setPhoto(null);
        setProfileImg(null);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-2">Account</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <p className="text-[14px] text-black">
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <FaCircle className="text-[6px] text-gray-500" />
            <span className="text-[14px] hover:cursor-pointer">Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex flex-col items-center mt-12">
              <div className="w-32 h-32 rounded-full shadow-xl relative group overflow-hidden bg-gray-100">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs p-2 text-center">
                    Update Photo
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={handlePhotoChange}
                />
              </div>

              <p className="text-sm mt-4 text-gray-600">
                Allowed: .jpeg, .jpg, .png
              </p>
              <p className="text-sm">Max size 3.1 MB</p>

              <button
                className="bg-[#FF563014] text-[#B71D18] px-4 py-2 mt-4 rounded-md font-semibold hover:bg-red-100"
                onClick={deletProfileApi}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-[#637381]">
                  About
                </label>
                <textarea
                  {...register("about")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Country
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryOptions}
                      placeholder="Select country..."
                      className="mt-1"
                    />
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={stateOptions}
                      isDisabled={!selectedCountry}
                      placeholder="Select state..."
                      className="mt-1"
                    />
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  City
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cityOptions}
                      isDisabled={!selectedState}
                      placeholder="Select city..."
                      className="mt-1"
                    />
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Zip/Code
                </label>
                <input
                  type="text"
                  {...register("zipCode")}
                  className="w-full border px-4 py-2 rounded-md mt-1"
                />
              </div>

              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2 rounded-md font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
