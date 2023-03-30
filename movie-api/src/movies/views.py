from rest_framework import status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import(
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from .models import *
from .serializers import *
# Create your views here.

s1 = u'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ'
s0 = u'AAAAEEEIIOOOOUUYaaaaeeeiioooouuyAaDdIiUuOoUuAaAaAaAaAaAaAaAaAaAaAaAaEeEeEeEeEeEeEeEeIiIiOoOoOoOoOoOoOoOoOoOoOoOoUuUuUuUuUuUuUuYyYyYyYy'


def remove_accents(input_str):
    s = ''
    for c in input_str:
        if c in s1:
            s += s0[s1.index(c)]
        else:
            s += c
    return s

# CATEGORY VIEWS----------------------------------------------------------------


class CreateCategoryView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class ListCategoryView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = 'id'


# COUNTRY VIEWS----------------------------------------------------------------
class ListCountryView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CreateCountryView(CreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class CountryRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = 'id'


# MOVIE VIEWS----------------------------------------------------------------

# class ListCreateMovieView(GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


class ListMovieView(ListAPIView):
    queryset = Movie.objects.all().filter(status=True)
    serializer_class = MovieSerializer


class ListMovieAdminView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailAdminSerializer
    permission_classes = [IsAdminUser]


class CreateMovieView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        # video = request.FILES.get('video')
        # thumbnail = request.FILES.get('thumbnail')
        # print(video.file)
        # print(thumbnail.file)
        # video = request.data.get('video')
        # request.data.update({'thumbnail': remove_accents(str(thumbnail)), 'video': remove_accents(str(video))})
        serializer = MovieCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieRetrieveView(RetrieveAPIView):
    queryset = Movie.objects.all().filter(status=True)
    serializer_class = MovieDetailSerializer
    lookup_field = 'id'


class MovieBestView(ListAPIView):
    queryset = Movie.objects.all().filter(status=True).order_by('-views')[0:1]
    serializer_class = MovieSerializer


class BestListMovieView(ListAPIView):
    queryset = Movie.objects.all().filter(status=True).order_by('-views')[1:8]
    serializer_class = MovieSerializer


class MovieUpdateDeleteView(UpdateAPIView, DestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailAdminSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsAdminUser]


class MovieUpdateView(UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieUpdateViewSerializer
    lookup_field = 'id'

    def get_queryset(self):
        data = Movie.objects.all()
        return data

    def update(self, request, *args, **kwargs):
        movie = self.get_object()
        print(movie.id)
        movie.views += 1
        movie.save()
        return Response('Update successful', status=status.HTTP_200_OK)


# COMMENT VIEWS----------------------------------------------------------------
class CommentListView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentCreateView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
        return super().perform_create(serializer)


class CommentDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    lookup_field = 'id'
