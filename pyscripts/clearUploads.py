import os
import sys

def delete_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.startswith('.'):
                continue
            file_path = os.path.join(root, file)
            try:
                os.remove(file_path)
                print(f"Deleted: {file_path}")
            except Exception as e:
                print(f"Error deleting {file_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python delete_files.py <directory>")
        sys.exit(1)
    directory = sys.argv[1]
    delete_files(directory)
