// Represents a image model with its name and URL
export interface ImageModel {
    name: string; // The name of the image model
    url: string;  // The URL to the model for generating image
  }
  
  // An array of predefined image models
  const IMAGE_MODELS: ImageModel[] = [
    {
      name: "Black Forest Labs - FLUX.1-dev",
      url: "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    },
    {
      name: "OnomaAIResearch - Illustrious-xl-v0",
      url: "https://api-inference.huggingface.co/models/OnomaAIResearch/Illustrious-xl-early-release-v0",
    },
    {
      name: "Renderartist - simplevectorflux",
      url: "https://api-inference.huggingface.co/models/renderartist/simplevectorflux",
    },
    {
      name: "Stabilityai - Diffusion-xl-base-1.0",
      url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    },
  ];
  
  // Export the array of image models
  export default IMAGE_MODELS;
  