from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import Recipe
from .serializers import RecipeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class RecipeViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """

    queryset = Recipe.objects.all().order_by("-created_at")
    serializer_class = RecipeSerializer
    # Remove the permission_classes to allow access without authentication
    permission_classes = []

    def perform_create(self, serializer):
        user = User.objects.filter(username="atul").first()
        if user:
            serializer.save(author=user)
        else:
            raise ValueError("User 'atul' does not exist")

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["author", "title"]
    search_fields = ["title", "ingredients", "description"]
    ordering_fields = ["created_at"]


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            # Try to load the JSON data
            data = json.loads(request.body)

            # Validate that both username and password are provided
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse(
                    {"error": "Username and password are required"}, status=400
                )

            # Authenticate the user
            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({"message": "Login successful"})
            else:
                return JsonResponse(
                    {"error": "Invalid username or password"}, status=400
                )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            # Log and return a generic error response for unexpected errors
            print(f"Unexpected error: {e}")
            return JsonResponse({"error": "Something went wrong"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

@csrf_exempt
@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return Response(
                    {"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(username=username).exists():
                return Response(
                    {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
                )

            # Create user using Django's built-in user creation method which handles password hashing
            user = User.objects.create_user(username=username, password=password)
            user.save()

            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Log the error and return a generic error message
            logger.error(f"Unexpected error: {e}")
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
