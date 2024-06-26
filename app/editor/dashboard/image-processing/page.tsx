"use client";

import React, { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useSession } from "next-auth/react";

type UploadStatus = "success" | "failure";
type OptimizeStatus = "success" | "failure";
type ClearDbStatus = "success" | "failure";
type clearUploadsStatus = "success" | "failure";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/"
})

const page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [uploadMessage, setUploadMessage] = useState("");
    const [optimizeMessage, setOptimizeMessage] = useState("");
    const [clearDbMessage, setClearDbMessage] = useState("");
    const [clearUploadsMessage, setClearUploadsMessage] = useState("")


    const [uploadStatus, setUploadStatus] = useState<UploadStatus | undefined>(undefined);
    const [optimizeStatus, setOptimizeStatus] = useState<OptimizeStatus | undefined>(undefined);
    const [clearDbStatus, setClearDbStatus] = useState<ClearDbStatus | undefined>(undefined);
    const [clearUploadsStatus, setClearUploadsStatus] = useState<clearUploadsStatus | undefined>(undefined)

    const handleOnClick = async (action : "upload" | "optimize" | "clearDb" | "clearDir")=>{
        setIsLoading(true);

        let endpoint = "";
        let successMessage = "";
        let failureMessage = "";

        if(action === "upload"){
          endpoint = "save-metadata"
          successMessage = "Successfully saved metadata";
          failureMessage = "Falied to save metadata";
        }
        else if(action === "optimize"){
          endpoint = "optimise-images";
          successMessage = "Successfully optimised images";
          failureMessage = "Failed to optimise images";
        }
        else if(action === "clearDb"){
          endpoint = "clear-db";
          successMessage = "Successfully cleared DB";
          failureMessage = "Failed to clear DB";
        }
        else if(action === "clearDir"){
          endpoint = "clear-uploads";
          successMessage = "Successfully cleared uploads";
          failureMessage = "Failed to clear uploads";
        }

        try {
          let response;

          if(action === "clearDb"){
            response = await axiosInstance.delete(endpoint);
          }else{
            response = await axiosInstance.post(endpoint);
          }


            if (response.status === 200) {
              if (action === "upload") {
                setUploadMessage(successMessage);
                setUploadStatus("success");
              } else if (action === "optimize") {
                setOptimizeMessage(successMessage);
                setOptimizeStatus("success");
              } else if (action === "clearDb") {
                setClearDbMessage(successMessage);
                setClearDbStatus("success");
              }
              else if(action === "clearDir"){
                setClearUploadsMessage(successMessage);
                setClearUploadsStatus("success");
              }
            }
        } catch (error) {
          if (action === "upload") {
            setUploadMessage(failureMessage);
            setUploadStatus("failure");
          } else if (action === "optimize") {
            setOptimizeMessage(failureMessage);
            setOptimizeStatus("failure");
          } else if (action === "clearDb") {
            setClearDbMessage(failureMessage);
            setClearDbStatus("failure");
          } else if (action === "clearDir"){
            setClearUploadsMessage(failureMessage);
            setClearUploadsStatus("failure");
          }
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <div className="flex flex-wrap gap-10 justify-center pt-36">

      <div className="w-full min-h-[200px] flex-grow max-w-[500px] flex flex-col justify-between items-center p-5 text-center rounded-xl border border-gray-900 bg-gray-200">
        <h1 className="text-indigo-600 text-2xl font-bold">Save Images data to database</h1>
        <div>
          <h2 className={clsx('py-2', uploadStatus === "success"? "text-green-600":"text-red-600")}>{uploadMessage}</h2>
          <button className="bg-indigo-500 px-5 py-3 rounded-sm text-lg text-white hover:rounded-xl transition-all" onClick={()=>{
            handleOnClick("upload");
          }}disabled={isLoading}>Save Image Data</button>
        </div>
      </div>

      <div className="w-full min-h-[200px] flex-grow max-w-[500px] flex flex-col justify-between items-center p-5 text-center rounded-xl border border-gray-900 bg-gray-200">
        <h1 className="text-indigo-600 text-2xl font-bold">Optimize all images present in uploads</h1>
        <div>
          <h2 className={clsx('py-2', optimizeStatus === "success"? "text-green-600":"text-red-600")}>{optimizeMessage}</h2>
          <button className="bg-indigo-500 px-5 py-3 rounded-sm text-lg text-white hover:rounded-xl transition-all" onClick={()=>{
            handleOnClick("optimize");
          }}disabled={isLoading}>Optimize Images</button>
        </div>
      </div>

      <div className="w-full min-h-[200px] flex-grow max-w-[500px] flex flex-col justify-between items-center p-5 text-center rounded-xl border border-gray-900 bg-gray-200">
        <h1 className="text-indigo-600 text-2xl font-bold">Clear all image data from db</h1>
        <div>
          <h2 className={clsx('py-2', clearDbStatus === "success"? "text-green-600":"text-red-600")}>{clearDbMessage}</h2>
          <button className="bg-indigo-500 px-5 py-3 rounded-sm text-lg text-white hover:rounded-xl transition-all" onClick={()=>{
            handleOnClick("clearDb");
          }}disabled={isLoading}>Clear DB</button>
        </div>
      </div>

      <div className="w-full min-h-[200px] flex-grow max-w-[500px] flex flex-col justify-between items-center p-5 text-center rounded-xl border border-gray-900 bg-gray-200">
        <h1 className="text-indigo-600 text-2xl font-bold">Clear all images from uploads</h1>
        <div>
          <h2 className={clsx('py-2', clearUploadsStatus === "success"? "text-green-600":"text-red-600")}>{clearUploadsMessage}</h2>
          <button className="bg-indigo-500 px-5 py-3 rounded-sm text-lg text-white hover:rounded-xl transition-all" onClick={()=>{
            handleOnClick("clearDir");
          }}disabled={isLoading}>Clear Images</button>
        </div>
      </div>
      
    </div>
  );
};

export default page;
