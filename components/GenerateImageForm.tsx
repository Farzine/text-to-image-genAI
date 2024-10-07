"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import IMAGE_MODELS, { ImageModel } from "@/lib/constants";
import { CreateImageRequest } from "@/app/views/GenerateImageView";

// Define the validation schema for the form fields
const FormSchema = z.object({
  imageModel: z.string({
    required_error: "Please select a Hugging Face image model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Define the props interface for the GenerateImageForm component
interface GenerateImageFormProps {
  handleGetImage: (data: CreateImageRequest) => void;
}

// Main component function
export function GenerateImageForm({ handleGetImage: handleGetImage }: GenerateImageFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);
    
    // Prepare the image request object
    const imageRequest: CreateImageRequest = {
      modelUrl: data.imageModel,
      text: data.text,

    };
    
    // Call the provided handler function with the image request
    handleGetImage(imageRequest);
    
    setFormSubmitting(false);
  }

  return (
    <div className="ml-8 mr-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the image model */}
          <FormField
            control={form.control}
            name="imageModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an image model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IMAGE_MODELS.map((model: ImageModel, index: number) => (
                      <SelectItem key={`${model.name}-${index}`} value={model.url}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This model will generate your image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter your text here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>The text used to convert to image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type="submit" disabled={formSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
