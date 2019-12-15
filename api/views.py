from api.models import Movie
from api.serializers import MovieSerializer
from rest_framework import generics

class SearchView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get_queryset(self):
        return Movie.objects.filter(title__icontains=self.kwargs['query'])

search = SearchView.as_view()

class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

movie_detail = MovieDetailView.as_view()