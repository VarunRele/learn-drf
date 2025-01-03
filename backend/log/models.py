from django.db import models
from django.contrib.auth.models import User
from vehicle.models import Vehicle

class Log(models.Model):
    owner = models.ForeignKey(User, related_name="logs", on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField("Fuel price", max_digits=15, decimal_places=2)
    quantity = models.DecimalField(max_digits=15, decimal_places=2)
    fuel_type = models.CharField(max_length=10, choices=(
        ('Petrol', 'Petrol'),
        ('CNG', 'CNG')
        ), default='Petrol')
    odo = models.DecimalField("Kilometers ran", max_digits=15, decimal_places=2)
    location = models.CharField(max_length=100, blank=True, null=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)

    @property
    def unit(self):
        return 'l' if self.fuel_type == 'Petrol' else 'kgs'
