import WASM_MODULE from "./optimizer_bg.wasm";
import init, { process_image, add_watermark } from "./optimizer_wasm.js";

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulk Image Privacy Optimizer | Zero-Cost Wasm API</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-glow"></div>
    
    <nav>
        <div class="logo">Privacy<span>Scrub</span></div>
        <div class="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#pricing">Pricing</a>
            <a href="https://rapidapi.com" class="btn-primary">Get API Key</a>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="badge">Wasm Powered &bull; Edge Native</div>
            <h1>The Ultimate <span class="gradient-text">Bulk Image</span> Optimizer for Wanghong</h1>
            <p class="subtitle">No Servers. No Logs. No Leaks. Process 1,000+ images in seconds with zero privacy risk and industry-lowest costs.</p>
            
            <div class="hero-actions">
                <button class="btn-large">Try Demo</button>
                <button class="btn-secondary">View Documentation</button>
            </div>
        </section>

        <section id="features" class="grid-features">
            <div class="card">
                <div class="icon">🔒</div>
                <h3>Privacy Absolute</h3>
                <p>Strip all EXIF metadata including GPS coordinates and device fingerprints instantly.</p>
            </div>
            <div class="card">
                <div class="icon">⚡</div>
                <h3>Edge-Side Speed</h3>
                <p>Powered by WebAssembly for near-native performance at the edge or in the browser.</p>
            </div>
            <div class="card">
                <div class="icon">💰</div>
                <h3>Cost Leadership</h3>
                <p>Zero infrastructure overhead means we pass the savings to you. Unlimited plans available.</p>
            </div>
        </section>

        <section id="security" class="security-diagram">
            <h2>Why We Are Different</h2>
            <div class="diagram-container">
                <div class="node">
                    <h4>Traditional API</h4>
                    <p>Image Upload -> Server Storage -> Processing -> Response</p>
                    <span class="warning">⚠️ Risk: Data Leaks</span>
                </div>
                <div class="connector">vs</div>
                <div class="node active">
                    <h4>PrivacyScrub Wasm</h4>
                    <p>Image -> Wasm (Edge/Browser) -> Instant Result</p>
                    <span class="success">✅ Zero Storage. Zero Logs.</span>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <h2>Disruptive Pricing</h2>
            <div class="pricing-card">
                <h3>Wanghong Pro</h3>
                <div class="price">$1.99<span>/day</span></div>
                <ul>
                    <li>Unlimited Image Processing</li>
                    <li>Full EXIF Stripping</li>
                    <li>Batch Watermarking</li>
                    <li>Priority Edge Nodes</li>
                </ul>
                <button class="btn-primary">Subscribe via RapidAPI</button>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 PrivacyScrub. Targeted Solutions for the Modern Wanghong Market.</p>
    </footer>

    <script>
        document.querySelector('.btn-large').addEventListener('click', async () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('image', file);
                formData.append('format', 'webp');
                formData.append('quality', '80');

                const btn = document.querySelector('.btn-large');
                const originalText = btn.innerText;
                btn.innerText = 'Processing...';

                try {
                    const resp = await fetch('/optimize', {
                        method: 'POST',
                        body: formData
                    });

                    if (resp.ok) {
                        const blob = await resp.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'optimized_' + file.name.split('.')[0] + '.webp';
                        a.click();
                        alert('Success! EXIF stripped and image optimized. Check your downloads.');
                    } else {
                        alert('Error: ' + await resp.text());
                    }
                } catch (err) {
                    alert('Error: ' + err.message);
                } finally {
                    btn.innerText = originalText;
                }
            };
            input.click();
        });

        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = '/openapi.json';
        });
    </script>
</body>
</html>`;
const CSS_CONTENT = `:root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --bg: #0f172a;
    --card-bg: rgba(30, 41, 59, 0.7);
    --text: #f8fafc;
    --text-dim: #94a3b8;
    --glass: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

.background-glow {
    position: fixed;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    z-index: -1;
    filter: blur(80px);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 10%;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -1px;
}

.logo span {
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-links a {
    text-decoration: none;
    color: var(--text-dim);
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--text);
}

.btn-primary {
    background: var(--primary);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, background 0.3s;
}

.btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
}

main {
    padding: 4rem 10%;
}

.hero {
    text-align: center;
    max-width: 900px;
    margin: 0 auto 8rem auto;
}

.badge {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 0.5rem 1rem;
    border-radius: 100px;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

h1 {
    font-size: 4.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -2px;
}

.gradient-text {
    background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    font-size: 1.25rem;
    color: var(--text-dim);
    margin-bottom: 3rem;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn-large {
    background: white;
    color: var(--bg);
    padding: 1rem 2rem;
    border-radius: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-secondary {
    background: var(--glass);
    color: white;
    border: 1px solid var(--glass-border);
    padding: 1rem 2rem;
    border-radius: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.grid-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 8rem;
}

.card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    padding: 2.5rem;
    border-radius: 24px;
    transition: transform 0.3s;
    backdrop-filter: blur(10px);
}

.card:hover {
    transform: translateY(-10px);
}

.card .icon {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

.card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.card p {
    color: var(--text-dim);
}

.security-diagram {
    text-align: center;
    margin-bottom: 8rem;
}

.diagram-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
    flex-wrap: wrap;
}

.node {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 2rem;
    border-radius: 20px;
    max-width: 300px;
}

.node.active {
    border-color: var(--primary);
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.2);
}

.warning { color: #f87171; font-weight: 600; margin-top: 1rem; display: block; }
.success { color: #4ade80; font-weight: 600; margin-top: 1rem; display: block; }

.pricing {
    text-align: center;
}

.pricing-card {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(192, 132, 248, 0.1) 100%);
    border: 1px solid var(--primary);
    padding: 4rem;
    border-radius: 32px;
    max-width: 500px;
    margin: 3rem auto;
    backdrop-filter: blur(20px);
}

.price {
    font-size: 4rem;
    font-weight: 800;
    margin: 1.5rem 0;
}

.price span {
    font-size: 1.5rem;
    color: var(--text-dim);
}

.pricing-card ul {
    list-style: none;
    margin-bottom: 3rem;
    text-align: left;
}

.pricing-card li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.pricing-card li::before {
    content: '✓';
    color: var(--primary);
    font-weight: bold;
}

footer {
    padding: 4rem;
    text-align: center;
    color: var(--text-dim);
    border-top: 1px solid var(--glass-border);
`;

const OPENAPI_CONTENT = `{
  "openapi": "3.0.0",
  "info": {
    "title": "Ultra-Fast Bulk Image Optimizer (Wasm Powered)",
    "version": "1.0.0",
    "description": "Zero-Cost, Zero-Privacy-Risk image processing for high-volume content creators (Wanghong). Strip EXIF, resize, and watermark thousands of images in seconds."
  },
  "servers": [
    {
      "url": "https://bulkimageoptimizerapi.chenghun1234.workers.dev"
    }
  ],
  "paths": {
    "/optimize": {
      "post": {
        "summary": "Strip EXIF and Optimize Image",
        "description": "Removes all metadata (GPS, Device Info) and optimizes the image for web performance.",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "image": { "type": "string", "format": "binary" },
                  "format": { "type": "string", "enum": ["jpg", "png", "webp"], "default": "jpg" },
                  "width": { "type": "integer" },
                  "height": { "type": "integer" },
                  "quality": { "type": "integer", "default": 85 }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Processed image" }
        }
      }
    },
    "/watermark": {
      "post": {
        "summary": "Bulk Batch Watermarking",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "image": { "type": "string", "format": "binary" },
                  "watermark": { "type": "string", "format": "binary" },
                  "x": { "type": "integer", "default": 0 },
                  "y": { "type": "integer", "default": 0 }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Watermarked image" } }
      }
    }
  }
}`;

let wasmInitialized = false;

async function ensureWasmInit() {
    if (!wasmInitialized) {
        await init(WASM_MODULE);
        wasmInitialized = true;
    }
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Serve Static Files
        if (url.pathname === "/" || url.pathname === "/index.html") {
            return new Response(HTML_CONTENT, {
                headers: { "Content-Type": "text/html; charset=utf-8" }
            });
        }

        if (url.pathname === "/style.css") {
            return new Response(CSS_CONTENT, {
                headers: { "Content-Type": "text/css" }
            });
        }

        if (url.pathname === "/openapi.json") {
            return new Response(OPENAPI_CONTENT, {
                headers: { "Content-Type": "application/json" }
            });
        }

        // Health Check
        if (url.pathname === "/health") {
            return new Response(JSON.stringify({ status: "online", engine: "Wasm" }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        // API Endpoints
        try {
            await ensureWasmInit();

            if (request.method === "POST" && url.pathname === "/optimize") {
                const formData = await request.formData();
                const imageFile = formData.get("image");
                const format = formData.get("format") || "jpg";
                const width = parseInt(formData.get("width") || "0");
                const height = parseInt(formData.get("height") || "0");
                const quality = parseInt(formData.get("quality") || "85");

                if (!imageFile) return new Response("Missing image", { status: 400 });

                const buffer = await imageFile.arrayBuffer();
                const processed = process_image(new Uint8Array(buffer), format, width, height, quality);

                return new Response(processed, {
                    headers: { 
                        "Content-Type": `image/${format === 'jpg' ? 'jpeg' : format}`,
                        "X-Privacy-Optimizer": "Wasm-Powered"
                    }
                });
            }

            if (request.method === "POST" && url.pathname === "/watermark") {
                const formData = await request.formData();
                const imageFile = formData.get("image");
                const watermarkFile = formData.get("watermark");
                const x = parseInt(formData.get("x") || "10");
                const y = parseInt(formData.get("y") || "10");

                if (!imageFile || !watermarkFile) return new Response("Missing images", { status: 400 });

                const imageBuf = new Uint8Array(await imageFile.arrayBuffer());
                const watermarkBuf = new Uint8Array(await watermarkFile.arrayBuffer());
                
                const processed = add_watermark(imageBuf, watermarkBuf, x, y);

                return new Response(processed, {
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
