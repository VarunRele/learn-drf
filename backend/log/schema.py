import graphene
from graphene_django import DjangoObjectType
from .models import Log
from vehicle.models import Vehicle
from django.contrib.auth.models import User


class LogType(DjangoObjectType):
    class Meta:
        model = Log
        fields = ['id', 'owner', 'price', 'quantity', 'fuel_type', 'odo', 'location', 'vehicle']


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'logs']


class VehicleType(DjangoObjectType):
    class Meta:
        model = Vehicle
        fields = '__all__'


class Query(graphene.ObjectType):
    all_log = graphene.List(LogType)
    all_user = graphene.List(UserType)
    all_vehicle = graphene.List(VehicleType)
    user_by_id = graphene.Field(UserType, id=graphene.String(required=True))

    def resolve_all_log(root, info):
        return Log.objects.all()
    
    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=int(id))
        except:
            return None

    def resolve_all_vehicle(root, info):
        return Vehicle.objects.all()


schema = graphene.Schema(query=Query)