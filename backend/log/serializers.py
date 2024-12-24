from rest_framework import serializers
from .models import Log
from django.contrib.auth.models import User
from vehicle.serializers import VehicleSerializer
from vehicle.models import Vehicle
from icecream import ic

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username =serializers.CharField()


class LogSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    quantity_unit = serializers.SerializerMethodField(read_only=True)
    quantity = serializers.DecimalField(write_only=True, max_digits=15, decimal_places=2)
    vehicle_info = VehicleSerializer(read_only=True, source='vehicle')

    def get_quantity_unit(self, obj: Log):
        if not hasattr(obj, "id"):
            return None
        return f'{obj.quantity} {obj.unit}'

    def validate(self, attrs: dict):
        car: Vehicle | None = attrs.get('vehicle')
        fuel_type: str = attrs.get('fuel_type')
        if car is None:
            return attrs
        if car.vehicle_type == 'Bike' and fuel_type == 'CNG':
            raise serializers.ValidationError("Bike can't be of type CNG")
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
            'vehicle'
        ]
        extra_kwargs = {
            'vehicle': {'write_only': True},
        }


class LogEditSerializer(LogSerializer):
    quantity = serializers.DecimalField(write_only=False, max_digits=15, decimal_places=2)
    