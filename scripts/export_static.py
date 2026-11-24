"""Build a portable dist/ from the Flask template, including for GitHub Pages."""
import shutil
import sys
from pathlib import Path
from flask import render_template, url_for

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from app import app, load_content


def static_url_for(endpoint, **values):
    """Keep assets relative so the export works at / or /repository-name/."""
    url = url_for(endpoint, **values)
    return url.lstrip('/') if endpoint == 'static' else url


def export():
    content = load_content()
    for project in content['projects']:
        cover = ROOT / 'static' / project['cover']
        if not cover.is_file():
            raise FileNotFoundError(f'Missing project cover: {cover}')
    destination = ROOT / 'dist'
    with app.test_request_context('/'):
        html = render_template('index.html', url_for=static_url_for, **content)
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir()
    (destination / 'index.html').write_text(html, encoding='utf-8')
    (destination / '.nojekyll').touch()
    shutil.copytree(ROOT / 'static', destination / 'static')
    print('Exported the Flask page and local assets to dist/.')


if __name__ == '__main__':
    export()
