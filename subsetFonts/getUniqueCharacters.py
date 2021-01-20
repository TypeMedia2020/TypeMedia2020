# from pathlib import Path
# from bs4 import BeautifulSoup


# base = Path(__file__).parent.parent

# content = ''

# for index in base.glob('./*-*/index.html'):
#     with open(index, 'r') as inputFile:
        
#         soup = BeautifulSoup(inputFile.read(), 'html.parser')
#         content += soup.text

# unique = ''
# for char in content:
#     if char in unique:
#         continue
#     unique += char

# unicodes = []

# for char in unique:
#     unicodes.append(f"U+{ord(char):04X}")

# with open(base/'subsetFonts'/'subset.txt', 'w+') as outputFile:
#     outputFile.write(', '.join(unicodes))



