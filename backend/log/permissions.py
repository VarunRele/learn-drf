from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.request import Request
from .models import Log

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request: Request, view, obj: Log):
        user: User = request.user
        if obj.owner == user or user.is_superuser:
            return True
        return False