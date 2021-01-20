from PIL import Image
from pathlib import Path
import shutil

base = Path(__file__).parent

for thumbnailRes in base.glob("*/thumbnails*"):
    if thumbnailRes.name == 'thumbnails':
        continue
    shutil.rmtree(thumbnailRes)



for path in base.glob("*/thumbnails/*.png"):
    im = Image.open(path)
    im.thumbnail((500, 500))
    (path.parent.parent/'thumbnails500').mkdir(exist_ok=True)
    im.save(path.parent.parent/'thumbnails500'/path.name)


