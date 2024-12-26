from rest_framework import serializers
from .models import Log
from django.contrib.auth.models import User
from vehicle.serializers import VehicleSerializer
from vehicle.models import Vehicle
from icecream import ic
from drf_spectacular.utils import extend_schema_field
from rest_framework import exceptions


class QueryParamSerializer(serializers.Serializer):
    reg_number = serializers.CharField(required=False)

class CustomUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username =serializers.CharField()


class LogSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer(read_only=True)
    quantity_unit = serializers.SerializerMethodField(read_only=True)
    quantity = serializers.DecimalField(write_only=True, max_digits=15, decimal_places=2)
    vehicle_info = VehicleSerializer(read_only=True, source='vehicle')
    rud_url = serializers.HyperlinkedIdentityField(view_name='log:detail-update-destory', read_only=True)

    @extend_schema_field(str)
    def get_quantity_unit(self, obj: Log):
        if not hasattr(obj, "id"):
            return None
        return f'{obj.quantity} {obj.unit}'

    def validate(self, attrs: dict):
        car: Vehicle | None = attrs.get('vehicle')
        fuel_type: str = attrs.get('fuel_type')
        price: float = float(attrs.get('price'))
        quantity: float = float(attrs.get('quantity'))
        odo: float = float(attrs.get('odo'))
        if price <= 0.0 or quantity <= 0.0 or odo <= 0.0:
            # raise serializers.ValidationError("Price/Quantity/Odo can't be less than Zero")
            raise exceptions.NotAcceptable({"error": "Price/Quantity/Odo can't be less than Zero"})
        if car is None:
            return attrs
        if car.vehicle_type == 'Bike' and fuel_type == 'CNG':
            # raise serializers.ValidationError("Bike can't be of type CNG")
            raise exceptions.NotAcceptable({"error": "Bike can't be of type CNG"})
        return attrs
    
    class Meta:
        model = Log
        fields = [
            'id',
            'owner',
            'price',
            'quantity',
            'quantity_unit',
            'fuel_type',
            'odo',
            'location',
            'vehicle_info',
            'vehicle',
            'rud_url'
        ]
        extra_kwargs = {
            'vehicle': {'write_only': True},
        }


class LogEditSerializer(LogSerializer):
    quantity = serializers.DecimalField(write_only=False, max_digits=15, decimal_places=2)
    