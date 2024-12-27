# Generated by Django 4.2.17 on 2024-12-27 09:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('log', '0002_log_vehicle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='logs', to=settings.AUTH_USER_MODEL),
        ),
    ]