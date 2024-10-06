export async function POST(request: Request) {
  try {
    const { modelUrl, input, token } = await request.json();

    // Validate the request body
    if (!modelUrl) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing 'modelUrl' field in the request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!input) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing 'input' field in the request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing Hugging Face token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Make request to the Hugging Face API
    const hfResponse = await fetch(modelUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: input }),
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error(`Hugging Face API Error: ${hfResponse.status} ${hfResponse.statusText} - ${errorText}`);
      return new Response(
        JSON.stringify({ success: false, message: "Hugging Face API Request Failed", details: errorText }),
        {
          status: hfResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const imageBlob = await hfResponse.blob();
    const contentType = hfResponse.headers.get("Content-Type") || "image/jpeg";

    return new Response(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("Error in /api/generate-image:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
