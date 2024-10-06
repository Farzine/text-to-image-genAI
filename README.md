# Text to Image Generation Web APP

Welcome to the **Text to Image Generation Web APP** project built using Next.js! This project serves as a foundational template for showcasing image generation using pre-trained Hugging Face models.

## Project Purpose

This repogitory demonstrates the process of generating image from text using pre-trained Hugging Face models. Users are presented with various Hugging Face image models to choose from, and they can input text to generate corresponding image. The generated image can then be shown directly within the web interface.

## Overview

The main focus of this project is to illustrate how to utilize pre-trained Hugging Face models along with the Hugging Face inference API. This combination allows for the conversion of input text into synthesized image. The user interface offers a selection of image models, an input field for entering desired text, and an outputed image. It's important to note that this version of the project only covers the user interface aspect.

## Architecture
![Project Architecture](/public/image.png)

## Important Notes

Please be aware that the stability of the Hugging Face Inference API models is crucial for the proper functioning of this application. Random errors may occur intermittently due to external factors.

## How to Run the Project

### Prerequisites

- Node.js 
- npm 

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/farzine/text-to-iamge-genai.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-nextjs-project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Obtain a Hugging Face Access Token and add it to your `.env.local` file:
   ```sh
   Hugging face tokens can be created in the Hugging Face settings portal
   ```

### Launching the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your web browser and visit `http://localhost:3000` to access the application.

## Project Structure

- `components`: Contains reusable UI components used throughout the application.
- `lib`: Holds constants and utility functions.
- `pages`: Houses the primary views and API routes of the application.
- `public`: Stores static assets such as images, fonts, etc.
- `styles`: Encompasses global and component-specific styles using CSS or CSS-in-JS.
- `views`: Contains the primary application views and components.

## Usage Instructions

1. Launch the application in your web browser after starting it.
2. From the "Image Model" dropdown, select a model for generating sound.
3. Input the desired text into the "Text" input field.
4. Click the "Submit" button.
5. The resulting image will be displayed in right side of the sidebar.

## Contribution Guidelines

Contributions are enthusiastically encouraged! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes and conduct thorough testing.
4. Commit your changes and push them to your forked repository.
5. Initiate a pull request to the main repository.

## License Information

This project is licensed under the [MIT License](LICENSE).