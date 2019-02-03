from flask import Flask, request
from flask_restful import Resource, Api
import time

app = Flask(__name__)
api = Api(app)
global startTime
startTime = time.time()

tracks = [{"trackID": 0, "status": "off", "volume": 100},
          {"trackID": 1, "status": "off", "volume": 100},
          {"trackID": 2, "status": "off", "volume": 100},
          {"trackID": 3, "status": "off", "volume": 100},
          {"trackID": 4, "status": "off", "volume": 100}]


class Status(Resource):

    def get(self):
        return {"about":'Hello World'}          #Testing if server is up

    def post(self):
        some_json = request.get_json()          #Testing JSON request functionality
        return {"you send": some_json}, 201

class Track(Resource):
    def get(self, trackID):
        return tracks[trackID]                  #Returns track data for selected track
    def post(self):
        trackInfo = request.get_json()
        tracks[trackInfo["trackID"]] = trackInfo    #Changes track info to whatever is posted
        return tracks

class Sync(Resource):
    def get(self):
        global startTime
        if time.time() > startTime - 210:
            playTime = startTime % 210          #Keeps track of local time for a 3.5 minute track, to keep all clients synced
            startTime = time.time()
        return int(playTime)

api.add_resource(Status, '/status/')
api.add_resource(Track, '/track/')
api.add_resource(Sync, '/sync/')

if __name__ == '__main__':
    app.run(debug=True)

#Curl format for request resting:
# curl -H "Content-Type: application/json" -X POST -d "{\"trackID\": 0, \"status\": \"on\", \"volume\": 100}" localhost:5000/sync/