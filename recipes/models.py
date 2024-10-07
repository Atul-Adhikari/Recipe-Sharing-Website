from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password

class Recipe(models.Model):
    author = models.ForeignKey(User, related_name='recipes', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image=models.ImageField(upload_to ='uploads/')
    
    def __str__(self):
        return self.title
    


class CustomUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    status = models.CharField(max_length=50)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username