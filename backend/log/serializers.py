from rest_framework import serializers
from .models import Log
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username =serializers.CharField()


class LogSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    quantity_unit = serializers.SerializerMethodField(read_only=True)
    quantity = serializers.DecimalField(write_only=True, max_digits=15, decimal_places=2)

    def get_quantity_unit(self, obj: Log):
        return f'{obj.quantity} {obj.unit}'
    
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
            'location'
        ]