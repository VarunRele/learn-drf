from django.contrib import admin
from django.db.models.query import QuerySet
from django.core.handlers.wsgi import WSGIRequest
from .models import Log
from .tasks import my_task


@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    actions = [
        "make_action"
    ]

    @admin.action(description="Mark test")
    def make_action(self, request: WSGIRequest, queryset: QuerySet):
        for act in queryset:
            my_task.delay(act.price, act.quantity)
        self.message_user(request, "Task executed succesfully.")