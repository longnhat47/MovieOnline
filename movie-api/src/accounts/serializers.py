from attr import field
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import User

# Login


class UserLoginSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }


class UserLoginResponseSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name',
                  'image', 'birthday', 'is_superuser']

# View Register
class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password',
                  'full_name', 'birthday']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    # def create(self, validated_data):
    #     password = validated_data.pop('password')
    #     user = super().create(validated_data)
    #     user.set_password(password)
    #     user.save()
    #     return user
# View List


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password',
                  'full_name', 'image', 'birthday', 'is_active', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True},
        }


#User in comment
class UserCommentSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'image']


# Update User
class UpdateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'image', 'birthday']
        

# Update User for Admin
class AdminUpdateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'image', 'birthday', 'is_active']


# Update User Password
class UpdatePasswordUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['password']