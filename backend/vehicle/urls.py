from django.urls import path
from . import views

app_name = 'vehicle'
urlpatterns = [
    path('', views.VehicleListCreateView.as_view(), name='list-create'),
    path('<int:pk>/', views.VehicleRetrieveUpdateDestroy.as_view(), name='detail-update-delete')
]
