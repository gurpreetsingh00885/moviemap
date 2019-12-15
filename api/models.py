from django.db import models

MAX_TEXT_LENGTH = 10000

# Base class for various human entities
class Person(models.Model):
	name = models.CharField(max_length=MAX_TEXT_LENGTH, null=True, blank=True)

	def __str__(self):
		return self.name or ''

class Director(Person):
	pass

class Writer(Person):
	pass

class Actor(Person):
	pass

# Base class for various commercial entities
class Company(models.Model):
	name = models.CharField(max_length=MAX_TEXT_LENGTH, null=True, blank=True)

	def __str__(self):
		return self.name or ''

class Distributor(Company):
	pass

class ProductionCompany(Company):
	pass

class Location(models.Model):
	address = models.CharField(max_length=MAX_TEXT_LENGTH, null=True, blank=True)

	def __str__(self):
		return self.address or ''

class Movie(models.Model):
	title = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True, null=True)
	release_year = models.IntegerField(blank=True, null=True)
	locations = models.ManyToManyField(Location)
	distributor = models.ForeignKey(Distributor, on_delete=models.CASCADE, null=True, blank=True)
	production_company = models.ForeignKey(ProductionCompany, on_delete=models.CASCADE, null=True, blank=True)
	director = models.ForeignKey(Director, on_delete=models.CASCADE, null=True, blank=True)
	writer = models.ForeignKey(Writer, on_delete=models.CASCADE, null=True, blank=True)
	actors = models.ManyToManyField(Actor)

	def __str__(self):
		return self.title or ''
