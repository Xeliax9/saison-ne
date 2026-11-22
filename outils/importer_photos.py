"""Importe saison-ne-photos.json (dataURL + crédits Wikimedia) dans src/photos/ et src/credits.json"""
import base64, json, pathlib, sys, html, re
root = pathlib.Path(__file__).resolve().parent.parent
d = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
out = root / 'src' / 'photos'; out.mkdir(exist_ok=True)
for k, v in d['photos'].items():
    (out / f'{k}.jpg').write_bytes(base64.b64decode(v.split(',', 1)[1]))
def clean(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()
cr = {k: {'file': v['file'].replace('File:', ''), 'url': v.get('url'), 'artist': clean(v.get('artist')), 'license': clean(v.get('license'))} for k, v in d['credits'].items()}
(root / 'src' / 'credits.json').write_text(json.dumps(cr, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(d['photos']), 'photos,', len(cr), 'crédits')
