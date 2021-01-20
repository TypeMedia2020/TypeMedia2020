import markdown
import re
import json

from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from collections import namedtuple
from PIL import Image
from typing import Union, List

from bs4 import BeautifulSoup



base = Path(__file__).parent

def menuActive(content: str, student):
    """
    filter for jinja2 template, sets active user in the content menu
    """
    menu = content.splitlines()
    for i, line in enumerate(menu):
        if not len(line):
            continue
        if student in line:
            menu[i] = line.replace('<div>', '<div class="current">')
    return '\n'.join(menu)


env = Environment(loader=FileSystemLoader(str(base/"templates")))
env.trim_blocks = True
env.lstrip_blocks = True
env.filters["menuActive"] = menuActive


img = namedtuple("str", "type path alt className")
txt = namedtuple("str", "type content")


class Img:
    def __init__(self, path: Path, student: str):
        self.fullPath = str(path)
        self.path = path.relative_to(base/student)

    @property
    def type(self):
        return "img"

    @property
    def url(self):
        return str(self.path)

    @property
    def alt(self):
        return self.path.stem.replace("_", " ")

    @property
    def className(self):
        if self.path.suffix == '.svg':
            return ""
        else:
            im = Image.open(self.fullPath)
            if im.width > im.height:
                return ""
            return "half"


def getMD(student: str):
    """
    markdown for the process
    """
    path = base/student/"process"/"process.md"
    if not path.exists():
        return getImages(student, folder="process")
    with open(path, 'r', encoding="utf-8") as inputFile:
        html = markdown.markdown(inputFile.read())
        pattern = r'src="(.*)"'
        matches = list(re.finditer(pattern, html))
        for match in matches[::-1]:
            left, right = match.span(1)
            newUrl = f"/{(path.parent/match.group(1)).relative_to(base)}"
            html = html[:left] + newUrl + html[right:]
    return html

def getImages(student: str, folder: str="specimen"):
    """
    images for specimen by default, can be used for something else
    """
    folder = base / student / folder
    if not folder.exists():
        return None
    folderContent = list(filter(lambda x:False if x.stem.startswith('.') else True, folder.iterdir()))
    folderSorted = sorted(folderContent, key=lambda x: int(re.search(r'\d+', x.stem).group()))
    container = []
    for entry in folderSorted:
        container.append(Img(entry, student))
    return container

def getBio(student: str):
    """
    gets bio.json that is in bio folder, important to load name etc
    """
    path = base/ student / "bio" / "bio.json"    
    with open(str(path), encoding="utf-8") as inputFile:
        data = json.load(inputFile)
    headers = path.parent.glob("header*")
    for header in headers:
        data[header.stem] = header.name
    return data


def getBioText(student, about):
    """
    gets markdown that is in bio folder, either aboutProject.md or aboutStudent.md
    """
    path = base/student/"bio"/(about+".md")
    if not path.exists():
        return
    with open(path, encoding="utf-8") as inputFile:
        return markdown.markdown(inputFile.read())

def getHeader(student):
    """
    A simple hack that copy pastes header content from index
    """
    with open(base/'index.html', encoding="utf-8") as inputFile:
        index = inputFile.read()
    pattern = r"</?header>"
    match = list(re.finditer(pattern, index))
    left = match[0].span()[1]
    right = match[1].span()[0]
    newIndex = index.replace('href="index.html"', f'href="../"')
    return newIndex[left:right]


def prettify(htmlString: str):
    return BeautifulSoup(htmlString, 'html.parser').prettify()

def compileTemplate(student: str):
    """
    context contains all variables that can be used in the jinja2 template
    """
    context = dict(
        header=getHeader(student),
        student=student,
        bio=getBio(student),
        aboutStudent=getBioText(student, "aboutStudent"),
        aboutProject=getBioText(student, "aboutProject"),
        specimen=getImages(student),
        process=getMD(student)
        )
    template = env.get_template("detail.html")
    parsedTemplate = template.render(context)
    with open(base / f"{student}" / "index.html", "w+") as outputFile:
        outputFile.write(prettify(parsedTemplate))
