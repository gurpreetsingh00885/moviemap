from django.contrib import admin
from api.models import Distributor, Director, Writer, Actor, Location, Movie, ProductionCompany
# Register your models here.

admin.site.register(Distributor)
admin.site.register(Director)
admin.site.register(Writer)
admin.site.register(Actor)
admin.site.register(Location)
admin.site.register(Movie)
admin.site.register(ProductionCompany)