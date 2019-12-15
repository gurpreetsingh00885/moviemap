from api.models import Director, Distributor, Location, Movie, Actor, Writer, ProductionCompany
from rest_framework import serializers

class DistributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class ActorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Actor
		fields = '__all__'

class WriterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Writer
		fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Location
		fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    director = DirectorSerializer()
    actors = ActorSerializer(many=True)
    writer = WriterSerializer()
    distributor = DistributorSerializer()
    locations = LocationSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'