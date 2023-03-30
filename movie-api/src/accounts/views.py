from django.contrib.auth import authenticate, get_user_model


from rest_framework.generics import (
    ListAPIView, 
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView, 
    CreateAPIView,
    UpdateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import User
from .serializers import *
from .tokens import create_jwt
from .permissions import IsCurrentUser

# Create your views here.
class UserLoginView(CreateAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = create_jwt(user)
            user = get_user_model().objects.filter(email=email)
            u = UserLoginResponseSerializer(instance=user, many = True).data
            response = {"user": u[0],"token": token}
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data={"message":"Login fail"}, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name')
        birthday = request.data.get('birthday')
        user = get_user_model().objects.filter(email=email)
        if len(user) == 0:
            if len(password) < 6:
                return Response(data={"message":"Password must have 6 or more charater"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                u = User.objects.create(email=email, full_name=full_name, birthday=birthday)
                u.set_password(password)
                u.save()
                data = UserRegisterSerializer(instance=u).data
                response = {"message":"Register successfull", 'data':data}
                return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"message":"Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]



class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated, IsCurrentUser]

    lookup_field = 'id'


class UserDetailUpdateDeleteAdminView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUpdateUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = 'id'


# class UserUpdatePasswordView(UpdateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UpdatePasswordUserSerializer
#     permission_classes = [IsAuthenticated, IsCurrentUser]
#     lookup_field = 'id'

class UserUpdatePasswordView(CreateAPIView):
    serializer_class = UpdatePasswordUserSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsCurrentUser]

    
    def post(self, request, *args, **kwargs):
        id = kwargs['id']
        u = User.objects.get(id = id)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if u.check_password(old_password):
            u.set_password(new_password)
            u.save()
            return Response("Update password successful", status=status.HTTP_200_OK)
        else:
            return Response("Old password is invalid", status=status.HTTP_400_BAD_REQUEST)
