from unicodedata import category
from django.db import models
from django.apps import apps
from accounts.models import User
import uuid
from django.utils.text import slugify

# Create your models here.
vietnamese_map = {
    ord(u'ư'): 'u',
    ord(u'ơ'): 'o',
    ord(u'á'): 'a',
    ord(u'n'): 'n',
    ord(u'h'): 'h',
    ord(u'ữ'): 'u',
    ord(u'n'): 'n',
    ord(u'g'): 'g',
    ord(u'v'): 'v',
    ord(u'i'): 'i',
    ord(u'ê'): 'e',
    ord(u'n'): 'n',
    ord(u'k'): 'k',
    ord(u'ẹ'): 'e',
    ord(u'o'): 'o',
    ord(u'đ'): 'd',
}

def create_slug(id, name, model):
    slug = slugify(name.translate(vietnamese_map))
    new_slug = slug
    my_model = apps.get_model(__package__, model)
    other_record = my_model.objects.all()
    exists = other_record.filter(slug=new_slug).count() > 0
    check = other_record.filter(slug=new_slug) == other_record.filter(id=id)
    current_obj = other_record.filter(id=id)
    old_slug = ''
    for el in current_obj:
        old_slug = el.slug
    if (exists and check == False):
        i = 2
        while exists:
            new_slug = u'%s-%s' % (slug, i)
            if(old_slug):
                if(new_slug == old_slug):
                    break
            exists = other_record.filter(slug=new_slug).count() > 0
            i+=1
            if(not exists):
                break
        return new_slug
    else:
        return new_slug
    

class Category(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(default="", null=False, unique=True)

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = create_slug(self.id, self.name,self.__class__.__name__)
        super(Category, self).save(*args, **kwargs)


class Country(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(default="", null=False, unique=True)


    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = create_slug(self.id, self.name,self.__class__.__name__)
        super(Country, self).save(*args, **kwargs)


class Movie(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    category = models.ForeignKey(
        Category, related_name='categories', null=True, on_delete=models.SET_NULL)
    country = models.ForeignKey(
        Country, related_name='country', null=True, on_delete=models.SET_NULL)
    thumbnail = models.ImageField(upload_to='thumbnails')
    name = models.CharField(max_length=255, blank=False)
    slug = models.SlugField(default="", null=False, unique=True)
    description = models.TextField()
    video = models.FileField(upload_to='movies')
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = create_slug(self.id, self.name,self.__class__.__name__)
        super(Movie, self).save(*args, **kwargs)
        

class Comment(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    movie = models.ForeignKey(
        Movie, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='user_comment',
                             on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.movie
