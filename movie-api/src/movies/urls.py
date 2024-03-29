from django.urls import path
from .views import *

urlpatterns = [
    path('category', ListCategoryView.as_view(), name='categories'),
    path('category/create', CreateCategoryView.as_view(), name='category-create'),
    path('category/<uuid:id>', CategoryRetrieveUpdateDeleteView.as_view(), name='category-detail'),

    path('country', ListCountryView.as_view(), name='country'),
    path('country/create', CreateCountryView.as_view(), name='country-create'),
    path('country/<uuid:id>', CountryRetrieveUpdateDeleteView.as_view(), name='country-detail'),

    path('movie', ListMovieView.as_view(), name='movies'),
    path('movie-admin', ListMovieAdminView.as_view(), name='movies-admin'),
    path('movie/best-view', MovieBestView.as_view(), name='movies-best-view'),
    path('movie/list-best-view', BestListMovieView.as_view(), name='movies-top-view'),
    path('movie/create', CreateMovieView.as_view(), name='movie-create'),
    path('movie/detail/<slug:slug>', MovieRetrieveView.as_view(), name='movie-detail'),
    path('movie/<uuid:id>', MovieUpdateDeleteView.as_view(), name='movie-edit'),
    path('movie/update-view/<uuid:id>', MovieUpdateView.as_view(), name='movie-update-view'),

    path('comment', CommentListView.as_view(), name='comments'),
    path('comment/create', CommentCreateView.as_view(), name='create-comment'),
    path('comment/<uuid:id>', CommentDetailUpdateDeleteView.as_view(), name='comment-detail'),

]