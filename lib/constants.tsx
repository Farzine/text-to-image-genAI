// Represents a image model with its name and URL
export interface ImageModel {
    name: string; // The name of the image model
    url: string;  // The URL to the model for generating image
  }
  
  // An array of predefined image models
  const IMAGE_MODELS: ImageModel[] = [
    {
      name: "Facebook - Fastspeech2",
      url: "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
    },
    {
      name: "ESPNET - Ljspeech",
      url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
    },
    {
      name: "Speechbrain - Ljspeech",
      url: "https://api-inference.huggingface.co/models/speechbrain/tts-tacotron2-ljspeech",
    },
    {
      name: "Voicemod - Fastspeech2",
      url: "https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
    },
  ];
  
  // Export the array of image models
  export default IMAGE_MODELS;
  