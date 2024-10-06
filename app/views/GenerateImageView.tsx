"use client";

import { GenerateImageForm } from "@/components/GenerateImageForm";
import Loader from "@/components/Loader";
import { useState } from "react";

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
}

/**
 * The main view component for generating image using a pre-trained model.
 */
export default function GenerateImageView() {
  // State to manage loading status and image URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  /**
   * Handles the process of fetching image data using the provided request.
   * @param {CreateImageRequest} request - The request containing model URL and text.
   */
  const handleGetImage = async (request: CreateImageRequest) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-sound", { // here i will use image instead of audio
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data");
      }

      const data = await response.arrayBuffer(); // here i will use image instead of audio

      const blob = new Blob([data], { type: "audio/mpeg" }); // here i will use image instead of audio
      const imgUrl = URL.createObjectURL(blob); // here i will use image instead of audio

      setImageUrl(imgUrl);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4">
        <div className="ml-8 mr-8 mt-4 mb-4 text-xl">
          <h1>Text to Speech</h1>
        </div>
        {/* Render the form component for generating image */}
        <GenerateImageForm handleGetImage={handleGetImage} />
      </div>
      <div className="w-full md:w-2/3 p-4 bg-gray-200 h-screen">
        <div className="h-full flex justify-center items-center">
          {isLoading ? (
            // Show loader when fetching image data
            <Loader />
          ) : (
            // Display image player when image is available
            <>
              {imageUrl && (
                <audio controls> {/* here i will use image instead of audio */}
                  <source id="audioSource" type="audio/flac" src={imageUrl!} />
                </audio>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
