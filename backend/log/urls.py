from django.urls import path
from . import views

app_name = 'log'
urlpatterns = [
    path('', views.LogListCreateView.as_view(), name='list-create'),
    path('<int:pk>/', views.LogRetriveUpdateDestoryView.as_view(), name='detail-update-destory')
]
