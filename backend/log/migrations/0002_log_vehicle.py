# Generated by Django 4.2.17 on 2024-12-24 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vehicle', '0001_initial'),
        ('log', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='vehicle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='vehicle.vehicle'),
        ),
    ]
