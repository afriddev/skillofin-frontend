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
import { FiPlus } from "react-icons/fi";
import {  useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface ConfigureDialoginterface {
  method: "add" | "edit";
  comp: string;
  onClose: () => void;
}

function ConfigureDialog({ comp, method, onClose }: ConfigureDialoginterface) {
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
  const [skills, setSkills] = useState<string[]>([]);

  function getTitle(): string {
    switch (comp) {
      case "costPerHour":
        return `Edit Cost per hour`;

      case "title":
        return `Edit headling and summary`;

      case "skills":
        return `${method === "edit" ? "Edit" : "Add"} Skills`;

      case "languages":
        return `${method == "add" ? "Add" : "Edit"} languages `;

      default:
        return "";
    }
  }

  function onSubmit(e: any) {
    console.log(e);
  }

  return (
    <div>
      <AppDialog onClose={onClose} title={getTitle()}>
        <form onSubmit={handleSubmit(onSubmit)} className="px-4">
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
              <Button className="h-11 px-5   ">
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
                <div className=" w-[15vw] flex">
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
                    errorMessage={errors?.skills?.message}
                  />
                </div>
                {watch("skills") && (
                  <IoMdCheckmark
                    onClick={() => {
                      setSkills([...skills, watch("skills")]);
                      setValue("skills", "");
                    }}
                    className="h-10 cursor-pointer -mt-4 w-10 p-2 rounded-md bg-constructive text-background"
                  />
                )}
                {skills.length > 0 &&
                  (watch("skills") === "false" || !watch("skills")) && (
                    <FiPlus
                      onClick={() => {
                        document.getElementById("skills")?.click();
                      }}
                      className="h-10 cursor-pointer -mt-4 w-10 p-2 rounded-md bg-primary text-background"
                    />
                  )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {skills?.map((skill, index) => {
                  return (
                    <div
                      className="border  shadow-sm px-3 py-1 rounded-full flex items-center justify-center text-center"
                      key={index}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
              <Button disabled={skills?.length === 0} className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "title" && (
            <div className="flex w-[40vw]  flex-col items-center gap-4">
              <div className=" w-full flex flex-col gap-3 ">
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
              <Button className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
          {comp === "languages" && (
            <div className="flex  flex-col items-center gap-4 w-[40vw]">
              <div className=" w-full flex gap-6">
                <Input
                  placeholder="language name"
                  iconName="dlr"
                  {...register("language", {
                    required: "Please enter  language name",
                  })}
                  mandatory
                  errorMessage={errors?.language?.message}
                />
                <div className="flex flex-col gap- w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Select
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
              <Button className="h-11 px-5   ">
                <div className="flex  gap-3 items-center">
                  {" "}
                  <h4>Save</h4>
                  <IoCloudDoneOutline />
                </div>
              </Button>
            </div>
          )}
        </form>
      </AppDialog>
    </div>
  );
}

export default ConfigureDialog;
