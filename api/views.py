from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from api.helpers import preprocess, process
from api.models import *
from django.db import transaction

@api_view(['POST'])
def search(request):
	if (request.method == 'POST'):
		query = request.data['query'].strip().lower()
		print(query)
		#return Response({"": [paragraph.text for paragraph in paragraphs]})
	return Response({"message": "default response"})


