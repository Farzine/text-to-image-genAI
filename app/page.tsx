import GenerateImageView from "./views/GenerateImageView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Render the GenerateSoundView component */}
      <GenerateImageView />
    </main>
  );
}
