from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ToDo(models.Model):
    title = models.CharField(max_length=100)
    memo = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'title']

    def __str__(self):
        return self.title