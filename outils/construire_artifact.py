"""Assemble le site en UNE seule page (dist/index.html) pour l'aperçu Claude (artifact).
Pas nécessaire pour GitHub Pages, qui utilise directement index.html.
Usage : python3 outils/construire_artifact.py"""
import pathlib, re, shutil
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="css/style.css">',
                    '<style>\n' + (root / 'css/style.css').read_text(encoding='utf-8') + '\n</style>')
html = re.sub(r'<script src="([^"]+)"></script>',
              lambda m: '<script>\n' + (root / m.group(1)).read_text(encoding='utf-8') + '\n</script>', html)
dist = root / 'dist'; dist.mkdir(exist_ok=True)
(dist / 'index.html').write_text(html, encoding='utf-8')
if (dist / 'photos').exists(): shutil.rmtree(dist / 'photos')
shutil.copytree(root / 'photos', dist / 'photos')
print('dist/index.html', round(len(html.encode()) / 1024), 'Kio')
