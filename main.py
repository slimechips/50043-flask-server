import json
from flask import Flask, url_for, request, Response

app = Flask(__name__)

@app.route('/api/main', methods=['GET'])
def api_main():
    return Response(json.dumps({'status': 'OK'}), status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True)