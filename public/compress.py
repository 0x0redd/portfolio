import os
from PIL import Image
import glob

def compress_images(input_folder, output_folder=None, quality=85, max_width=1920):
    """
    Compress images in the specified folder
    
    Args:
        input_folder (str): Path to folder containing images
        output_folder (str): Path to save compressed images (if None, overwrites originals)
        quality (int): JPEG quality (1-100, higher = better quality)
        max_width (int): Maximum width for resizing (maintains aspect ratio)
    """
    
    # If no output folder specified, create a compressed subfolder
    if output_folder is None:
        output_folder = os.path.join(input_folder, "compressed")
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Get all image files
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(input_folder, ext)))
        image_files.extend(glob.glob(os.path.join(input_folder, ext.upper())))
    
    print(f"Found {len(image_files)} images to compress")
    
    total_original_size = 0
    total_compressed_size = 0
    
    for i, image_path in enumerate(image_files, 1):
        try:
            # Open image
            with Image.open(image_path) as img:
                # Convert to RGB if necessary (for JPEG)
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Calculate new dimensions
                width, height = img.size
                if width > max_width:
                    new_height = int((height * max_width) / width)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Get original file size
                original_size = os.path.getsize(image_path)
                total_original_size += original_size
                
                # Save compressed image
                filename = os.path.basename(image_path)
                output_path = os.path.join(output_folder, filename)
                
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
                
                # Get compressed file size
                compressed_size = os.path.getsize(output_path)
                total_compressed_size += compressed_size
                
                # Calculate compression ratio
                compression_ratio = (1 - compressed_size / original_size) * 100
                
                print(f"[{i}/{len(image_files)}] {filename}")
                print(f"  Original: {original_size / 1024:.1f} KB")
                print(f"  Compressed: {compressed_size / 1024:.1f} KB")
                print(f"  Saved: {compression_ratio:.1f}%")
                print()
                
        except Exception as e:
            print(f"Error processing {image_path}: {e}")
    
    # Print summary
    print("=" * 50)
    print("COMPRESSION SUMMARY")
    print("=" * 50)
    print(f"Total original size: {total_original_size / (1024*1024):.1f} MB")
    print(f"Total compressed size: {total_compressed_size / (1024*1024):.1f} MB")
    print(f"Total space saved: {(total_original_size - total_compressed_size) / (1024*1024):.1f} MB")
    print(f"Overall compression: {((total_original_size - total_compressed_size) / total_original_size) * 100:.1f}%")
    print(f"Compressed images saved to: {output_folder}")

if __name__ == "__main__":
    # Configuration
    input_folder = "."  # Current directory (world cup 2022 folder)
    quality = 85  # JPEG quality (1-100)
    max_width = 1920  # Maximum width in pixels
    
    print("Image Compression Script")
    print("=" * 30)
    print(f"Input folder: {os.path.abspath(input_folder)}")
    print(f"Quality: {quality}")
    print(f"Max width: {max_width}px")
    print()
    
    # Run compression
    compress_images(input_folder, quality=quality, max_width=max_width)
    
    input("\nPress Enter to exit...")
