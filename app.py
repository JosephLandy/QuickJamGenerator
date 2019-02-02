from flask import Flask, request
from flask_restful import Resource, Api
import time

app = Flask(__name__)
api = Api(app)
startTime = time.time()

tracks = [{"trackID": 0, "status": "off", "volume": 100},
          {"trackID": 1, "status": "off", "volume": 100},
          {"trackID": 2, "status": "off", "volume": 100},
          {"trackID": 3, "status": "off", "volume": 100},
          {"trackID": 4, "status": "off", "volume": 100}]


class Status(Resource):

    def get(self):
        return {"about":'Hello World'}

    def post(self):
        some_json = request.get_json()
        return {"you send": some_json}, 201

class Track(Resource):
    def get(self, trackID):
        return tracks[trackID]
    def post(self):
        trackInfo = request.get_json()
        tracks[trackInfo["trackID"]] = trackInfo
        return tracks

class Sync(Resource):
    def get(self):
        if time.time() > (startTime - 210):
            startTime = time.time()
        return startTime


api.add_resource(Status, '/status/')
api.add_resource(Track, '/track/')
api.add_resource(Sync, '/sync/')

if __name__ == '__main__':
    app.run(debug=True)

#curl -H "Content-Type: application/json" -X POST -d '{"trackID": 0, "status": "on", "volume": 100}'