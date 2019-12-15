import os
import json
from api.models import Director, Distributor, Location, Movie, Actor, Writer

def load_data():
	"""
	Helper to load data into database from the given dataset
	"""
	file_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/data.json'
	data = open(file_path).read()
	jsonData = json.loads(data)
	for row in jsonData['data']:
		title				= row[8]
		release_year        = row[9]
		location            = row[10]
		production_company  = row[12]
		distributor         = row[13]
		writer              = row[14]
		actor1              = row[15]
		actor2              = row[16]
		actor3              = row[17]
