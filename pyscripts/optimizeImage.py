import os
import sys
from PIL import Image
import piexif
import subprocess

def get_optimized_dir(directory):
    # Get the parent directory of the given directory
    parent_dir = os.path.dirname(directory)
    # Define the path for the optimized directory
    optimized_dir = os.path.join(parent_dir, 'optimized')
    # Create the optimized directory if it doesn't exist
    if not os.path.exists(optimized_dir):
        os.makedirs(optimized_dir)
    return optimized_dir

def extract_exif(file_path):
    # Extracts the EXIF data from the image
    exif_data = piexif.load(file_path)
    # Extract only the Image Description and User Comment
    custom_exif = {
        "0th": {
            piexif.ImageIFD.ImageDescription: exif_data["0th"].get(piexif.ImageIFD.ImageDescription, b'')
        },
        "Exif": {
            piexif.ExifIFD.UserComment: exif_data["Exif"].get(piexif.ExifIFD.UserComment, b'')
        },
        "GPS": {},
        "Interop": {},
        "1st": {},
        "thumbnail": None
    }
    return custom_exif

def inject_exif(file_path, exif_data):
    # Converts exif_data to bytes and injects it back into the image
    exif_bytes = piexif.dump(exif_data)
    piexif.insert(exif_bytes, file_path)

def optimize_jpeg(file_path, optimized_dir):
    optimized_path = os.path.join(optimized_dir, os.path.basename(file_path))
    try:
        # Extract Image Description and User Comment EXIF data
        exif_data = extract_exif(file_path)

        # Optimize using jpegoptim
        result = subprocess.run(
            ['jpegoptim', '--max=70', '--dest=' + optimized_dir, file_path],
            check=True, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"Error optimizing JPEG with jpegoptim: {file_path}")
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")
            return

        if "skipped" in result.stdout:
            print(f"Skipped JPEG: {file_path}")
        else:
            print(f"Optimized JPEG with jpegoptim: {optimized_path}")

        # Further optimize using jpegtran
        result = subprocess.run(
            ['jpegtran', '-optimize', '-copy', 'none', '-outfile', optimized_path, optimized_path],
            check=True, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"Error optimizing JPEG with jpegtran: {file_path}")
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")
            return

        print(f"Optimized JPEG with jpegtran: {optimized_path}")

        # Inject Image Description and User Comment EXIF data back into the optimized image
        inject_exif(optimized_path, exif_data)

    except subprocess.CalledProcessError as e:
        print(f"Error optimizing JPEG: {file_path}, {e}")

def optimize_png(file_path, optimized_dir):
    optimized_path = os.path.join(optimized_dir, os.path.basename(file_path))
    try:
        result = subprocess.run(
            ['optipng', '-o5', '-out', optimized_path, file_path],
            check=True, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"Error optimizing PNG: {file_path}")
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")
            return

        if "skipped" in result.stdout:
            print(f"Skipped PNG: {file_path}")
        else:
            print(f"Optimized PNG: {optimized_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error optimizing PNG: {file_path}, {e}")

def optimize_gif(file_path, optimized_dir):
    optimized_path = os.path.join(optimized_dir, os.path.basename(file_path))
    try:
        # Use gifsicle for better GIF optimization
        result = subprocess.run(
            ['gifsicle', '--batch', '--optimize=3', '--output', optimized_path, file_path],
            check=True, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"Error optimizing GIF: {file_path}")
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")
            return

        print(f"Optimized GIF with gifsicle: {optimized_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error optimizing GIF: {file_path}, {e}")

def process_images(directory):
    optimized_dir = get_optimized_dir(directory)
    for root, _, files in os.walk(directory):
        for file in files:
            if file.startswith('.'):
                continue
            file_path = os.path.join(root, file)
            ext = file.lower().split('.')[-1]
            if ext in ['jpg', 'jpeg']:
                optimize_jpeg(file_path, optimized_dir)
            elif ext == 'png':
                optimize_png(file_path, optimized_dir)
            elif ext == 'gif':
                optimize_gif(file_path, optimized_dir)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python optimize_images.py <directory>")
        sys.exit(1)
    directory = sys.argv[1]
    process_images(directory)
