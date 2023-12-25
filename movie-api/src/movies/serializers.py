from .models import *
from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField
from accounts.serializers import UserCommentSerializer
import requests


class CategoryCreateSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']



class CountryCreateSerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'slug']


class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'category', 'country', 'name', 'slug',
                  'thumbnail', 'views', 'created_at', 'status']
        
        
class MovieUpdateViewSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = ['slug']
    

class MovieCreateSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'category', 'country', 'name', 'thumbnail',
                  'description', 'video', 'views', 'created_at', 'status']
        extra_kwargs = {
            'status': {'read_only': True},
            'views': {'read_only': True}
        }


class MovieDetailSerializer(ModelSerializer):
    comment = SerializerMethodField()
    category = SerializerMethodField()
    country = SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'category', 'country', 'name', 'thumbnail',
                  'description', 'video', 'comment', 'views', 'created_at', 'status']
        extra_kwargs = {
            'status': {'read_only': True},
            'views': {'read_only': True}
        }

    def get_category(self, obj):
        if(obj.category):
            id = obj.category.id
            if(id):
                cate = Category.objects.filter(id=id)
                return CategorySerializer(instance=cate, many=True).data
            else:
                return
        else:
            return

    def get_country(self, obj):
        if(obj.country):
            id = obj.country.id
            if(id):
                coun = Country.objects.filter(id=obj.country.id)
                return CountrySerializer(instance=coun, many=True).data
            else:
                return
        else:
            return

    def get_comment(self, obj):
        comment = Comment.objects.filter(movie=obj.id).order_by('-created_at')
        return CommentSerializer(instance=comment, many=True).data


class MovieDetailAdminSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'category', 'country', 'name', 'thumbnail',
                  'description', 'video', 'views', 'created_at', 'status']


class CommentSerializer(ModelSerializer):
    user = SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'movie', 'user', 'content', 'created_at']

    def get_user(self, obj):
        u = User.objects.filter(id=obj.user.id)
        return (UserCommentSerializer(instance=u, many=True).data)[0]
