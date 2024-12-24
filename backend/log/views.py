from django.shortcuts import render
from rest_framework.request import Request
from rest_framework import generics
from .models import Log
from .serializers import LogSerializer, LogEditSerializer
from django.contrib.auth.models import User
from .permissions import IsOwnerOrAdmin

class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def perform_create(self, serializer: LogSerializer):
        serializer.save(owner=self.request.user)

    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     print(type(qs))
    #     user: User = self.request.user
    #     if not user.is_authenticated:
    #         return Log.objects.none()
    #     return qs.filter(owner=user)


class LogRetriveUpdateDestoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogEditSerializer
    permission_classes = [IsOwnerOrAdmin]

