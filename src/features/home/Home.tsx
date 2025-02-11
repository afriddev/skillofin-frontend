/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HomeNavBar from "@/utils/HomeNavBar";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";

function Home() {
  const { formState, handleSubmit, register } = useForm();
  const { errors } = formState;

  function handleContactUs(e: any) {
    console.log(e);
  }

  return (
    <div className="w-full h-full flex flex-col relative bg-primary/5 text-foreground overflow-x-hidden">
      <div className="relative w-full h-[100vh]">
        <img
          alt="banner-image"
          src="home-banner.jpg"
          className="object-cover w-full h-[110vh] lg:h-[100vh]"
        />
        <div className="absolute inset-0 bg-black opacity-80 w-full h-[110vh] lg:h-[100vh]"></div>
      </div>

      <div className="z-[400] absolute inset-0 items-center w-full flex flex-col ">
        <HomeNavBar />

        <div className="text-background flex flex-col w-full px-4 lg:flex-row justify-between lg:w-[90vw] pt-[10vw]   ">
          <div className="flex flex-col gap-10">
            <div className="mt-8">
              <h1 className="font-bold text-[50px] lg:text-[70px] font-serif">
                SkilloFin
              </h1>

              <div className="h-2 mt-[2vw] bg-primary w-[15vw]"></div>
            </div>
            <div>
              <p className="text-4xl lg:pt-5">
                Projects - Hiring - Funds - Networking
              </p>
            </div>
            <Button className="w-fit py-6 px-10 text-lg">Read More</Button>
          </div>

          <div className="flex flex-col bg-background rounded-lg pt-10 lg:pt-0">
            <form
              className="w-[20vw] max-w-sm flex flex-col gap-3 p-8"
              onSubmit={handleSubmit(handleContactUs)}
            >
              <Input
                iconName="firstName"
                placeholder="Full Name"
                {...register("fullName", {
                  required: "Please enter your full name",
                })}
                errorMessage={errors?.fullName?.message}
              />
              <Input
                placeholder="Phone"
                iconName="phoneNumber"
                {...register("phone", {
                  required: "Please enter your phone number",
                })}
                errorMessage={errors?.phone?.message}
              />
              <Input
                placeholder="Email Address"
                iconName="emailId"
                {...register("emailId", {
                  required: "Please enter your email",
                })}
                errorMessage={errors?.emailId?.message}
              />
              <div className="flex flex-col gap-1 h-24">
                <Textarea
                  placeholder="Message"
                  {...register("message", {
                    required: "Please enter your message",
                  })}
                />
                <div className="text-destructive pl-2 text-[12px]">
                  {errors?.message?.message as any}
                </div>
              </div>
              <Button>Contact Us</Button>
            </form>
          </div>
        </div>

        <div className="w-[80vw] flex flexrow h-[70vw] mt-[27vh]  ">
          <div className=" flex h-[70vh] gap-6  ">
            <img
              src="about-us.webp"
              alt="about us"
              className="w-[20vw] h-full object-cover"
            />
            <div className="h-full bg-background w-[60vw] flex flex-col items-center justify-center p-10 gap-10">
              <div className="flex flex-col items-center  gap-4 ">
                <h3 className="text-4xl font-bold font-serif">
                  About SkilloFin
                </h3>
                <div className="h-1 bg-primary w-[10vw]"></div>
              </div>
              <p className="text-xl px-20 text-center ">
                SkilloFin is dedicated to facilitating meaningful professional
                realtionshis. Our platform connects individuals with projects to
                earn, industry leaders to get hired,offering opportunities for
                career growth,funding and collaborating to grow more{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[6vh]">
          <div className="mt-[10vh] flex flex-col items-center">
            <h2 className="font-bold font-serif text-[40px]">
              FOR WHOM, WHY AND HOW ?
            </h2>
            <div className="h-1 w-[6vw] bg-primary mt-[4vh]"></div>
          </div>

          <div className="flex flex-row gap-10 mt-[10vh]">
            <div className=" bg-rounded-lg w-[25vw] flex flex-col">
              <img
                src="man-with-work.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[20vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">
                  Jobs / Work / Projects{" "}
                </h6>
                <p>
                  Network for jobs, bid on projects, contracts and get paid
                  safely, securely with guarantee from verified companies. It
                  will create better atmosphere to get hired easily in your
                  favorite companies. No more resumes.
                </p>
              </div>
            </div>

            <div className=" bg-rounded-lg w-[25vw] flex flex-col">
              <img
                src="women-with-phone.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[20vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">
                  Hiring (Freelancer or Full time)
                </h6>
                <p>
                  Small businesses or MNC recruiters can hire with confidence
                  with verified profiles having prof of work and result driven
                  candidates. No more guesswork.
                </p>
              </div>
            </div>
            <div className="gap- bg-rounded-lg w-[25vw] flex flex-col">
              <img
                src="man-with-fund.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[20vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">Funding Made Easy</h6>
                <p>
                  For individuals and companies: Funding options come to your
                  inbox as you display proof of revenue generation with your
                  hand work. Banks, lenders, investors will get proof of revenue
                  which will helps in smooth application procesing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10vh] relative">
          <div>
            <img
              className="w-[100vw] h-[100vh] object-cover"
              src="money-growth.jpg"
              alt="money growth"
            />
          </div>
          <div className="absolute inset-16 bg-background h-fit w-[30vw] p-9 flex flex-col gap-6">
            <div className="flex flex-col  gap-6">
              <h4 className="font-bold text-4xl ">
                Get funds easily to grow more !
              </h4>
              <div className="bg-primary h-1 w-[8vw]"></div>
            </div>
            <p className="text-lg">
              For workers and for companies : Showcase your traction in real,
              get funds to grow more !
            </p>
          </div>
        </div>

        <div className="mt-[5vh]">
          <div className=" mt-[5vh] flex flex-col ">
            <div className="flex flex-col items-center ">
              <h6 className="text-4xl font-bold font-serif"> TESTIMONIALS</h6>
              <div className="h-1 w-[6vw] bg-primary mt-[2vh]"></div>
            </div>

            <div className="flex flex-col mt-[10vh] items-center">
              <div className="items-center flex flex-col">
                <img
                  src="testimonials1.jpg"
                  alt="testimonials1"
                  className="w-[20vw] h-[20vw] rounded-full object-cover"
                />
                <div className="-mt-5 w-10 h-10 bg-primary rotate- flex items-center justify-center rounded-full text-3xl text-background">
                  <p className="-mt-6">,,</p>
                </div>
              </div>
              <div className="text-xl mt-10 max-w-[50vw] text-center font-semibold">
                Thanks to SkiLLoFin, I have expand my professional Network and
                and has my first job based on proof of work hiring as a AI
                Marketer.
              </div>
              <div className="flex gap-2 mt-5">
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
              </div>
              <h3 className="mt-[3vh] text-xl font-bold">JANE SMITH</h3>
              <h3 className=" font-thin">Freelancer</h3>
            </div>
          </div>
        </div>

        <div className="bg-background mt-[10vh]">
          <div className="flex flex-col items-center mt-[10vh]">
            <h6 className="text-4xl font-bold font-serif"> CONTACT US</h6>
            <div className="h-1 w-[6vw] bg-primary mt-[2vh]"></div>
          </div>
          <div>
            <form
              className="w-[100vw]  gap-3 p-8 flex flex-col items-center"
              onSubmit={handleSubmit(handleContactUs)}
            >
              <div className=" flex w-[100vw] justify-center items-center">
                <div>
                  <Input
                    className="w-[25vw] "
                    iconName="firstName"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Please enter your full name",
                    })}
                    errorMessage={errors?.fullName?.message}
                  />
                </div>
                <div>
                  <Input
                    className="w-[25vw] "
                    placeholder="Phone"
                    iconName="phoneNumber"
                    {...register("phone", {
                      required: "Please enter your phone number",
                    })}
                    errorMessage={errors?.phone?.message}
                  />
                </div>
                <div>
                  <Input
                    className="w-[25vw] "
                    placeholder="Email Address"
                    iconName="emailId"
                    {...register("emailId", {
                      required: "Please enter your email",
                    })}
                    errorMessage={errors?.emailId?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 h-24">
                <Textarea
                  className="w-[50vw]"
                  placeholder="Message"
                  {...register("message", {
                    required: "Please enter your message",
                  })}
                />
                <div className="text-destructive pl-2 text-[12px]">
                  {errors?.message?.message as any}
                </div>
              </div>
              <Button className="py-6 px-10 text-lg">Contact Us</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
