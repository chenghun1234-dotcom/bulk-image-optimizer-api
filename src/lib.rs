use wasm_bindgen::prelude::*;
use image::ImageOutputFormat;
use std::io::Cursor;

#[wasm_bindgen]
pub fn process_image(
    image_data: &[u8],
    format_str: &str,
    width: u32,
    height: u32,
    quality: u8,
) -> Result<Vec<u8>, JsValue> {
    // Load image
    let img = image::load_from_memory(image_data)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    // Resize if width/height are provided (0 means original)
    let processed_img = if width > 0 && height > 0 {
        img.resize_exact(width, height, image::imageops::FilterType::Lanczos3)
    } else if width > 0 {
        img.resize(width, u32::MAX, image::imageops::FilterType::Lanczos3)
    } else if height > 0 {
        img.resize(u32::MAX, height, image::imageops::FilterType::Lanczos3)
    } else {
        img
    };

    // Strip EXIF / Re-encode
    let mut result = Cursor::new(Vec::new());
    let output_format = match format_str.to_lowercase().as_str() {
        "png" => ImageOutputFormat::Png,
        "webp" => ImageOutputFormat::WebP,
        _ => ImageOutputFormat::Jpeg(quality),
    };

    processed_img.write_to(&mut result, output_format)
        .map_err(|e| JsValue::from_str(&format!("Failed to encode image: {}", e)))?;

    Ok(result.into_inner())
}

#[wasm_bindgen]
pub fn add_watermark(
    base_image: &[u8],
    watermark_image: &[u8],
    x: u32,
    y: u32,
) -> Result<Vec<u8>, JsValue> {
    let mut img = image::load_from_memory(base_image)
        .map_err(|e| JsValue::from_str(&format!("Failed to load base image: {}", e)))?;
    let watermark = image::load_from_memory(watermark_image)
        .map_err(|e| JsValue::from_str(&format!("Failed to load watermark image: {}", e)))?;

    image::imageops::overlay(&mut img, &watermark, x as i64, y as i64);

    let mut result = Cursor::new(Vec::new());
    img.write_to(&mut result, ImageOutputFormat::Jpeg(90))
        .map_err(|e| JsValue::from_str(&format!("Failed to encode watermarked image: {}", e)))?;

    Ok(result.into_inner())
}
