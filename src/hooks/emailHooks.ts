import { sendEmailAPI } from "@/services/emailApi";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

export function useSendEmail() {
  const { toast } = useToast();

  const {
    data,
    isPending,
    mutate: sendEmail,
  } = useMutation({
    mutationFn: (values: {
      toEmail: string;
      body: string;
      title: string;
      subject: string;
      fromEmail:string
      passkey:string
    }) => {
      return sendEmailAPI(values);
    },
    onSuccess(data) {
      if (data === "SUCCESS") {
        toast({
          duration: 2000,
          variant: "constructive",
          title: "Contacted successfully",
          description:
            "We will get back to you soon as possible,Thaks for contacting us",
        });
      } else {
        toast({
          duration: 2000,
          variant: "destructive",
          title: "Please try again",
          description: "Something Went Wrong,Please try again after sometime",
        });
      }
    },
    onError() {
      toast({
        duration: 2000,
        variant: "destructive",
        title: "Please try again",
        description: "Something Went Wrong,Please try again after sometime",
      });
    },
  });

  return { sendEmail, isPending, data };
}
