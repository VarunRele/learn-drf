# Generated by Django 4.2.17 on 2024-12-24 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_type', models.CharField(choices=[('Car', 'Car'), ('Bike', 'Bike')], max_length=20)),
                ('reg_number', models.CharField(max_length=100, verbose_name='Registration Number')),
            ],
        ),
    ]
