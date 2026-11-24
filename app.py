"""Flask portfolio. Content lives in content.json; no runtime scraping."""
import json
from pathlib import Path
from flask import Flask, render_template

ROOT = Path(__file__).resolve().parent
app = Flask(__name__)

def load_content():
    with (ROOT / 'content.json').open(encoding='utf-8') as source:
        return json.load(source)

@app.get('/')
def home():
    return render_template('index.html', **load_content())

if __name__ == '__main__':
    app.run()
