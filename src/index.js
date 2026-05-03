import WASM_MODULE from "./optimizer_bg.wasm";
import init, { process_image, add_watermark } from "./optimizer.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve Static Landing Page
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = `...`; // I should probably read from the file or use a simpler response
      // For now, let's just return a basic HTML or redirect
    }

    // Health check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "online" }), { headers: { "Content-Type": "application/json" } });
    }

    try {
      if (request.method === "POST" && url.pathname === "/optimize") {
        const formData = await request.formData();
        const imageFile = formData.get("image");
        const format = formData.get("format") || "jpg";
        const width = parseInt(formData.get("width") || "0");
        const height = parseInt(formData.get("height") || "0");
        const quality = parseInt(formData.get("quality") || "85");

        if (!imageFile) {
          return new Response("Missing image file", { status: 400 });
        }

        const imageArrayBuffer = await imageFile.arrayBuffer();
        const processedBytes = process_image(new Uint8Array(imageArrayBuffer), format, width, height, quality);

        return new Response(processedBytes, {
          headers: {
            "Content-Type": `image/${format}`,
            "X-Privacy-Status": "EXIF-Stripped"
          }
        });
      }

      if (request.method === "POST" && url.pathname === "/watermark") {
        const formData = await request.formData();
        const baseImage = formData.get("image");
        const watermarkImage = formData.get("watermark");
        const x = parseInt(formData.get("x") || "0");
        const y = parseInt(formData.get("y") || "0");

        if (!baseImage || !watermarkImage) {
          return new Response("Missing images", { status: 400 });
        }

        const baseBytes = new Uint8Array(await baseImage.arrayBuffer());
        const watermarkBytes = new Uint8Array(await watermarkImage.arrayBuffer());
        
        const processedBytes = add_watermark(baseBytes, watermarkBytes, x, y);

        return new Response(processedBytes, {
          headers: { "Content-Type": "image/jpeg" }
        });
      }

      return new Response("Not Found", { status: 404 });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
