"""Importe saison-ne-photos.json (photos + crédits Wikimedia récupérés par Claude)
dans photos/<id>.jpg et donnees/photos.js.
Usage : python3 outils/importer_photos.py chemin/vers/saison-ne-photos.json"""
import base64, json, pathlib, sys, html, re
root = pathlib.Path(__file__).resolve().parent.parent
d = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
for k, v in d['photos'].items():
    (root / 'photos' / f'{k}.jpg').write_bytes(base64.b64decode(v.split(',', 1)[1]))
def clean(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()
lignes = []
for k in sorted(d['photos']):
    c = d['credits'].get(k, {})
    lignes.append(f"  {json.dumps(k)}: {{ auteur: {json.dumps(clean(c.get('artist')) or 'Wikimedia Commons', ensure_ascii=False)}, "
                  f"licence: {json.dumps(clean(c.get('license')) or 'licence libre', ensure_ascii=False)}, url: {json.dumps(c.get('url'))} }},")
p = root / 'donnees' / 'photos.js'
t = p.read_text(encoding='utf-8')
t = re.sub(r'const CREDITS = \{.*?\n\};', 'const CREDITS = {\n' + '\n'.join(lignes) + '\n};', t, flags=re.S)
p.write_text(t, encoding='utf-8')
print(len(lignes), 'photos importées')
