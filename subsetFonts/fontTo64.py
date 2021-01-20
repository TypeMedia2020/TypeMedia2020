import struct
from pathlib import Path
import base64

base = Path(__file__).parent

for font in (base/'assets'/'fonts'/'woff').glob("*.subset.*"):
    print(font)
    with open(font, 'rb') as inputFile:
        data = base64.b64encode(inputFile.read())
        print(data)
    xxx