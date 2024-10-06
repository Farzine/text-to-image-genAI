import GenerateImageView from "./views/GenerateImageView";

/**
 * The main entry point component for the application.
 * It renders the GenerateSoundView component.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Render the GenerateSoundView component */}
      <GenerateImageView />
    </main>
  );
}
