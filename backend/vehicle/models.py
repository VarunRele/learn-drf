from django.db import models


class Vehicle(models.Model):
    vehicle_type = models.CharField(max_length=20, choices=[
        ('Car', 'Car'),
        ('Bike', 'Bike')
    ])
    reg_number = models.CharField("Registration Number", max_length=100)

    def __str__(self):
        return f'{self.vehicle_type} - {self.reg_number}'