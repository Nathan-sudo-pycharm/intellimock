"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Info, TriangleAlert, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false); // Initially, webcam is disabled

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  /**
   * Used to get Interview details by MockId / Interview Id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10  flex justify-center flex-col items-center ">
      <h2 className="font-bold text-[#FFA500] text-3xl">Let's get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col my-5 p-5">
          <div className="flex flex-col  p-5 border border-gray-300 rounded-xl gap-1 ">
            <h2 className="text-lg text-[#FFFFFF]">
              <strong>Job Role/Position: </strong>
              {interviewData ? interviewData.jobPosition : "Loading"}
            </h2>
            <h2 className="text-lg text-[#FFFFFF]">
              <strong>Job Description / TechStack: </strong>
              {interviewData ? interviewData.jobDesc : "Loading"}
            </h2>
            <h2 className="text-lg text-[#FFFFFF]">
              <strong>Years of Experience: </strong>
              {interviewData ? interviewData.jobExp : "Loading"}
            </h2>
          </div>
          <div className=" text-balance pt-5">
            <div className="flex items-center border border-yellow-400 bg-yellow-100 p-2 rounded text-balance">
              <Info className="text-yellow-700 mr-2" />
              <strong className="mr-2 ">Information:</strong>
              <span>
                Activate webcam and microphone for AI-generated mock interview.
              </span>
            </div>
            <br></br>
            <div className="flex items-center bg-red-200 border border-red-400  p-2 rounded">
              <TriangleAlert className="text-red-700 mr-2" />
              <strong className="mr-2 ">Note:</strong>
              <span>We do not store or record your webcam videos.</span>
            </div>
          </div>
        </div>
        <div className="mt-4  ">
          {webCamEnabled ? (
            <Webcam
              style={{ height: 300, width: 300 }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 border bg-gray-100 rounded-xl  " />
              <div className="flex justify-center items-center ">
                <Button
                  onClick={() => setWebCamEnabled(true)}
                  className="bg-gray-100 rounded-xl text-black hover:bg-white hover:shadow-gray-100 text-base"
                >
                  Enable Web Cam and Microphone
                </Button>
              </div>
            </>
          )}
          <div className="flex justify-end items-end">
            <Link
              href={"/dashboard/interview/" + params.interviewId + "/start"}
            >
              <Button className="bg-black rounded-xl border border-white text-white text-base">
                Start the Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
