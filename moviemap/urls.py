"""moviemap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import search, movie_detail
from .views import index
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + [
    path('admin/', admin.site.urls),
    path('api/search/<str:query>/', search),
    path('api/movie/<int:pk>/', movie_detail),
    path('', index, name="index"),
    path('<path:p>/', index, name="index"),
]
