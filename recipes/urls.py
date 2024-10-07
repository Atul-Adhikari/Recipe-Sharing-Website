# recipes/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet, login_view, register_view

router = DefaultRouter()
router.register(r"recipes", RecipeViewSet, basename="recipe")

urlpatterns = [
    path("", include(router.urls)),  # Register the viewset routes
    path("login/", login_view, name="login"),
    path('register/', register_view, name='register'),
]
