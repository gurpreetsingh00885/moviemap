from django.db import models

MAX_TEXT_LENGTH = 10000

# Base class for various human entities
class Person(models.Model):
	name = models.CharField(max_length=MAX_TEXT_LENGTH)

	def __str__(self):
		return self.name

class Director(Person):
	pass

class Writer(Person):
	pass

class Actor(Person):
	pass

# Base class for various commercial entities
class Company(models.Model):
	name = models.CharField(max_length=MAX_TEXT_LENGTH)

	def __str__(self):
		return self.name

class Distributor(Company):
	pass

class ProductionCompany(Company):
	pass

class Location(models.Model):
	address = models.CharField(max_length=MAX_TEXT_LENGTH)

	def __str__(self):
		return self.address

class Movie(models.Model):
	title = models.CharField(max_length=MAX_TEXT_LENGTH)
	release_year = models.IntegerField()
	locations = models.ManyToManyField(Location)
	distributor = models.ForeignKey(Distributor, on_delete=models.CASCADE)
	production_company = models.ForeignKey(ProductionCompany, on_delete=models.CASCADE)
	director = models.ForeignKey(Director, on_delete=models.CASCADE)
	writers = models.ForeignKey(Writer, on_delete=models.CASCADE)

	def __str__(self):
		return self.title
