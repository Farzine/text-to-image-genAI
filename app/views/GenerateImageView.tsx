"use client";

import { GenerateImageForm } from "@/components/GenerateImageForm";
import Loader from "@/components/Loader";
import { useState,useEffect  } from "react";
import Image from "next/image";

/**
 * Represents the request payload for generating image using a pre-trained model.
 */
export interface CreateImageRequest {
  /**
   * The URL of the pre-trained model to be used for image generation.
   */
  modelUrl: string;

  /**
   * The input text that will be used to generate the image.
   */
  text: string;

  /**
   * The access token for the Hugging Face API.
   * This token is required to authenticate the request to the Hugging Face API.
   */
  token: string;
}

/**
 * The main view component for generating image using a pre-trained model.
 */
export default function GenerateImageView() {
  // State to manage loading status and image URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backgroundLoading, setBackgroundLoading] = useState<boolean>(true);

  /*
   * Handles the process of fetching image data using the provided request.
   * @param {CreateImageRequest} request - The request containing model URL and text.
   */
  const handleGetImage = async (request: CreateImageRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-image", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
          token: request.token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch image data");
      }

      const data = await response.blob(); 

      const imgUrl = URL.createObjectURL(data);

      setImageUrl(imgUrl);
    } catch (error: any) {
      console.error("Error fetching image:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setImageUrl(null); 
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up the object URL when the component unmounts or when a new image is generated
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#09203F] to-[#537895] flex flex-col items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
      {/* Sidebar with Title and Description */}
      <div className="md:w-1/3 relative text-white p-6 flex flex-col justify-center">
      {/* Background Image */}
      <Image 
        src="/a.gif" // Replace with your image path
        alt="Background Image"
        fill
        style={{ objectFit: 'cover' }}
        quality={75}
        className="z-0" 
        unoptimized
        onLoad={() => setBackgroundLoading(false)}
      />
      {/* Loader overlay for the background image */}
          {backgroundLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
              <Loader />
            </div>
          )}

      {/* Overlay to darken the background image if needed */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Text content */}
      <div className="relative z-20 md:mb-44">
        <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>
        <p className="text-lg">
          Transform your imagination into stunning visuals. Enter a text prompt, and let our AI model generate a unique image for you.
        </p>
      </div>
    </div>

      {/* Main Content Area */}
      <div className="md:w-2/3 p-6">
        <GenerateImageForm handleGetImage={handleGetImage} />

        {/* Display Loader, Image, or Error Message */}
        <div className="mt-6 flex justify-center items-center h-96 border border-gray-200 rounded-lg bg-gray-50">
          {isLoading ? (
            // Show loader when fetching image data
            <Loader />
          ) : errorMessage ? (
            // Display error message if any
            <div className="text-red-500 text-center">
              <p>{errorMessage}</p>
            </div>
          ) : (
            // Display the generated image when available
            <>
              {imageUrl ? (
                <img src={imageUrl} alt="Generated" className="max-w-full max-h-full object-contain" />
              ) : (
                <p className="text-gray-500">Your generated image will appear here.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
