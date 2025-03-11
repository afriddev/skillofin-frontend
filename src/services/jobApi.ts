/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function postJobAPI(data: any) {
  const response = await fetch(BASE_URL + "/postjob", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function getJobsAPI() {
  const response = await fetch(BASE_URL + "/jobs");
  const serverData = await response.json();
  return serverData;
}

export async function submitBidAPI(data: any) {
  const response = await fetch(BASE_URL + "/bid", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function deletePostedAPI(data: any) {
  const response = await fetch(BASE_URL + "/delete", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function approveBidAPI(data: {
  id: string;
  freelancerEmailId: string;
}) {
  const response = await fetch(BASE_URL + "/approvebid", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function createPaymentAPI(data: { amount: string }) {
  const response = await fetch(BASE_URL + "/createpayment", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function verifyPaymentAPI(data: any) {
  const response = await fetch(BASE_URL + "/verifypayment", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
