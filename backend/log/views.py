from django.shortcuts import render
from rest_framework.request import Request
from rest_framework import generics
from rest_framework import exceptions
from .models import Log
from .serializers import LogSerializer, LogEditSerializer, QueryParamSerializer
from django.contrib.auth.models import User
from .permissions import IsOwnerOrAdmin
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


@extend_schema_view(
    get = extend_schema(
        parameters=[
            OpenApiParameter(
                "username", str, required=False
            ),
            OpenApiParameter(
                "email", OpenApiTypes.EMAIL, required=False
            )
        ]
    ),
    post = extend_schema(
        examples=[
            OpenApiExample(
                "Log",
            )
        ]
    )
)
class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all().order_by('-id')
    serializer_class = LogSerializer

    def perform_create(self, serializer: LogSerializer):
        new_odo = serializer.validated_data.get('odo')
        if new_odo is None:
            raise exceptions.ValidationError("Odo value can't be none.")
        last_odo = Log.objects.last()
        if last_odo is not None and float(new_odo) <= float(last_odo.odo):
            raise exceptions.ValidationError("Odo value can't be less than previous value")
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        serializer = QueryParamSerializer(data=self.request.GET)
        if not serializer.is_valid(raise_exception=True):
            print(serializer.validated_data)
        return super().get_queryset()


class LogRetriveUpdateDestoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogEditSerializer
    permission_classes = [IsOwnerOrAdmin]

