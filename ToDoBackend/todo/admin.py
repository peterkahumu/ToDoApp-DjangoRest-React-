from django.contrib import admin
from .models import ToDo

# Register your models here.
@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ['id',   'title', 'memo', 'completed', 'user']
    search_fields = ['title', 'memo']
    list_filter = ['completed']
    ordering = ['created_at']
    