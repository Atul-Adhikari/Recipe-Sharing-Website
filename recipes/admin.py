from django.contrib import admin
from .models import Recipe, CustomUser
# Register your models here.
admin.site.register(Recipe)
admin.site.register(CustomUser)