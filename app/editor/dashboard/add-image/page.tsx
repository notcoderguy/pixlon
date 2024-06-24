"use client";

import React, { useState } from "react";
import axios from "axios";

const page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async ()=>{
        setIsLoading(true);
        try {
            const response = await axios.post("/api/save-metadata");
            if(response.status === 200){
                alert("Successfully saved metadata");
            }
        } catch (error) {
            alert("Falied to save metadata");
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <div className="h-full flex justify-center items-center">
        <input className="border border-black" type="text"/>
      <button className="bg-indigo-500 px-5 py-3 rounded-sm text-lg text-white hover:rounded-xl transition-all" onClick={handleOnClick}disabled={isLoading}>Save Image Data</button>
    </div>
  );
};

export default page;
