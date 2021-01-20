from tools import compileTemplate
from pathlib import Path

students = \
'''\
thomas-bouillet
celine-hurka
jan-sindler
huw-williams
jamie-chang
nina-botthof
ruggero-magri
olga-umpeleva
jovana-jocic
renan-rosatti
elena-peralta
arnaud-chemin\
'''

for student in students.splitlines():
    compileTemplate(student)
