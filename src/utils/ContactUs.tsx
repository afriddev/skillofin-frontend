/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactUsAPI } from "@/api/emailApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendEmail } from "@/hooks/emailHooks";
import { useForm } from "react-hook-form";

function ContactUs() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isPending, sendEmail } = useSendEmail();

  async function onSubmit(e: any) {
    sendEmail(
      {
        body: `New message recived from  ${e.fullNameFotter} with email - ${e.emailIdFotter} and phone - ${e.phoneFotter} `,
        subject: "New Message from SkilloFin chat",
        title: "New Message from SkilloFin",
        toEmail: "afridayan01@gmail.com",
      },
      {
        onSuccess(data) {
          if (data === "SUCCESS") {
            reset();
          }
        },
      }
    );
    await contactUsAPI({
      emailId: e.emailIdFotter,
      fullName: e.fullNameFotter,
      phone: e.phoneFotter,
    });
  }

  return (
    <div className="bg-background mt-[10vh] w-full ">
      <div className="flex flex-col items-center mt-[10vh]">
        <h6 className="text-4xl font-bold font-serif"> CONTACT US</h6>
        <div className="h-1 w-[20vw] lg:w-[6vw] bg-primary mt-[2vh]"></div>
      </div>
      <div className="items-center flex w-full justify-center mt-[10vh]">
        <div className="flex flex-col lg:flex-row justify-between w-[70vw] items-center">
          <div className="flex flex-col gap-4">
            <h5 className="font-mono text-4xl font-bold ">
              Get in Touch with SkilloFin 👋
            </h5>
            <p className="text-lg lg:max-w-[30vw]">
              Feel free to connect with us for any of your needs regarding our
              services. Our support team is ready to solve any of your issues.
              Just push a text to us and we will get back to you immediately.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100vw] lg:w-[40vw] max-w-sm flex flex-col gap-3 p-8"
          >
            <Input
              mandatory
              className="h-14"
              iconName="firstName"
              placeholder="Full Name"
              {...register("fullNameFotter", {
                minLength: 3,
                required: "Please enter your full name",
              })}
              errorMessage={errors?.fullNameFotter?.message}
            />
            <Input
              mandatory
              className="h-14"
              placeholder="Phone"
              iconName="phoneNumber"
              {...register("phoneFotter", {
                pattern: /^\+?[1-9]\d{6,14}$/,

                required: "Please enter your phone number",
              })}
              errorMessage={errors?.phoneFotter?.message}
            />
            <Input
              mandatory
              className="h-14"
              placeholder="Email Address"
              iconName="emailId"
              {...register("emailIdFotter", {
                pattern: /^\S+@\S+\.\S+$/,

                required: "Please enter your email",
              })}
              errorMessage={errors?.emailIdFotter?.message}
            />

            <Button type="submit" className="py-6" isPending={isPending}>
              Contact Us
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
