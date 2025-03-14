/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppDialog from "@/utiles/AppDilaog";
import { IoCloudDoneOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaAsterisk } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useUpdateProfile } from "@/hooks/userHooks";
import { X } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AccountElement from "./AccoutnElements";
import { useAppContext } from "@/utiles/AppContext";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

interface ConfigureDialoginterface {
  method: "add" | "edit";
  comp: string;
  onClose: () => void;
  userData: any;
  userRole: string;
  index?: number;
}

function ConfigureDialog({
  userData,
  comp,
  method,
  onClose,
  userRole,
  index,
}: ConfigureDialoginterface) {
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setValue,
    watch,
    setError,
  } = useForm();
  const { errors } = formState;
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const { isPending, updateProfile } = useUpdateProfile();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (userData) {
      setValue(
        "headline",
        userRole === "CLIENT"
          ? userData?.userAccountData?.companyName
          : userData?.userAccountData?.title
      );
      setValue("summary", userData?.userAccountData?.description);
      setValue("costPerHour", userData?.userAccountData?.hourlyRate ?? 0);
      setValue("firstName", userData?.userData?.firstName);
      setValue("lastName", userData?.userData?.lastName);
      setSkills(userData?.userAccountData?.skills);
      if (comp === "bank") {
        setValue(
          "accountType",
          userData?.userData?.bankAccountDetails?.accountType
        );

        setValue(
          "accountHolderName",
          userData?.userData?.bankAccountDetails?.accountHolderName
        );
        setValue(
          "bankAccountType",
          userData?.userData?.bankAccountDetails?.bankAccountType
        );
        setValue(
          "routingNumber",
          userData?.userData?.bankAccountDetails?.routingNumber
        );
        setValue(
          "accountNumber",
          userData?.userData?.bankAccountDetails?.accountNumber
        );

        setValue(
          "accountHolderName",
          userData?.userData?.bankAccountDetails?.accountHolderName
        );
        setValue("ifscCode", userData?.userData?.bankAccountDetails?.ifscCode);
        setValue(
          "cardHolderName",
          userData?.userData?.bankAccountDetails?.cardHolderName
        );

        setValue(
          "cardNumber",
          userData?.userData?.bankAccountDetails?.cardNumber
        );

        setValue(
          "expirationDate",
          userData?.userData?.bankAccountDetails?.cardExpiry
        );

        setValue("cvc", userData?.userData?.bankAccountDetails?.cvc);
      }

      if (index !== undefined) {
        if (comp === "project") {
          setValue("title", userData?.userAccountData?.projects[index]?.title);
          setValue("_id", userData?.userAccountData?.projects[index]?._id);
          setValue(
            "description",
            userData?.userAccountData?.projects[index]?.description
          );
        } else if (comp === "employment") {
          setValue(
            "name",
            userData?.userAccountData?.employmentHistory[index]?.companyName
          );

          setValue(
            "fromDate",
            userData?.userAccountData?.employmentHistory[index]?.startDate
          );
          setValue(
            "toDate",
            userData?.userAccountData?.employmentHistory[index]?.endDate
          );
          setValue(
            "_id",
            userData?.userAccountData?.employmentHistory[index]?._id
          );
          setValue(
            "description",
            userData?.userAccountData?.employmentHistory[index]?.description
          );
        } else if (comp === "education") {
          setValue(
            "name",
            userData?.userAccountData?.educationHistory[index]?.name
          );

          setValue(
            "fromDate",
            userData?.userAccountData?.educationHistory[index]?.startDate
          );
          setValue(
            "toDate",
            userData?.userAccountData?.educationHistory[index]?.endDate
          );
          setValue(
            "_id",
            userData?.userAccountData?.educationHistory[index]?._id
          );
          setValue(
            "description",
            userData?.userAccountData?.educationHistory[index]?.description
          );
        } else if (comp === "languages") {
          setValue("_id", userData?.userAccountData?.languages[index]?._id);

          setValue(
            "language",
            userData?.userAccountData?.languages[index]?.name
          );
          setValue(
            "level",
            userData?.userAccountData?.languages[index]?.level?.toLowerCase()
          );
        }
      }
    }
  }, [userData, index]);

  function getTitle(): string {
    switch (comp) {
      case "costPerHour":
        return `Edit Cost per hour`;

      case "title":
        return `Edit headling and summary details`;

      case "skills":
        return `${method === "edit" ? "Edit" : "Add"} Skills`;

      case "project":
        return `${method === "edit" ? "Edit" : "Add"} Project details`;

      case "employment":
        return `${method === "edit" ? "Edit" : "Add"} Employment details`;

      case "education":
        return `${method === "edit" ? "Edit" : "Add"} Education details`;

      case "languages":
        return `${method == "add" ? "Add" : "Edit"} languages `;

      case "bank":
        return `Add bank details`;

      case "name":
        return `Edit full name`;

      default:
        return "";
    }
  }

  async function onSubmit(e: any) {
    updateProfile(
      {
        method: comp,
        edit: index !== undefined ? true : false,
        data:
          comp === "skills"
            ? {
                skills: skills,
              }
            : e,
      },
      {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            dispatch({
              type: "setUserData",
              payload: data?.data,
            });
            onClose();
          }
        },
      }
    );
  }

  return (
    <div>
      <AppDialog onClose={onClose} title={getTitle()}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 w-[80vw] lg:w-full"
        >
          {comp === "costPerHour" && (
            <div className="flex  flex-col items-center gap-4">
              <div className=" w-full flex">
                <Input
                  type="number"
                  placeholder="Cost per hour"
                  iconName="dlr"
                  {...register("costPerHour", {
                    required: "Please enter Cost per hour",
                  })}
                  mandatory
                  errorMessage={errors?.costPerHour?.message}
                />
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "name" && (
            <div className="flex  flex-col items-center gap-4">
              <div className=" w-full flex flex-col">
                <Input
                  placeholder="First name"
                  iconName="firstName"
                  {...register("firstName", {
                    required: "Please enter First name",
                  })}
                  mandatory
                  errorMessage={errors?.firstName?.message}
                />

                <Input
                  placeholder="Last name"
                  iconName="lastName"
                  {...register("lastName", {
                    required: false,
                  })}
                  errorMessage={errors?.lastName?.message}
                />
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}

          {comp === "project" && (
            <div className="flex  flex-col items-center gap-4">
              <div className=" w-full flex">
                <Input
                  placeholder="Title"
                  iconName="project"
                  {...register("title", {
                    required: "Please enter Title",
                  })}
                  mandatory
                  errorMessage={errors?.title?.message}
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <Textarea
                    className="h-[20vh]"
                    placeholder="Description"
                    {...register("description", {
                      required: "Please enter Description",
                    })}
                  />
                  <div className="h-2 w-2">
                    <FaAsterisk className="text-destructive h-2 w-2" />
                  </div>
                </div>
                <div className="h-4 text-destructive ml-2 text-[12px]">
                  {errors?.description?.message as string}
                </div>
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}

          {comp === "employment" && (
            <div className="flex  flex-col items-center gap-4">
              <div className=" w-full flex">
                <Input
                  placeholder="Company name"
                  iconName="company"
                  {...register("name", {
                    required: "Please enter Company name",
                  })}
                  mandatory
                  errorMessage={errors?.name?.message}
                />
              </div>

              <div className=" w-full flex gap-4">
                <Input
                  placeholder="From date"
                  iconName="date"
                  {...register("fromDate", {
                    required: "Please enter From date",
                  })}
                  mandatory
                  errorMessage={errors?.fromDate?.message}
                />

                <Input
                  placeholder="To date"
                  iconName="date"
                  {...register("toDate", {
                    required: "Please enter To date",
                  })}
                  mandatory
                  errorMessage={errors?.toDate?.message}
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <Textarea
                    className="h-[20vh]"
                    placeholder="Description"
                    {...register("description", {
                      required: "Please enter Description",
                    })}
                  />
                  <div className="h-2 w-2">
                    <FaAsterisk className="text-destructive h-2 w-2" />
                  </div>
                </div>
                <div className="h-4 text-destructive ml-2 text-[12px]">
                  {errors?.description?.message as string}
                </div>
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}

          {comp === "education" && (
            <div className="flex  flex-col items-center gap-4">
              <div className=" w-full flex">
                <Input
                  placeholder="University name"
                  iconName="education"
                  {...register("name", {
                    required: "Please enter University name",
                  })}
                  mandatory
                  errorMessage={errors?.name?.message}
                />
              </div>

              <div className=" w-full flex gap-4">
                <Input
                  placeholder="From date"
                  iconName="date"
                  {...register("fromDate", {
                    required: "Please enter From date",
                  })}
                  mandatory
                  errorMessage={errors?.fromDate?.message}
                />

                <Input
                  placeholder="To date"
                  iconName="date"
                  {...register("toDate", {
                    required: "Please enter To date",
                  })}
                  mandatory
                  errorMessage={errors?.toDate?.message}
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <Textarea
                    className="h-[20vh]"
                    placeholder="Description"
                    {...register("description", {
                      required: "Please enter Description",
                    })}
                  />
                  <div className="h-2 w-2">
                    <FaAsterisk className="text-destructive h-2 w-2" />
                  </div>
                </div>
                <div className="h-4 text-destructive ml-2 text-[12px]">
                  {errors?.description?.message as string}
                </div>
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}

          {comp === "skills" && (
            <div className="flex  flex-col items-center gap-4">
              <div className="flex gap-10 items-center">
                <div className=" lg:w-[15vw] flex">
                  <Input
                    value={watch("skills") ?? ""}
                    id="skills"
                    placeholder="SKill"
                    iconName="skill"
                    {...register("skills", {
                      required: "Please enter skill",
                      onChange(event) {
                        if (!event?.target?.value && skills?.length === 0) {
                          setError("skills", {
                            type: "manual",
                            message: "Please enter skill",
                          });
                        } else {
                          clearErrors("skills");
                        }
                      },
                    })}
                    mandatory
                    errorMessage={
                      skills?.length > 0 ? "" : errors?.skills?.message
                    }
                  />
                </div>
                {watch("skills") && (
                  <IoMdCheckmark
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          name: watch("skills"),
                        },
                      ]);
                      setValue("skills", "");
                    }}
                    className="h-10 cursor-pointer -mt-4 w-10 p-2 rounded-md bg-constructive text-background"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {skills?.map(
                  (
                    skill: {
                      name: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div
                        className="border  shadow-sm px-3 py-1 rounded-full flex items-center text-center  text-wrap break-words justify-between"
                        key={index}
                      >
                        <div className=""> {skill.name}</div>
                        <div className="w-4 h-4">
                          <X
                            className="w-4 h-4 ml-1 cursor-pointer lg:hover:scale-105"
                            onClick={() => {
                              setSkills(
                                skills?.filter((_, idx) => idx !== index)
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <Button
                isPending={isPending}
                disabled={skills?.length === 0 || isPending}
                className="h-11 px-5"
                onClick={() => {
                  if (skills?.length > 0) {
                    clearErrors("skills");
                    if (watch("skills")?.length > 0)
                      setSkills([
                        ...skills,
                        {
                          name: watch("skills"),
                        },
                      ]);
                    if (watch("skills").length === 0) {
                      onSubmit(undefined);
                    }
                  }
                }}
              >
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "title" && (
            <div className=" w-[80vw] flex lg:w-[40vw]  flex-col items-center gap-4">
              <div className=" w-full  flex flex-col gap-3 ">
                <Input
                  className="h-14"
                  placeholder="Headline"
                  iconName="text"
                  {...register("headline", {
                    required: "Please enter Headline",
                  })}
                  mandatory
                  errorMessage={errors?.headline?.message}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Textarea
                      className="h-[20vh]"
                      placeholder="Summary"
                      {...register("summary", {
                        required: "Please enter summary",
                      })}
                    />
                    <div className="h-2 w-2">
                      <FaAsterisk className="text-destructive h-2 w-2" />
                    </div>
                  </div>
                  <div className="h-4 text-destructive ml-2 text-[12px]">
                    {errors?.summary?.message as string}
                  </div>
                </div>
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "languages" && (
            <div className="flex  flex-col items-center gap-4 lg:w-[40vw]">
              <div className=" w-full flex flex-col lg:flex-row  gap-6">
                <Input
                  placeholder="language name"
                  iconName="language"
                  {...register("language", {
                    required: "Please enter  language name",
                  })}
                  mandatory
                  errorMessage={errors?.language?.message}
                />
                <div className="flex flex-col gap- w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Select
                      value={watch("level") ?? ""}
                      onValueChange={(value) => {
                        clearErrors("level");
                        setValue("level", value);
                      }}
                      {...register("level", {
                        required: "Please select proficiency level",
                      })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="intermediate">
                            intermediate
                          </SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="h-2 w-2">
                      <FaAsterisk className="text-destructive h-2 w-2" />
                    </div>
                  </div>
                  <div className="h-4 text-destructive ml-2 text-[12px]">
                    {errors?.level?.message as string}
                  </div>
                </div>
              </div>
              <Button isPending={isPending} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "bank" && (
            <div className="flex flex-col items-center gap-4 lg:w-[30vw]">
              <div className="w-full flex flex-col">
                <Elements stripe={stripePromise}>
                  <AccountElement />
                </Elements>
              </div>
              {comp !== "bank" && (
                <Button isPending={isPending} className="h-11 px-5">
                  <div className="flex gap-3 items-center">
                    <h4>Save</h4>
                    <IoCloudDoneOutline />
                  </div>
                </Button>
              )}
            </div>
          )}
        </form>
      </AppDialog>
    </div>
  );
}

export default ConfigureDialog;
