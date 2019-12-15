import os
import json
from django.db import transaction
from api.models import Director, Distributor, Location, Movie, Actor, Writer, ProductionCompany

def empty_database():
	Director.objects.all().delete()
	Distributor.objects.all().delete()
	Location.objects.all().delete()
	Movie.objects.all().delete()
	Actor.objects.all().delete()
	Writer.objects.all().delete()
	ProductionCompany.objects.all().delete()

@transaction.atomic
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
		director            = row[14]
		writer              = row[15]
		actor1              = row[16]
		actor2              = row[17]
		actor3              = row[18]

		locationObj, _temp = Location.objects.get_or_create(address=location)
		productionCompanyObj, _temp = ProductionCompany.objects.get_or_create(name=production_company)
		distributorObj, _temp = Distributor.objects.get_or_create(name=distributor)
		directorObj, _temp = Director.objects.get_or_create(name=director)
		writerObj, _temp = Writer.objects.get_or_create(name=writer)
		actor1Obj, _temp = Actor.objects.get_or_create(name=actor1)
		actor2Obj, _temp = Actor.objects.get_or_create(name=actor2)
		actor3Obj, _temp = Actor.objects.get_or_create(name=actor3)

		movieObj, _temp = Movie.objects.get_or_create(title=title, release_year=release_year, writer=writerObj)

		movieObj.locations.add(locationObj)
		movieObj.actors.add(actor1Obj)
		movieObj.actors.add(actor2Obj)
		movieObj.actors.add(actor3Obj)
		movieObj.director = directorObj
		movieObj.distributor=distributorObj
		movieObj.production_company = productionCompanyObj
		movieObj.save()
