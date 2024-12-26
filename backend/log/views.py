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
        description="Get all the logs. If reg number is specified then output is filtered.",
        parameters=[
            OpenApiParameter(
                "reg_number", str, required=False, 
                description="Vehicle registration Number. Last four digits is also valid"
            )
        ]
    ),
    post = extend_schema(
        description="Create log."    
    )
)
class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all().order_by('-id')
    serializer_class = LogSerializer

    def perform_create(self, serializer: LogSerializer):
        new_odo = serializer.validated_data.get('odo')
        vehicle = serializer.validated_data.get('vehicle')
        last_odo = Log.objects.filter(vehicle=vehicle).last()
        if last_odo is not None and float(new_odo) <= float(last_odo.odo):
            raise exceptions.ValidationError({"odo": 
                                              ["Odo value can't be less than previous value"]})
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        serializer = QueryParamSerializer(data=self.request.GET)
        reg_number = None
        if serializer.is_valid(raise_exception=True):
            reg_number = serializer.validated_data.get('reg_number')
        qs = super().get_queryset()
        if reg_number:
            qs = qs.filter(vehicle__reg_number__icontains=reg_number)
        return qs


class LogRetriveUpdateDestoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogEditSerializer
    permission_classes = [IsOwnerOrAdmin]

