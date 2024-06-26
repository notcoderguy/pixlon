import sys
import json
from PIL import Image
from PIL.ExifTags import TAGS
from fractions import Fraction

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, bytes):
            # Decode bytes to string
            try:
                return obj.decode('utf-8')
            except UnicodeDecodeError:
                return obj.decode('latin1')
        elif isinstance(obj, Fraction):
            # Convert Fraction to float
            return float(obj)
        elif hasattr(obj, 'numerator') and hasattr(obj, 'denominator'):
            # Convert Rational to float
            return float(obj.numerator) / float(obj.denominator)
        return super(CustomEncoder, self).default(obj)

def get_exif_data(image_path):
    image = Image.open(image_path)

    if image.format == "JPEG":
        exif_data = image._getexif()
        if not exif_data:
            return {}
    elif image.format == "gif":
        exif_data = image.getexif();
        if not exif_data:
            return {}
        

    exif = {}
    for tag, value in exif_data.items():
        tag_name = TAGS.get(tag, tag)
        if isinstance(value, bytes):
            try:
                exif[tag_name] = value.decode('utf-8')
            except UnicodeDecodeError:
                exif[tag_name] = value.decode('latin1')
        elif isinstance(value, Fraction):
            exif[tag_name] = float(value)
        elif hasattr(value, 'numerator') and hasattr(value, 'denominator'):
            exif[tag_name] = float(value.numerator) / float(value.denominator)
        else:
            exif[tag_name] = value

    return exif

if __name__ == "__main__":
    image_path = sys.argv[1]
    metadata = get_exif_data(image_path)
    print(json.dumps(metadata, cls=CustomEncoder))

